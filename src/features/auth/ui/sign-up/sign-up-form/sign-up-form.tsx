"use client";

import { authApi, SignUpDataT } from "@/features/auth/api/auth-api";
import { Card } from "@/shared/components/ui/card/card";
import { useMutation } from "@tanstack/react-query";
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
        <input
          className={`border-border mb-3 rounded-sm border pt-[5px] pb-[5px] pl-[10px]`}
          placeholder="login"
          {...register("login", { required: true })}
        />
        {errors.login && <span className={'text-red-400'}>This field is required</span>}

        <input
          className={`border-border mb-3 rounded-sm border pt-[5px] pb-[5px] pl-[10px]`}
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}

        <input
          className={`border-border mb-3 rounded-sm border pt-[5px] pb-[5px] pl-[10px]`}
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input
          className={`border-border mb-3 rounded-sm border pt-[5px] pb-[5px] pl-[10px]`}
          placeholder="confirm password"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && <span>This field is required</span>}

        <button type="submit" className={`mt-3 border border-border py-1 px-10 shadow-xs shadow-shadow rounded-lg m-auto`} >Submit</button>
      </form>
    </Card>
  );
};
