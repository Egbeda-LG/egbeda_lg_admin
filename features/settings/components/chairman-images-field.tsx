"use client"

import * as React from "react"
import { RiAddLine, RiCloseLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { validateImageFile } from "@/features/uploads/uploads.repository"
import type { PlacementImage } from "@/lib/api/types"

/**
 * One entry in `chairman_info.images`. `file` is a newly picked image that has
 * not been uploaded yet; `photoUrl` is one already stored on the API.
 */
export type ChairmanImageDraft = {
  key: string
  photoUrl?: string
  file?: File
  isInHomepage: boolean
  isInGovernment: boolean
  isInAbout: boolean
  isInLowerHome: boolean
}

export function toImageDrafts(images?: PlacementImage[]): ChairmanImageDraft[] {
  return (images ?? []).map((image, index) => ({
    key: `${image.photo_url}-${index}`,
    photoUrl: image.photo_url,
    isInHomepage: image.is_in_homepage ?? false,
    isInGovernment: image.is_in_government ?? false,
    isInAbout: image.is_in_about ?? false,
    isInLowerHome: image.is_in_lower_home ?? false,
  }))
}

const PLACEMENTS = [
  { key: "isInHomepage", label: "Homepage" },
  { key: "isInLowerHome", label: "Lower home" },
  { key: "isInGovernment", label: "Government" },
  { key: "isInAbout", label: "About" },
] as const

type ChairmanImagesFieldProps = {
  images: ChairmanImageDraft[]
  onChange: (images: ChairmanImageDraft[]) => void
  disabled?: boolean
}

/**
 * Manages the whole `chairman_info.images` array: several photos, each with its
 * own placement flags, rather than a single photo with hardcoded placements.
 */
export function ChairmanImagesField({
  images,
  onChange,
  disabled,
}: ChairmanImagesFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [error, setError] = React.useState<string | null>(null)

  // Object URLs for the not-yet-uploaded files, revoked when they change.
  const previews = React.useMemo(
    () =>
      images.map((image) =>
        image.file ? URL.createObjectURL(image.file) : (image.photoUrl ?? ""),
      ),
    [images],
  )

  React.useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url)
      })
    }
  }, [previews])

  const addFiles = (fileList: FileList | null) => {
    if (!fileList?.length) return

    const accepted: ChairmanImageDraft[] = []

    for (const file of Array.from(fileList)) {
      const message = validateImageFile(file)

      if (message) {
        setError(message)
        continue
      }

      accepted.push({
        key: `${file.name}-${file.size}-${images.length + accepted.length}`,
        file,
        // A newly added photo is shown everywhere until told otherwise.
        isInHomepage: true,
        isInLowerHome: true,
        isInGovernment: true,
        isInAbout: true,
      })
    }

    if (accepted.length) setError(null)
    onChange([...images, ...accepted])

    if (inputRef.current) inputRef.current.value = ""
  }

  const update = (index: number, patch: Partial<ChairmanImageDraft>) =>
    onChange(
      images.map((image, i) => (i === index ? { ...image, ...patch } : image)),
    )

  const removeAt = (index: number) =>
    onChange(images.filter((_, i) => i !== index))

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
          Chairman photos
        </span>
        <span className="text-muted-foreground text-[10px]">
          {images.length} photo{images.length === 1 ? "" : "s"}
        </span>
      </div>

      {images.length === 0 ? (
        <p className="text-muted-foreground border-input rounded-xl border border-dashed p-6 text-center text-xs">
          No chairman photos yet. Add one below.
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {images.map((image, index) => (
          <div
            key={image.key}
            className="border-input bg-background space-y-3 rounded-xl border p-3"
          >
            <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg">
              {previews[index] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previews[index]}
                  alt={`Chairman photo ${index + 1}`}
                  className="size-full object-cover"
                />
              ) : null}

              <button
                type="button"
                onClick={() => removeAt(index)}
                disabled={disabled}
                title="Remove photo"
                className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white transition hover:bg-black/80 disabled:opacity-40"
              >
                <RiCloseLine className="size-3.5" />
              </button>

              {image.file ? (
                <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
                  Not uploaded yet
                </span>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                Show on
              </p>
              <div className="flex flex-wrap gap-3">
                {PLACEMENTS.map((placement) => (
                  <label
                    key={placement.key}
                    className="text-foreground flex cursor-pointer items-center gap-1.5 text-xs"
                  >
                    <Checkbox
                      checked={image[placement.key]}
                      disabled={disabled}
                      onCheckedChange={(checked) =>
                        update(index, { [placement.key]: checked === true })
                      }
                    />
                    {placement.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="border-input h-9 rounded-lg border-dashed text-xs font-medium shadow-none"
      >
        <RiAddLine className="mr-1 size-3.5" />
        Add photo
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="sr-only"
        disabled={disabled}
        onChange={(event) => addFiles(event.target.files)}
      />

      {error ? (
        <p className="text-destructive text-[11px] font-medium">{error}</p>
      ) : null}
    </div>
  )
}
