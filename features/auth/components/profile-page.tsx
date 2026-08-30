"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiKey2Line, RiSaveLine } from "@remixicon/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { AdminShell } from "@/components/layout/admin-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChangePasswordDialog } from "@/features/auth/components/change-password-dialog"
import { ProfileIdentityCard } from "@/features/auth/components/profile-identity-card"
import {
  profileFormDefaults,
  profileFormSchema,
  type ProfileFormValues,
} from "@/features/auth/auth.form"
import { useAdminProfile } from "@/features/auth/auth.hooks"
import { fromAdminProfile } from "@/features/auth/auth.transformers"
import {
  PROFILE_UPDATE_UNAVAILABLE_MESSAGE,
  profileInitials,
  roleLabel,
} from "@/features/auth/auth.utils"
import { useAuth } from "@/lib/auth/auth-context"
import { notifyInvalidForm } from "@/lib/ui/form-errors"

const LABEL_CLASS =
  "text-xs font-bold tracking-wider text-muted-foreground uppercase"
const FIELD_CLASS = "h-11 rounded-xl bg-background border-input text-sm"

const PROFILE_FIELDS = [
  { name: "firstName", label: "FIRST NAME", placeholder: "Enter first name" },
  { name: "lastName", label: "LAST NAME", placeholder: "Enter last name" },
  { name: "workEmail", label: "WORK EMAIL" },
  { name: "phoneNumber", label: "PHONE NUMBER" },
  { name: "staffId", label: "STAFF ID" },
  { name: "department", label: "DEPARTMENT" },
] as const

export function ProfilePage() {
  const profile = useAdminProfile()
  const { user } = useAuth()
  // GET /auth/me is the fuller record, but the stored session already carries
  // name, email and role - so the card stays populated if that request fails.
  const admin = profile.data ?? user
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = React.useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileFormDefaults,
  })

  React.useEffect(() => {
    if (profile.data) form.reset(fromAdminProfile(profile.data))
  }, [form, profile.data])

  // There is no profile-update endpoint; the form only reads the account.
  const onSubmit = () => toast.error(PROFILE_UPDATE_UNAVAILABLE_MESSAGE)

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        <PageHeader
          title="My Profile"
          description="Manage your personal details, credentials and active sessions."
        />

        <ProfileIdentityCard
          initials={profileInitials(admin?.name)}
          name={admin?.name ?? "Administrator"}
          subtitle={
            [roleLabel(admin?.role), admin?.email]
              .filter(Boolean)
              .join(" · ") || "Signed-in administrator"
          }
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
            className="space-y-8"
          >
            <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-8">
              <h3 className={LABEL_CLASS}>PERSONAL INFORMATION</h3>

              <div className="grid gap-6 sm:grid-cols-2">
                {PROFILE_FIELDS.map((profileField) => (
                  <FormField
                    key={profileField.name}
                    control={form.control}
                    name={profileField.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={LABEL_CLASS}>
                          {profileField.label}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              "placeholder" in profileField
                                ? profileField.placeholder
                                : undefined
                            }
                            className={FIELD_CLASS}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="flex justify-end border-t pt-4">
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 rounded-xl bg-[#701a2e] px-5 text-xs font-medium text-white shadow-sm hover:bg-[#571323]"
                >
                  <RiSaveLine className="mr-1.5 size-4" />
                  Save changes
                </Button>
              </div>
            </div>
          </form>
        </Form>

        <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-8">
          <h3 className={LABEL_CLASS}>SECURITY</h3>

          <div className="bg-background flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-[#701a2e]">
                <RiKey2Line className="size-5" />
              </div>
              <div>
                <h4 className="text-foreground font-serif text-sm font-bold">
                  Password
                </h4>
                <p className="text-muted-foreground text-xs">
                  Last changed 3 months ago
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 rounded-xl border-[#701a2e] px-4 text-xs font-medium text-[#701a2e] hover:bg-[#701a2e]/10"
              onClick={() => setIsPasswordDialogOpen(true)}
            >
              Change
            </Button>
          </div>
        </div>

        <ChangePasswordDialog
          open={isPasswordDialogOpen}
          onOpenChange={setIsPasswordDialogOpen}
          // The account address, not the editable work email - the OTP goes to
          // the account, and an unrecognised address is rejected.
          email={admin?.email ?? ""}
          lockEmail
        />
      </div>
    </AdminShell>
  )
}
