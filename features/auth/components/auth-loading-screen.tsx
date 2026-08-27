type AuthLoadingScreenProps = {
  message: string
}

export function AuthLoadingScreen({ message }: AuthLoadingScreenProps) {
  return (
    <div className="bg-background flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="border-primary size-10 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}
