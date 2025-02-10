"use client";

import { SubmitHandler, useForm } from "react-hook-form";

type SignUpFormT = {
  login: string;
  password: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormT>();
  const onSubmit: SubmitHandler<SignUpFormT> = (data) => console.log(data);

  return (
    <div className={"w-full h-full flex items-center justify-center"}>
      <form onSubmit={handleSubmit(onSubmit)} className={"w-[300px] border h-[400px]"}>
        <div className={"flex flex-col w-full"}>
          <input placeholder="login" {...register("login", { required: true })} />
          {errors.password && <span>This field is required</span>}

          <input placeholder="password" {...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}

          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
