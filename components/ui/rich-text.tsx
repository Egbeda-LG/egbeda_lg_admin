import { cn } from "@/lib/utils"

type RichTextProps = {
  /** HTML produced by the article editor. */
  html: string
  className?: string
}

/**
 * Renders editor HTML with Tailwind Typography.
 *
 * Without `prose`, Tailwind's preflight strips the default styling from
 * `<strong>`, `<h2>`, `<ul>` and `<blockquote>`, so editor output renders as
 * flat undifferentiated text. The plugin is registered in `app/globals.css`.
 */
export function RichText({ html, className }: RichTextProps) {
  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        // Map the plugin's default grey palette onto the app's theme tokens.
        "prose-headings:font-serif prose-headings:text-foreground prose-headings:font-bold",
        "prose-p:text-foreground/90 prose-li:text-foreground/90",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-a:text-[#701a2e] prose-a:font-medium prose-a:underline",
        "prose-blockquote:border-l-[#701a2e] prose-blockquote:text-muted-foreground prose-blockquote:not-italic",
        "prose-img:rounded-xl prose-img:border",
        "prose-hr:border-border",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
