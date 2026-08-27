"use client"

import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

import axios from "axios"

import { uploadsRepository } from "@/features/uploads/uploads.repository"
import { getApiErrorMessage } from "@/lib/api/errors"

export function useUploadFile() {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder: string }) =>
      uploadsRepository.upload(file, folder),
    onError: (error) => {
      // A refused CORS preflight never produces a response, so axios reports it
      // as a generic network error. Name the real cause instead.
      if (axios.isAxiosError(error) && !error.response) {
        toast.error(
          "Upload blocked by the storage bucket (CORS). The S3 bucket needs a CORS policy allowing PUT from this origin.",
        )
        return
      }

      toast.error(
        getApiErrorMessage(error, "File upload failed. Please try again."),
      )
    },
  })
}
