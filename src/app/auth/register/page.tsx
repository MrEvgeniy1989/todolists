"use client"

import { RegisterForm } from "@/features/auth/ui/register/register-form/register-form"
import { SuccessfulModalWindow } from "@/features/auth/ui/register/successful-modal-window/successful-modal-window"
import { useState } from "react"

export default function RegisterPage() {
  const [isSuccessfulModalWindowOpen, setIsSuccessfulModalWindowOpen] = useState(false)

  return (
    <div className={"h-full w-full"}>
      <div className={"flex h-full w-full items-center justify-center"}>
        <RegisterForm setIsOpenSuccessfulModalAction={setIsSuccessfulModalWindowOpen} />
      </div>

      {isSuccessfulModalWindowOpen && (
        <SuccessfulModalWindow
          setIsSuccessfulModalWindowOpen={setIsSuccessfulModalWindowOpen}
          isSuccessfulModalWindowOpen={isSuccessfulModalWindowOpen}
        />
      )}
    </div>
  )
}
