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
    <Card className={"flex min-w-[400px] flex-col shadow-2xl"} asChild>
      <form onSubmit={onFormDataSubmit}>
        <input placeholder="login" {...register("login", { required: true })} />
        {errors.login && <span>This field is required</span>}

        <input placeholder="email" {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}

        <input placeholder="password" {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </Card>
  );
};
