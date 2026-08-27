"use client"

import * as React from "react"
import { RiDeleteBinLine } from "@remixicon/react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type ConfirmDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: React.ReactNode
  onConfirm: () => void
  confirmLabel?: string
  cancelLabel?: string
  disabled?: boolean
  /** Defaults to the delete bin. */
  icon?: React.ReactNode
  /** "danger" (default) is red; "neutral" suits non-destructive confirmations. */
  tone?: "danger" | "neutral"
}

/** Destructive confirmation modal shared by every list view. */
export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  disabled,
  icon,
  tone = "danger",
}: ConfirmDeleteDialogProps) {
  const isDanger = tone === "danger"
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm rounded-3xl border-none p-6 text-center shadow-2xl sm:p-8">
        <AlertDialogHeader className="space-y-3 sm:text-center">
          <div
            className={
              isDanger
                ? "mx-auto flex size-14 items-center justify-center rounded-full bg-red-100/70 text-red-600"
                : "mx-auto flex size-14 items-center justify-center rounded-full bg-[#701a2e]/10 text-[#701a2e]"
            }
          >
            {icon ?? <RiDeleteBinLine className="size-7" />}
          </div>
          <AlertDialogTitle className="text-foreground font-serif text-2xl font-bold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex gap-3 sm:justify-center">
          <AlertDialogCancel className="border-input h-11 flex-1 rounded-xl text-xs font-medium">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={disabled}
            className={
              isDanger
                ? "h-11 flex-1 rounded-xl bg-red-600 text-xs font-medium text-white shadow-sm hover:bg-red-700"
                : "h-11 flex-1 rounded-xl bg-[#701a2e] text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
            }
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
