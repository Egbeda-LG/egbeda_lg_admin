"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiCloseLine, RiSendPlaneLine } from "@remixicon/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { AdminShell } from "@/components/layout/admin-shell"
import { BackLink } from "@/components/layout/back-link"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ProjectFormFields } from "@/features/projects/components/project-form-fields"
import {
  useCreateProject,
  useProject,
  useUpdateProject,
} from "@/features/projects/projects.hooks"
import {
  projectFormDefaults,
  projectFormSchema,
  type ProjectFormValues,
} from "@/features/projects/projects.form"
import {
  fromProject,
  toProjectPayload,
} from "@/features/projects/projects.transformers"
import { useUploadFile } from "@/features/uploads/uploads.hooks"
import { notifyInvalidForm } from "@/lib/ui/form-errors"
import {
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

type ProjectFormPageProps = {
  mode: "create" | "edit"
}

export function ProjectFormPage({ mode }: ProjectFormPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = mode === "edit" ? searchParams.get("id") : null

  const project = useProject(id)
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()
  const uploadFile = useUploadFile()
  const [imageFile, setImageFile] = React.useState<File | null>(null)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: projectFormDefaults,
  })

  React.useEffect(() => {
    if (project.data) form.reset(fromProject(project.data))
  }, [form, project.data])

  const isSaving =
    uploadFile.isPending || createProject.isPending || updateProject.isPending

  async function onSubmit(values: ProjectFormValues) {
    if (mode === "edit" && !id) return

    let photoUrl = project.data?.photo_url ?? ""

    if (imageFile) {
      try {
        photoUrl = await uploadFile.mutateAsync({
          file: imageFile,
          folder: "projects",
        })
      } catch {
        return
      }
    }

    // The API requires photo_url to be a valid URL - an empty string is a 400.
    if (!photoUrl) {
      toast.error("A project image is required.")
      return
    }

    const payload = toProjectPayload(values, photoUrl)
    const onSuccess = () => router.push("/projects")

    if (mode === "edit" && id) {
      updateProject.mutate({ id, payload }, { onSuccess })
      return
    }

    createProject.mutate(payload, { onSuccess })
  }

  const submitLabel =
    mode === "edit"
      ? updateProject.isPending
        ? "Saving..."
        : "Save project"
      : createProject.isPending
        ? "Publishing..."
        : "Publish project"

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
            className="space-y-8"
          >
            <PageHeader
              title={mode === "edit" ? "Edit project" : "Add new project"}
              description="Read-only preview of how this article appears on the public website."
              actions={
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={SECONDARY_ACTION_CLASS}
                    onClick={() => router.push("/projects")}
                  >
                    <RiCloseLine className="mr-1.5 size-4" />
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving || (mode === "edit" && !id)}
                    size="sm"
                    className={PRIMARY_ACTION_CLASS}
                  >
                    <RiSendPlaneLine className="mr-1.5 size-4" />
                    {submitLabel}
                  </Button>
                </>
              }
            />

            <BackLink href="/projects">Back to projects</BackLink>

            <ProjectFormFields
              form={form}
              imageFile={imageFile}
              onImageChange={setImageFile}
              currentImageUrl={project.data?.photo_url}
              isSaving={isSaving}
            />
          </form>
        </Form>
      </div>
    </AdminShell>
  )
}
