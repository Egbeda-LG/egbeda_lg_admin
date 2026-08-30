"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCreatePastGovernment } from "@/features/past-government/past-government.hooks"
import {
  pastGovernmentFormDefaults,
  pastGovernmentFormSchema,
  type PastGovernmentFormValues,
} from "@/features/past-government/past-government.form"
import { toPastGovernmentPayload } from "@/features/past-government/past-government.transformers"
import { ELECTION_TYPE_OPTIONS, selectItems } from "@/lib/api/enums"
import { notifyInvalidForm } from "@/lib/ui/form-errors"
import {
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_SELECT_CLASS,
  PRIMARY_ACTION_CLASS,
  SECONDARY_ACTION_CLASS,
} from "@/lib/ui/form-styles"

type PastGovernmentFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * A dialog rather than a form route: a record has three fields and cannot be
 * edited afterwards, so there is no form page to share with an edit flow.
 */
export function PastGovernmentFormDialog({
  open,
  onOpenChange,
}: PastGovernmentFormDialogProps) {
  const createPastGovernment = useCreatePastGovernment()

  const form = useForm<PastGovernmentFormValues>({
    resolver: zodResolver(pastGovernmentFormSchema),
    defaultValues: pastGovernmentFormDefaults,
  })

  // Reset on open so a cancelled entry does not linger into the next one.
  React.useEffect(() => {
    if (open) form.reset(pastGovernmentFormDefaults)
  }, [form, open])

  const onSubmit = (values: PastGovernmentFormValues) => {
    createPastGovernment.mutate(toPastGovernmentPayload(values), {
      onSuccess: () => onOpenChange(false),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground font-serif text-xl font-bold">
            Add past administration
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Record a previous leader of Egbeda Local Government and how they
            came into office.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, notifyInvalidForm)}
            className="space-y-5 pt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={FORM_LABEL_CLASS}>NAME</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Hon. Sikiru Sanda"
                      {...field}
                      className={FORM_INPUT_CLASS}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_LABEL_CLASS}>DATE</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 2006 - 2007"
                        {...field}
                        className={FORM_INPUT_CLASS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_LABEL_CLASS}>
                      SORT ORDER
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="e.g. 2021"
                        {...field}
                        className={FORM_INPUT_CLASS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="electionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={FORM_LABEL_CLASS}>
                        HOW THEY CAME IN
                      </FormLabel>
                      <Select
                        items={selectItems(ELECTION_TYPE_OPTIONS)}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={FORM_SELECT_CLASS}>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ELECTION_TYPE_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={SECONDARY_ACTION_CLASS}
                onClick={() => onOpenChange(false)}
                disabled={createPastGovernment.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className={PRIMARY_ACTION_CLASS}
                disabled={createPastGovernment.isPending}
              >
                {createPastGovernment.isPending ? "Adding..." : "Add record"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
