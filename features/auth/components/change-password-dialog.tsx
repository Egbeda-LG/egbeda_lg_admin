"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { RiLockPasswordLine } from "@remixicon/react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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
  /** Account the OTP is sent to and whose password is changed. */
  email: string
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
  email,
}: ChangePasswordDialogProps) {
  const requestPasswordOtp = useRequestChangePasswordOtp()
  const confirmPassword = useConfirmChangePassword()

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: changePasswordFormDefaults,
  })

  const onSubmit = (values: ChangePasswordFormValues) => {
    confirmPassword.mutate(toChangePasswordPayload(values, email), {
      onSuccess: () => {
        onOpenChange(false)
        form.reset()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl p-6 sm:max-w-md sm:p-8">
        <DialogHeader className="items-center space-y-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full border border-rose-100 bg-rose-50 text-[#701a2e]">
            <RiLockPasswordLine className="size-6" />
          </div>
          <DialogTitle className="text-foreground font-serif text-2xl font-bold">
            Change Password
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
            className="space-y-4 pt-2"
          >
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={requestPasswordOtp.isPending}
                onClick={() => requestPasswordOtp.mutate({ email })}
              >
                {requestPasswordOtp.isPending ? "Sending..." : "Send OTP"}
              </Button>
            </div>

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

            <div className="grid grid-cols-2 gap-3 pt-4">
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
