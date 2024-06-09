import React from "react";
import OnboardForm from "@/components/auth/OnboardForm";

type Props = {};

export default function Onboard({}: Props) {
  
  return (
    <section className="min-h-[80vh] flex justify-center">
      <OnboardForm />
    </section>
  );
}
