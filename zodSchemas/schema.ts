import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be 8 or more characters long" }),
});

export const SignUpSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, { message: "Name is required" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be 8 or more characters long" }),
  terms: z.coerce
    .boolean()
    .refine((val) => val === true, {
      message: "Check the box to accept terms and conditions",
    }),
});

export const OnboardSchema = z.object({
  businessName: z
    .string({
      required_error: "Enter a business name",
    })
    .min(1, { message: "Enter a business name" }),
  address: z
    .string({
      required_error: "Enter an address",
    })
    .min(1, { message: "Enter an address" }),
  // phone: z
  //   .string({
  //     required_error: "Enter your phone number",
  //   })
  //   .min(1, { message: "Enter your phone number" }),
  logo: z.any()
});