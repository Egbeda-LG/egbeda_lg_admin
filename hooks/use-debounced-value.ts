"use client"

import * as React from "react"

/**
 * Delays a rapidly-changing value so it can be used in a query key without
 * firing a request on every keystroke.
 */
export function useDebouncedValue<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
