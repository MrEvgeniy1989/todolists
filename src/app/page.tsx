import Link from "next/link";

export default function Home() {
  return (
    <div className={"flex flex-col gap-2"}>
      <Link href={"/auth/sign-in"}>Sign In</Link>
      <Link href={"/auth/sign-up"}>Sign Up</Link>
    </div>
  );
}
