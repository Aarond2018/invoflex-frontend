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
import { CookieValueTypes, getCookie } from "cookies-next";
import { useReactMutation } from "@/services/apiHelpers";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";

type Props = {
  // setVerified: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: CookieValueTypes;
};

export default function VerifyInput({ /* setVerified */ userEmail  }: Props) {
  const [otp, setOtp] = React.useState<string>("");

  const router = useRouter()
  const { toast } = useToast()

  const { mutate:verifyOtp, isPending } = useReactMutation(
    "/auth/verifyOtp",
    "post"
  );
  
  const { mutate:sendOtp, isPending:resendingOtp } = useReactMutation(
    "/auth/sendOtp",
    "post"
  );

  const handleVerifyOtp = () => {
    if (!otp || otp.length < 6) return;

    verifyOtp({ otp }, {
      onSuccess() {
        toast({
          variant: "success",
          title: "Success!",
          description: "User verified successfully!",
        })
        router.replace("/auth/dashboard")
      }, 
      onError(error) {
        toast({
          variant: "destructive",
          title: "Error!",
          description: error?.response?.data.message || error?.message || "Something went wrong!",
        })
      }
    })
    
  };

  const handleResendOtp = () => {
    sendOtp({}, {
      onSuccess() {
        toast({
          variant: "success",
          title: "Success!",
          description: "New OTP sent! Check your email.",
        })
      }, 
      onError(error) {
        toast({
          variant: "destructive",
          title: "Error!",
          description: error?.response?.data.message || error?.message || "Something went wrong!",
        })
      }
    })
  };

  return (
    <div className="w-[95%] max-w-[32rem] px-4 py-4 bg-white rounded-md flex flex-col items-center text-center">
      <Image src={mailIcon} alt="mail-icon" />
      <h1 className="text-2xl font-semibold">Verify your email account</h1>
      <p className="text-sm text-gray my-2">
        We sent a one-time password (OTP) to
      </p>
      {userEmail && <h4 className="font-medium">{userEmail}</h4>}
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
        <button
          onClick={handleResendOtp}
          className="border py-2 px-4 text-sm rounded disabled:cursor-not-allowed disabled:text-gray"
          disabled={resendingOtp}
        >
         {resendingOtp ? "Resending..." : "Resend OTP" }
        </button>
      </div>
      <button
        onClick={handleVerifyOtp}
        disabled={!otp || otp.length < 6 || isPending}
        className="my-4 bg-dark text-white font-semibold text-sm w-full p-3 rounded disabled:cursor-not-allowed disabled:bg-gray"
      >
        {isPending ? "Verifing..." : "Verify Email"}
      </button>
    </div>
  );
}
