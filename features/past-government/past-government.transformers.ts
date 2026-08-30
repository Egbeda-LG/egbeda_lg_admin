import type { PastGovernmentFormValues } from "@/features/past-government/past-government.form"
import type { PastGovernmentPayload } from "@/lib/api/types"

/** The picker holds yyyy-MM-dd; the API wants the parts as numbers. */
export function toPastGovernmentPayload(
  values: PastGovernmentFormValues,
): PastGovernmentPayload {
  const [year, month, day] = values.date.split("-").map(Number)

  return {
    name: values.name.trim(),
    date: { year, month, day },
    election_type: values.electionType,
  }
}
