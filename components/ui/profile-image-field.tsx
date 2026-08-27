"use client"

import * as React from "react"
import { RiUploadCloudLine } from "@remixicon/react"

type ProfileImageFieldProps = {
  previewUrl?: string | null
  onFileChange: (file: File) => void
  /** Edit shows the stored photo framed; create shows an empty dashed box. */
  variant?: "empty" | "filled"
}

export function ProfileImageField({
  previewUrl,
  onFileChange,
  variant = "empty",
}: ProfileImageFieldProps) {
  const frameClass =
    variant === "filled"
      ? "border-input overflow-hidden p-2"
      : "border-input border-2 border-dashed p-4 text-center"

  return (
    <div className="bg-card space-y-4 rounded-2xl border p-6 shadow-sm">
      <h3 className="text-foreground text-sm font-bold">Profile image</h3>

      <label
        className={`bg-muted/20 hover:bg-muted/40 relative flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-xl border transition-colors ${frameClass}`}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Profile preview"
            className="size-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-full">
              <RiUploadCloudLine className="size-5" />
            </div>
            <p className="text-muted-foreground text-xs">
              Drop image or{" "}
              <span className="font-semibold text-[#701a2e]">browse</span>
            </p>
            <p className="text-muted-foreground/70 text-[10px]">
              1600×900 · JPG / PNG / WebP
            </p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) onFileChange(file)
          }}
        />
      </label>
    </div>
  )
}
