"use client";

import React, { useState } from "react";
import VerifyInput from "@/components/auth/VerifyInput";
import VerifySuccess from "@/components/auth/VerifySuccess";

type Props = {};

export default function Verify({}: Props) {
  const [verified, setVerified] = useState<boolean>(false);

  return (
    <section className="min-h-[80vh] flex justify-center items-center">
      {verified ? <VerifySuccess /> : <VerifyInput setVerified={setVerified} />}
    </section>
  );
}
