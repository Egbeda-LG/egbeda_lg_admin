"use client"

import * as React from "react"
import { RiCloseLine, RiImageLine, RiUploadCloud2Line } from "@remixicon/react"

import { validateImageFile } from "@/features/uploads/uploads.repository"
import { cn } from "@/lib/utils"

type ImageDropzoneProps = {
  /** Already-uploaded image URL (edit screens). */
  value?: string | null
  /** Newly picked file, not yet uploaded. */
  file?: File | null
  onFileChange: (file: File | null) => void
  /** Clears an existing remote image. Omit to hide the remove button for it. */
  onClear?: () => void
  label?: string
  hint?: string
  disabled?: boolean
  className?: string
}

/**
 * Click-or-drag image picker with preview and client-side validation.
 *
 * The input is a real <input type="file"> inside a <label>, which is what makes
 * the whole area clickable - a bare <div> looks identical but cannot open the
 * file dialog.
 */
export function ImageDropzone({
  value,
  file,
  onFileChange,
  onClear,
  label,
  hint = "1600x900 - JPG / PNG / WebP - max 5MB",
  disabled,
  className,
}: ImageDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  // Derive the preview URL from the file, and revoke it when it changes or the
  // component unmounts. Deriving (rather than setting state in an effect) keeps
  // the preview available on first paint.
  const objectUrl = React.useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  )

  React.useEffect(() => {
    if (!objectUrl) return

    return () => URL.revokeObjectURL(objectUrl)
  }, [objectUrl])

  const preview = objectUrl ?? value ?? null

  const accept = React.useCallback(
    (nextFile: File | null) => {
      if (!nextFile) {
        setError(null)
        onFileChange(null)
        return
      }

      const message = validateImageFile(nextFile)

      if (message) {
        setError(message)
        onFileChange(null)
        return
      }

      setError(null)
      onFileChange(nextFile)
    },
    [onFileChange],
  )

  const reset = () => {
    setError(null)
    onFileChange(null)
    onClear?.()

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <span className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
          {label}
        </span>
      ) : null}

      {preview ? (
        <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-xl border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Selected"
            className="size-full object-cover"
          />

          {!disabled ? (
            <button
              type="button"
              onClick={reset}
              title="Remove image"
              className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white transition hover:bg-black/80"
            >
              <RiCloseLine className="size-4" />
            </button>
          ) : null}

          <label
            className={cn(
              "absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center gap-1.5 bg-black/55 py-2 text-[11px] font-medium text-white transition hover:bg-black/70",
              disabled && "pointer-events-none opacity-60",
            )}
          >
            <RiImageLine className="size-3.5" />
            Replace image
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              disabled={disabled}
              onChange={(event) => accept(event.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      ) : (
        <label
          onDragOver={(event) => {
            event.preventDefault()
            if (!disabled) setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setIsDragging(false)
            if (!disabled) accept(event.dataTransfer.files?.[0] ?? null)
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition",
            isDragging
              ? "border-[#701a2e] bg-rose-50/60"
              : "border-muted-foreground/30 bg-muted/20 hover:bg-muted/40",
            disabled && "pointer-events-none opacity-60",
          )}
        >
          <RiUploadCloud2Line className="text-muted-foreground mb-2 size-8" />
          <p className="text-foreground text-xs font-medium">
            Drop image or{" "}
            <span className="font-semibold text-rose-800 underline">
              browse
            </span>
          </p>
          <p className="text-muted-foreground mt-1 text-[10px]">{hint}</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            disabled={disabled}
            onChange={(event) => accept(event.target.files?.[0] ?? null)}
          />
        </label>
      )}

      {file ? (
        <p className="text-muted-foreground truncate text-[10px]">
          {file.name} - {(file.size / 1024 / 1024).toFixed(2)}MB
        </p>
      ) : null}

      {error ? (
        <p className="text-destructive text-[11px] font-medium">{error}</p>
      ) : null}
    </div>
  )
}
