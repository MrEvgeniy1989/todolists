"use client";

import { SignUpForm } from "@/features/auth/ui/sign-up/sign-up-form/sign-up-form";
import { SuccessfulModalWindow } from "@/features/auth/ui/sign-up/successful-modal-window/successful-modal-window";
import { useState } from "react";

export default function SignUpPage() {
  const [isSuccessfulModalWindowOpen, setIsSuccessfulModalWindowOpen] = useState(false);

  return (
    <div className={"h-full w-full"}>
      <div className={"flex h-full w-full items-center justify-center"}>
        <SignUpForm setIsOpenSuccessfulModalAction={setIsSuccessfulModalWindowOpen} />
      </div>

      {isSuccessfulModalWindowOpen && (
        <SuccessfulModalWindow
          setIsSuccessfulModalWindowOpen={setIsSuccessfulModalWindowOpen}
          isSuccessfulModalWindowOpen={isSuccessfulModalWindowOpen}
        />
      )}
    </div>
  );
}
