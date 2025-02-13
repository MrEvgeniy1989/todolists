"use client";

import { Card } from "@/shared/components/ui/card/card";
import { SubmitHandler, useForm } from "react-hook-form";

type SignUpFormT = {
  login: string;
  email: string;
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
      <Card className={"flex flex-col min-w-[400px]"} asChild>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="login" {...register("login", { required: true })} />
          {errors.login && <span>This field is required</span>}

          <input placeholder="email" {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}

          <input placeholder="password" {...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </Card>
    </div>
  );
}
