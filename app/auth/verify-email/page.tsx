// "use client";

import React, { useState } from "react";
import VerifyInput from "@/components/auth/VerifyInput";
import { getCookie } from "cookies-next";
import { cookies } from 'next/headers';
// import VerifySuccess from "@/components/auth/VerifySuccess";

type Props = {};

export default function Verify({}: Props) {
  // const [verified, setVerified] = useState<boolean>(false);

  const userEmail = getCookie("dEmail", { cookies })

  return (
    <section className="min-h-[80vh] flex justify-center items-center">
      {/* {verified ? <VerifySuccess /> : <VerifyInput setVerified={setVerified} />} */}
      <VerifyInput userEmail={userEmail} />
    </section>
  );
}
