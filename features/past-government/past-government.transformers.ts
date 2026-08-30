import type { PastGovernmentFormValues } from "@/features/past-government/past-government.form"
import type { PastGovernmentPayload } from "@/lib/api/types"

export function toPastGovernmentPayload(
  values: PastGovernmentFormValues,
): PastGovernmentPayload {
  return {
    name: values.name.trim(),
    date: values.date.trim(),
    sort_order: Number(values.sortOrder),
    election_type: values.electionType,
  }
}
