"use client"

import * as React from "react"
import { RiCheckboxCircleFill } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  onConfirm?: () => void
  confirmText?: string
}

export function SuccessModal({
  open,
  onOpenChange,
  title = "Action Successful",
  description = "Your action has been completed successfully.",
  onConfirm,
  confirmText = "Done",
}: SuccessModalProps) {
  const handleConfirm = () => {
    onOpenChange(false)
    if (onConfirm) onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center rounded-3xl p-6 text-center sm:max-w-md sm:p-8">
        {/* Soft Emerald Success Badge */}
        <div className="mb-2 flex size-14 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm">
          <RiCheckboxCircleFill className="size-8" />
        </div>

        <DialogHeader className="items-center space-y-2 text-center">
          <DialogTitle className="text-foreground font-serif text-2xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground max-w-xs text-xs">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full pt-4">
          <Button
            type="button"
            onClick={handleConfirm}
            className="h-11 w-full rounded-xl bg-[#701a2e] text-xs font-semibold text-white shadow-sm hover:bg-[#571323]"
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
