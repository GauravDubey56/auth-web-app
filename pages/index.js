import { useState, useEffect } from "react"
import { authCheck } from "@/utils/route";
import { useRouter } from "next/router";
import Features from "@/components/landing/Features";
export default function Home() {  
  const router = useRouter();
  const loggedIn = authCheck();
  return (
    <>
      {!loggedIn ? <Features /> : ""}
    </>
  )
}
