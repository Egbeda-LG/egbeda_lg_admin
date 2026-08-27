"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

import { useConfirmLogin, useRequestLoginOtp } from "@/features/auth/auth.hooks"
import { authRepository } from "@/features/auth/auth.repository"
import {
  clearStoredAuthSession,
  getStoredAuthSessionSnapshot,
  parseAuthSession,
  storeAuthSession,
  subscribeToAuthSession,
} from "@/lib/api/session"
import type { AdminProfile } from "@/lib/api/types"

export type User = AdminProfile

type PendingLogin = {
  email: string
  password: string
  rememberMe: boolean
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  requires2FA: boolean
  pendingEmail: string | null
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<{ requires2FA: boolean }>
  verify2FA: (otpCode: string) => Promise<boolean>
  resendLoginOtp: () => Promise<void>
  loginWithSSO: () => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

function createFallbackProfile(email: string): AdminProfile {
  const emailName = email.split("@")[0].replace(/[._-]+/g, " ")
  const name = emailName.replace(/\b\w/g, (letter) => letter.toUpperCase())

  return {
    id: "",
    name: name || "Egbeda Administrator",
    email,
    role: "admin",
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const requestLoginOtp = useRequestLoginOtp()
  const confirmLogin = useConfirmLogin()
  const [pendingLogin, setPendingLogin] = React.useState<PendingLogin | null>(
    null,
  )
  const [isProcessing, setIsProcessing] = React.useState(false)
  const sessionSnapshot = React.useSyncExternalStore(
    subscribeToAuthSession,
    getStoredAuthSessionSnapshot,
    () => null,
  )
  const isClient = React.useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )
  const user = React.useMemo(
    () => parseAuthSession(sessionSnapshot)?.user ?? null,
    [sessionSnapshot],
  )

  const login = React.useCallback(
    async (email: string, password: string, rememberMe = true) => {
      setIsProcessing(true)

      try {
        await requestLoginOtp.mutateAsync({ email })
        setPendingLogin({ email, password, rememberMe })
        return { requires2FA: true }
      } finally {
        setIsProcessing(false)
      }
    },
    [requestLoginOtp],
  )

  const verify2FA = React.useCallback(
    async (otpCode: string) => {
      if (!pendingLogin) {
        throw new Error("Your login session has expired. Please sign in again.")
      }

      setIsProcessing(true)

      try {
        const { access_token: accessToken } = await confirmLogin.mutateAsync({
          email: pendingLogin.email,
          password: pendingLogin.password,
          otp: otpCode,
        })
        const fallbackProfile = createFallbackProfile(pendingLogin.email)

        storeAuthSession(
          { user: fallbackProfile, accessToken },
          pendingLogin.rememberMe,
        )

        let profile = fallbackProfile

        try {
          profile = await authRepository.getProfile()
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw error
          }

          profile = fallbackProfile
        }

        storeAuthSession(
          { user: profile, accessToken },
          pendingLogin.rememberMe,
        )
        setPendingLogin(null)
        return true
      } finally {
        setIsProcessing(false)
      }
    },
    [confirmLogin, pendingLogin],
  )

  const resendLoginOtp = React.useCallback(async () => {
    if (!pendingLogin) {
      throw new Error("Your login session has expired. Please sign in again.")
    }

    await requestLoginOtp.mutateAsync({ email: pendingLogin.email })
  }, [pendingLogin, requestLoginOtp])

  const loginWithSSO = React.useCallback(async () => {
    toast.error("Government SSO is not available in the documented API yet.")
    return false
  }, [])

  const logout = React.useCallback(async () => {
    // Tell the server first so it can invalidate the session, but never block
    // sign-out on it - the local session is cleared either way.
    try {
      await authRepository.logout()
    } catch {
      // The interceptor already surfaced the error; sign out locally anyway.
    }

    clearStoredAuthSession()
    queryClient.clear()
    setPendingLogin(null)
    toast.success("Signed out successfully")
    router.push("/login")
  }, [queryClient, router])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading: !isClient || isProcessing,
        requires2FA: Boolean(pendingLogin),
        pendingEmail: pendingLogin?.email ?? null,
        login,
        verify2FA,
        resendLoginOtp,
        loginWithSSO,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
