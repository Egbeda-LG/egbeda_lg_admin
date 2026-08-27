/**
 * Tailwind recipes shared by the admin console forms. Keeping them here means a
 * field tweak lands everywhere instead of being copy-pasted per page.
 */
export const FORM_LABEL_CLASS =
  "text-[11px] font-bold tracking-wider text-muted-foreground uppercase"

export const FORM_INPUT_CLASS =
  "h-11 rounded-lg text-xs border-input shadow-none focus-visible:ring-1 focus-visible:ring-[#701a2e]"

export const FORM_TEXTAREA_CLASS =
  "rounded-lg text-xs border-input shadow-none focus-visible:ring-1 focus-visible:ring-[#701a2e]"

export const FORM_SELECT_CLASS =
  "h-11 w-full rounded-lg text-xs border-input shadow-none"

/** Brand-filled primary action (Save / Publish). */
export const PRIMARY_ACTION_CLASS =
  "h-10 rounded-lg bg-[#701a2e] hover:bg-[#571323] text-white font-medium text-xs shadow-sm"

/** Outlined secondary action (Discard / Preview). */
export const SECONDARY_ACTION_CLASS =
  "h-10 rounded-lg text-xs font-medium border-input shadow-none"
