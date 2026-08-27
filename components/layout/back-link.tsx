import Link from "next/link"

type BackLinkProps = {
  href: string
  children: React.ReactNode
}

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <div>
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-medium transition-colors"
      >
        ← {children}
      </Link>
    </div>
  )
}
