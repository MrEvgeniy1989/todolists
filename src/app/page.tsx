"use client";
import { useMeQuery } from "@/shared/api/use-me-query/use-me-query";
import { useRouter } from "next/navigation";
import {  useLayoutEffect, useState } from "react";
import TodolistsPage from './todolists/page'
import { useAuthStore } from "@/features/auth/model/auth-store";

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false)
  const { setIsLoggedIn, isLoggedIn } = useAuthStore();
  const { data: me, isLoading } = useMeQuery();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isLoading) {
      if (me) {
        setIsLoggedIn(true)
        router.push("/todolists");
      } else {
        router.push("/auth/sign-in");
      }
    }
  }, [me, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // useEffect(() => {
  //   if (!isLoading) {
  //     setIsInitialized(true)
  //     if (me?.data.login) {
  //       setIsLoggedIn(true)
  //     }
  //   }
  // }, [me, isLoading, setIsLoggedIn])

  console.log(isLoggedIn)

  return (
    <TodolistsPage />
  )
}
