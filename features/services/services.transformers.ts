import { compactStringList } from "@/components/ui/string-list-field"
import type { ServiceFormValues } from "@/features/services/services.form"
import type { ServiceItem, ServicePayload } from "@/lib/api/types"

export function toServicePayload(values: ServiceFormValues): ServicePayload {
  return {
    name: values.name,
    short_description: values.shortDescription ?? "",
    department: values.department,
    timeline: values.timeline ?? "",
    description: values.description ?? "",
    eligibility: compactStringList(values.eligibility),
    required_documents: compactStringList(values.requiredDocument),
    application_process: compactStringList(values.applicationProcess),
    status: values.status,
    is_featured: false,
  }
}

export function fromService(item: ServiceItem): ServiceFormValues {
  return {
    name: item.name,
    shortDescription: item.short_description,
    department: item.department,
    // The API has no fee field on services yet.
    amount: "",
    timeline: item.timeline,
    description: item.description,
    eligibility: item.eligibility ?? [],
    requiredDocument: item.required_documents ?? [],
    applicationProcess: item.application_process ?? [],
    status: item.status,
  }
}
