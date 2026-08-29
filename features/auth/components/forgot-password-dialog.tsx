"use client"

import { RiKey2Line, RiMailSendLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ICT_SUPPORT_EMAIL } from "@/features/auth/auth.utils"

type ForgotPasswordDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * There is no self-service reset: the API exposes no password-reset route, and
 * change-password/confirm requires the current password - the one thing an
 * admin in this position does not have. So this explains the two routes that
 * do exist rather than pretending to start a reset.
 */
export function ForgotPasswordDialog({
  open,
  onOpenChange,
}: ForgotPasswordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center rounded-3xl p-6 text-center sm:max-w-md sm:p-8">
        <div className="mb-2 flex size-14 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-amber-600 shadow-sm">
          <RiKey2Line className="size-7" />
        </div>

        <DialogHeader className="items-center space-y-2 text-center">
          <DialogTitle className="text-foreground font-serif text-2xl font-bold">
            Reset your password
          </DialogTitle>
          <DialogDescription className="text-muted-foreground max-w-xs text-xs leading-relaxed">
            Passwords cannot be reset from this screen. Ask ICT support to reset
            it for you, then sign in with the temporary password they issue.
          </DialogDescription>
        </DialogHeader>

        <p className="text-muted-foreground/80 max-w-xs pt-2 text-[11px] leading-relaxed">
          Still know your current password? Sign in and change it from{" "}
          <span className="text-foreground font-semibold">
            My Profile &rarr; Change password
          </span>
          .
        </p>

        <div className="w-full space-y-2 pt-4">
          <a
            href={`mailto:${ICT_SUPPORT_EMAIL}?subject=Admin password reset request`}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-[#701a2e] text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#571323]"
          >
            <RiMailSendLine className="mr-1.5 size-4" />
            Email ICT support
          </a>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11 w-full rounded-xl text-xs font-semibold shadow-none"
          >
            Back to sign in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
