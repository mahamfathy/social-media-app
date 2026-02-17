import * as z from "zod";

export const authSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20)
      .trim()
      .optional(),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20)
      .optional(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .trim(),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      ),
    rePassword: z.string().min(1, "rePassword is required").optional(),
    dateOfBirth: z
      .string()
      .refine(
        (value) => new Date(value) < new Date(),
        "Date must be in the Past",
      )
      .optional(),
    gender: z.enum(["male", "female"]).optional(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
