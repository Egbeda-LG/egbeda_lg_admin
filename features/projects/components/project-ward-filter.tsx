"use client"

import * as React from "react"

import { FilterPopover } from "@/components/ui/filter-popover"
import { wardLabel } from "@/features/projects/projects.utils"
import { useWards } from "@/features/wards/wards.hooks"

type ProjectWardFilterProps = {
  value: string
  onValueChange: (value: string) => void
}

export function ProjectWardFilter({
  value,
  onValueChange,
}: ProjectWardFilterProps) {
  const wardsQuery = useWards()

  const options = React.useMemo(
    () => [
      { value: "all", label: "All wards" },
      ...(wardsQuery.data ?? []).map((ward) => ({
        value: ward.ward_id,
        label: wardLabel(ward),
      })),
    ],
    [wardsQuery.data],
  )

  return (
    <FilterPopover
      value={value}
      onValueChange={onValueChange}
      options={options}
      placeholder="All wards"
      isLoading={wardsQuery.isLoading}
    />
  )
}
