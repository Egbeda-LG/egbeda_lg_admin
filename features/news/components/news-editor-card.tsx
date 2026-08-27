"use client"

import dynamic from "next/dynamic"

import "react-quill-new/dist/quill.snow.css"

import { Input } from "@/components/ui/input"
import { NEWS_EDITOR_MODULES } from "@/features/news/news.utils"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

const TITLE_INPUT_CLASS =
  "h-12 border-none bg-transparent px-0 font-serif text-2xl font-bold placeholder:text-muted-foreground/50 shadow-none focus-visible:ring-0 sm:text-3xl"

type NewsEditorCardProps = {
  title: string
  slug: string
  content: string
  /** Spread of react-hook-form's register("title"). */
  titleInputProps: React.ComponentProps<typeof Input>
  onContentChange: (value: string) => void
}

export function NewsEditorCard({
  title,
  slug,
  content,
  titleInputProps,
  onContentChange,
}: NewsEditorCardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-card space-y-3 rounded-2xl border p-6 shadow-sm">
        <Input
          type="text"
          placeholder="Article title"
          value={title}
          {...titleInputProps}
          className={TITLE_INPUT_CLASS}
        />
        <p className="text-muted-foreground text-xs">
          URL: <span className="font-mono text-rose-800">/news/{slug}</span>
        </p>
      </div>

      <div className="bg-card space-y-4 rounded-2xl border p-6 shadow-sm">
        <div className="flex min-h-[360px] flex-col">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={onContentChange}
            placeholder="Write your article body here..."
            modules={NEWS_EDITOR_MODULES}
            className="[&_.ql-container]:border-border [&_.ql-toolbar]:border-border flex flex-1 flex-col [&_.ql-container]:rounded-b-xl [&_.ql-editor]:min-h-[280px] [&_.ql-editor]:text-sm [&_.ql-toolbar]:rounded-t-xl"
          />
        </div>
      </div>
    </div>
  )
}
