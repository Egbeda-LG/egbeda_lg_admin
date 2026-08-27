"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { authRepository } from "@/features/auth/auth.repository"
import type {
  ConfirmChangePasswordPayload,
  ConfirmLoginPayload,
  RequestLoginOtpPayload,
} from "@/lib/api/types"

export function useRequestLoginOtp() {
  return useMutation({
    mutationFn: (payload: RequestLoginOtpPayload) =>
      authRepository.requestLoginOtp(payload),
    onSuccess: (response) => toast.success(response.message),
  })
}

export function useConfirmLogin() {
  return useMutation({
    mutationFn: (payload: ConfirmLoginPayload) =>
      authRepository.confirmLogin(payload),
    onSuccess: () => toast.success("Signed in successfully"),
  })
}

export function useRequestChangePasswordOtp() {
  return useMutation({
    mutationFn: (payload: RequestLoginOtpPayload) =>
      authRepository.requestChangePasswordOtp(payload),
    onSuccess: (response) => toast.success(response.message),
  })
}

export function useConfirmChangePassword() {
  return useMutation({
    mutationFn: (payload: ConfirmChangePasswordPayload) =>
      authRepository.confirmChangePassword(payload),
    onSuccess: (response) => toast.success(response.message),
  })
}

export function useAdminProfile() {
  return useQuery({
    queryKey: ["auth", "profile"],
    queryFn: authRepository.getProfile,
  })
}
