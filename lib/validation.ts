import * as z from "zod"

/**
 * A link that may be left blank, but must be a real URL when filled in.
 *
 * `z.string().url().optional()` is not enough on its own: react-hook-form keeps
 * cleared inputs as `""` rather than `undefined`, and an empty string fails the
 * URL check.
 */
export function optionalUrl(label: string) {
  return z.union([
    z.literal(""),
    z.string().url(`Enter a valid ${label} URL`),
  ])
}
