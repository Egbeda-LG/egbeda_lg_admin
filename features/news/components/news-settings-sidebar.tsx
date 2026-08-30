"use client"

import { RiCloseLine } from "@remixicon/react"

import { ImageDropzone } from "@/components/ui/image-dropzone"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  NEWS_CATEGORY_OPTIONS,
  PUBLISH_STATUS_OPTIONS,
  optionLabel,
  selectItems,
} from "@/lib/api/enums"

type NewsSettingsSidebarProps = {
  imageFile: File | null
  onImageChange: (file: File | null) => void
  currentImageUrl?: string | null
  onImageClear?: () => void
  status: string
  onStatusChange: (status: string) => void
  date: string
  onDateChange: (date: string) => void
  featured: "Yes" | "No"
  onFeaturedChange: (featured: "Yes" | "No") => void
  category: string
  onCategoryChange: (category: string) => void
  disabled?: boolean
}

export function NewsSettingsSidebar({
  imageFile,
  onImageChange,
  currentImageUrl,
  onImageClear,
  status,
  onStatusChange,
  date,
  onDateChange,
  featured,
  onFeaturedChange,
  category,
  onCategoryChange,
  disabled,
}: NewsSettingsSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="bg-card space-y-3 rounded-2xl border p-5 shadow-sm">
        <h3 className="text-foreground text-xs font-bold tracking-wider uppercase">
          Featured image
        </h3>
        <ImageDropzone
          file={imageFile}
          value={currentImageUrl ?? undefined}
          onFileChange={onImageChange}
          onClear={onImageClear}
          disabled={disabled}
        />
      </div>

      <div className="bg-card space-y-4 rounded-2xl border p-5 shadow-sm">
        <h3 className="text-foreground text-xs font-bold tracking-wider uppercase">
          Publishing
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between py-1">
            <span className="text-muted-foreground">Status</span>
            <Select
              items={selectItems(PUBLISH_STATUS_OPTIONS)}
              value={status}
              onValueChange={(value) => onStatusChange(value ?? "")}
            >
              <SelectTrigger className="border-input h-11 w-28 text-xs shadow-none">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {PUBLISH_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between border-t py-1">
            <span className="text-muted-foreground">Featured news</span>
            <Select
              items={{ Yes: "Yes", No: "No" }}
              value={featured}
              onValueChange={(value) =>
                onFeaturedChange((value ?? "No") as "Yes" | "No")
              }
            >
              <SelectTrigger className="border-input h-11 w-24 text-xs shadow-none">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between border-t py-1">
            <span className="text-muted-foreground">Visibility</span>
            <span className="text-foreground font-semibold">Public</span>
          </div>

          <div className="flex items-center justify-between border-t py-1">
            <span className="text-muted-foreground">Date</span>
            <Input
              value={date}
              onChange={(event) => onDateChange(event.target.value)}
              placeholder="e.g. 24 May 2025"
              className="border-input h-11 w-40 text-xs shadow-none"
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      <div className="bg-card space-y-3 rounded-2xl border p-5 shadow-sm">
        <h3 className="text-foreground text-xs font-bold tracking-wider uppercase">
          Category
        </h3>
        <Select
          items={selectItems(NEWS_CATEGORY_OPTIONS)}
          value={category}
          onValueChange={(value) => onCategoryChange(value ?? "")}
        >
          <SelectTrigger className="border-input h-11 w-full text-xs shadow-none">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {NEWS_CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {category && (
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-[#701a2e]">
              <span>{optionLabel(NEWS_CATEGORY_OPTIONS, category)}</span>
              <button
                type="button"
                onClick={() => onCategoryChange("")}
                className="hover:text-rose-950"
              >
                <RiCloseLine className="size-3.5" />
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
