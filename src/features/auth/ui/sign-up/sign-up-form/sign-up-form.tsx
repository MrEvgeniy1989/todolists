"use client";

import { authApi, SignUpDataT } from "@/features/auth/api/auth-api";
import { Card } from "@/shared/components/ui/card/card";
import { Input } from "@/shared/components/ui/input/input";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";

type Props = {
  setIsOpenSuccessfulModalAction: (isOpenSuccessfulModal: boolean) => void;
};

export const SignUpForm = ({ setIsOpenSuccessfulModalAction }: Props) => {
  const { mutate } = useMutation({
    mutationFn: async (formData: SignUpDataT) => {
      return authApi.signUp(formData);
    },
    onSuccess: (data) => {
      console.log(data.data.message);
      setIsOpenSuccessfulModalAction(true);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDataT>();

  const onFormDataSubmit = handleSubmit((formData: SignUpDataT) => {
    mutate(formData);
  });

  return (
    <Card className={"flex min-w-[400px] flex-col"} asChild>
      <form onSubmit={onFormDataSubmit}>
        <h1 className={`mb-5 text-center`}>Sign Up</h1>
        <Input
          className={`mb-3`}
          placeholder="login"
          {...register("login", { required: true })}
        />
        {errors.login && <span className={'text-red-400'}>This field is required</span>}

        <Input
          className={`mb-3`}
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}

        <Input
          className={`mb-3`}
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <Input
          className={`mb-3`}
          placeholder="confirm password"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && <span>This field is required</span>}

        <button type="submit" className={`mt-3 bg-primary border border-border py-1 px-10 shadow-xs shadow-shadow rounded-lg`} >Submit</button>

        <span className={'text-base text-center mt-5'}>Do you have account?</span>
        <Link href={'/auth/sign-in'} className={'text-primary text-center'}>Sign In</Link>
      </form>
    </Card>
  );
};
