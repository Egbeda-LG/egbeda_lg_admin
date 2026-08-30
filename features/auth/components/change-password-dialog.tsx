"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiLockPasswordLine, RiMailSendLine } from "@remixicon/react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  changePasswordFormDefaults,
  changePasswordFormSchema,
  type ChangePasswordFormValues,
} from "@/features/auth/auth.form"
import {
  useConfirmChangePassword,
  useRequestChangePasswordOtp,
} from "@/features/auth/auth.hooks"
import { toChangePasswordPayload } from "@/features/auth/auth.transformers"
import {
  ICT_SUPPORT_EMAIL,
  OTP_RESEND_SECONDS,
} from "@/features/auth/auth.utils"
import { notifyInvalidForm } from "@/lib/ui/form-errors"

const LABEL_CLASS =
  "text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
const FIELD_CLASS = "h-11 rounded-xl bg-background border-input text-xs"

const PASSWORD_FIELDS = [
  {
    name: "currentPassword",
    label: "CURRENT PASSWORD",
    placeholder: "Enter current password",
  },
  {
    name: "newPassword",
    label: "NEW PASSWORD",
    placeholder: "Enter new password",
  },
  {
    name: "confirmPassword",
    label: "CONFIRM NEW PASSWORD",
    placeholder: "Confirm new password",
  },
] as const

type ChangePasswordDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Prefills the account field - the signed-in admin, or the sign-in entry. */
  email: string
  /**
   * Locks the account field. Set from the profile, where the account is known;
   * left open on the sign-in page, where nobody is authenticated yet.
   */
  lockEmail?: boolean
}

/**
 * Both endpoints work unauthenticated, so this same flow serves the profile
 * page and the sign-in page: request an OTP for an account, then confirm with
 * the OTP and the current password.
 */
export function ChangePasswordDialog({
  open,
  onOpenChange,
  email,
  lockEmail,
}: ChangePasswordDialogProps) {
  const requestPasswordOtp = useRequestChangePasswordOtp()
  const confirmPassword = useConfirmChangePassword()
  const [countdown, setCountdown] = React.useState(0)

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: { ...changePasswordFormDefaults, email },
  })

  // Reopen with a clean form, so a half-finished attempt is not carried over.
  // The resend countdown deliberately survives a close: a code really was just
  // sent, and reopening should not be a way to request another immediately.
  React.useEffect(() => {
    if (!open) return

    form.reset({ ...changePasswordFormDefaults, email })
  }, [email, form, open])

  React.useEffect(() => {
    if (countdown <= 0) return

    const timer = setTimeout(() => setCountdown((value) => value - 1), 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  // Validate the address first: the API answers an unknown one with a 401.
  const sendOtp = async () => {
    if (!(await form.trigger("email"))) return

    requestPasswordOtp.mutate(
      { email: form.getValues("email").trim() },
      { onSuccess: () => setCountdown(OTP_RESEND_SECONDS) },
    )
  }

  const onSubmit = (values: ChangePasswordFormValues) => {
    confirmPassword.mutate(toChangePasswordPayload(values), {
      onSuccess: () => {
        onOpenChange(false)
        form.reset(changePasswordFormDefaults)
      },
    })
  }

  const isSending = requestPasswordOtp.isPending || countdown > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:max-w-md sm:p-8">
        <DialogHeader className="items-center space-y-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full border border-rose-100 bg-rose-50 text-[#701a2e]">
            <RiLockPasswordLine className="size-6" />
          </div>
          <DialogTitle className="text-foreground font-serif text-2xl font-bold">
            Change Password
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Send a code to the account, then set a new password using the code
            and your current one.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
            className="space-y-4 pt-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL_CLASS}>
                    ACCOUNT EMAIL ADDRESS
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      readOnly={lockEmail}
                      placeholder="you@egbedalg.gov.ng"
                      className={FIELD_CLASS}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="outline"
              disabled={isSending}
              onClick={sendOtp}
              className="border-input h-11 w-full rounded-xl text-xs font-semibold shadow-none"
            >
              <RiMailSendLine className="mr-1.5 size-4" />
              {requestPasswordOtp.isPending
                ? "Sending code..."
                : countdown > 0
                  ? `Resend code in ${countdown}s`
                  : requestPasswordOtp.isSuccess
                    ? "Resend code"
                    : "Send code to this address"}
            </Button>

            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL_CLASS}>OTP</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      placeholder="Enter the OTP sent to your email"
                      className={FIELD_CLASS}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {PASSWORD_FIELDS.map((passwordField) => (
              <FormField
                key={passwordField.name}
                control={form.control}
                name={passwordField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={LABEL_CLASS}>
                      {passwordField.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={passwordField.placeholder}
                        className={FIELD_CLASS}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <p className="text-muted-foreground/80 text-center text-[11px] leading-relaxed">
              Cannot remember your current password?{" "}
              <a
                href={`mailto:${ICT_SUPPORT_EMAIL}?subject=Admin password reset request`}
                className="font-semibold text-[#701a2e] hover:underline dark:text-rose-400"
              >
                Ask ICT support to reset it
              </a>
              .
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="border-input h-11 rounded-xl text-xs font-semibold shadow-none"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={confirmPassword.isPending}
                className="h-11 rounded-xl bg-[#701a2e] text-xs font-semibold text-white shadow-sm hover:bg-[#571323]"
              >
                {confirmPassword.isPending ? "Changing..." : "Change"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
