"use client";

import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import mailIcon from "@/assets/svgs/mail.svg";
import Image from "next/image";

type Props = {
  setVerified: React.Dispatch<React.SetStateAction<boolean>>
};

export default function VerifyInput({ setVerified }: Props) {
  const [otp, setOtp] = React.useState<string>("");

  const handleVerifyToken = () => {
    if (!otp || otp.length < 6) return;

    console.log(otp);
    setVerified(true)
  };

  const handleResendOtp = () => {
    
  }

  return (
    <div className="w-[95%] max-w-[32rem] px-4 py-4 bg-white rounded-md flex flex-col items-center text-center">
      <Image src={mailIcon} alt="mail-icon" />
      <h1 className="text-2xl font-semibold">Verify your email account</h1>
      <p className="text-sm text-gray my-2">
        We sent a one-time password (OTP) to
      </p>
      <h4 className="font-medium">email123@gmail.com</h4>
      <p className="text-sm text-gray my-2">Please enter OTP to proceed.</p>

      <div className="space-y-2 my-4">
        <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSeparator />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="w-full mt-4 flex">
        <button onClick={handleResendOtp} className="border py-2 px-4 text-sm rounded">Resend OTP</button>
      </div>
      <button
        onClick={handleVerifyToken}
        disabled={!otp || otp.length < 6}
        className="my-4 bg-dark text-white font-semibold text-sm w-full p-2 rounded disabled:cursor-not-allowed disabled:bg-gray"
      >
        Verify Email
      </button>
    </div>
  );
}
