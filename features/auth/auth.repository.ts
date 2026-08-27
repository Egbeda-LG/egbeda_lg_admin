import { request } from "@/lib/api/request"
import type {
  AdminProfile,
  ConfirmChangePasswordPayload,
  ConfirmLoginPayload,
  ConfirmLoginResponse,
  MessageResponse,
  RequestLoginOtpPayload,
} from "@/lib/api/types"

export const authRepository = {
  requestLoginOtp: (payload: RequestLoginOtpPayload) =>
    request.post<MessageResponse>("/api/v1/auth/login/request-otp", payload),
  confirmLogin: (payload: ConfirmLoginPayload) =>
    request.post<ConfirmLoginResponse>("/api/v1/auth/login/confirm", payload),
  requestChangePasswordOtp: (payload: RequestLoginOtpPayload) =>
    request.post<MessageResponse>(
      "/api/v1/auth/change-password/request-otp",
      payload,
    ),
  confirmChangePassword: (payload: ConfirmChangePasswordPayload) =>
    request.post<MessageResponse>(
      "/api/v1/auth/change-password/confirm",
      payload,
    ),
  getProfile: () => request.get<AdminProfile>("/api/v1/auth/me"),
  logout: () => request.post<MessageResponse>("/api/v1/auth/logout"),
}
