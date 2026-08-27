"use client"

import { RiDeleteBinLine, RiEditLine } from "@remixicon/react"

import type { DepartmentRow } from "@/features/departments/departments.utils"

type DepartmentCardProps = {
  department: DepartmentRow
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function DepartmentCard({
  department,
  onEdit,
  onDelete,
}: DepartmentCardProps) {
  return (
    <div className="bg-card flex flex-col justify-between space-y-4 rounded-2xl border p-6 shadow-sm transition-colors hover:border-[#701a2e]/30">
      <div>
        <div className="text-muted-foreground flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider uppercase">
            DEPARTMENT
          </span>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => onEdit(department.id)}
              className="hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <RiEditLine className="size-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(department.id)}
              className="hover:text-destructive p-1 transition-colors"
            >
              <RiDeleteBinLine className="size-3.5" />
            </button>
          </div>
        </div>

        <h3 className="text-foreground mt-3 font-serif text-lg leading-snug font-bold">
          {department.name}
        </h3>
      </div>

      <div className="space-y-2 border-t pt-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">HOD</span>
          <span className="text-foreground font-bold">{department.hod}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">STAFFS</span>
          <span className="text-foreground font-bold">{department.staffs}</span>
        </div>
      </div>
    </div>
  )
}
