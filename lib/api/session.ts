import type { AdminProfile } from "@/lib/api/types"

const AUTH_STORAGE_KEY = "egbeda_admin_session"
const AUTH_CHANGE_EVENT = "egbeda-auth-change"

export type AuthSession = {
  user: AdminProfile
  accessToken: string
}

export function parseAuthSession(value: string | null) {
  if (!value) {
    return null
  }

  try {
    const session = JSON.parse(value) as Partial<AuthSession>

    if (!session.accessToken || !session.user) {
      return null
    }

    return session as AuthSession
  } catch {
    return null
  }
}

export function getStoredAuthSessionSnapshot() {
  if (typeof window === "undefined") {
    return null
  }

  return (
    window.localStorage.getItem(AUTH_STORAGE_KEY) ??
    window.sessionStorage.getItem(AUTH_STORAGE_KEY)
  )
}

export function getStoredAuthSession() {
  return parseAuthSession(getStoredAuthSessionSnapshot())
}

export function getAccessToken() {
  return getStoredAuthSession()?.accessToken ?? null
}

export function storeAuthSession(session: AuthSession, remember = true) {
  if (typeof window === "undefined") {
    return
  }

  const activeStorage = remember ? window.localStorage : window.sessionStorage
  const inactiveStorage = remember ? window.sessionStorage : window.localStorage

  inactiveStorage.removeItem(AUTH_STORAGE_KEY)
  activeStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
}

export function clearStoredAuthSession() {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
}

export function subscribeToAuthSession(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined
  }

  window.addEventListener("storage", onStoreChange)
  window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange)
  }
}
