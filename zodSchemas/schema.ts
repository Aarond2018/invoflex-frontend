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
  terms: z.coerce.boolean().refine((val) => val === true, {
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
  logo: z.any(),
});

export const InvoiceSchema = z.object({
  description: z
    .string({ required_error: "Enter a brief description" })
    .min(1, { message: "Enter a brief description" }),
  addressedTo: z
    .string({ required_error: "You need to select a client" })
    .min(1, { message: "You need to select a client" }),
  dueDate: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date format",
  }),
  items: z.array(
    z.object({
      description: z
        .string({
          required_error:
            "You need to enter a description for all entered items",
        })
        .min(1, {
          message: "You need to enter a description for all entered items",
        }),
      quantity: z
        .number({ required_error: "item quantity is required" })
        .int()
        .min(1, { message: "Quantity must be at least 1" }),
      rate: z.number({ required_error: "rate is required" }),
    })
  ),
  totalAmount: z
    .number({ required_error: "Total amount for all items is required" })
    .min(1, { message: "Total amount for all items is required" }),
  status: z.string({
    required_error: "Invoice status is required",
  }),
});

export const CreateClientSchema = z.object({
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
  address: z.string().optional()
})