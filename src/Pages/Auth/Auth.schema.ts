import * as z from "zod";

export const authSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20)
      .trim()
      .optional()
      .or(z.literal("")),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20)
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 Char")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must has at least 1 small letter, capital letter, a number and a symbol ",
      ),
    rePassword: z.string().min(1, "rePassword is required"),
    dateOfBirth: z
      .string()
      .or(z.literal(""))
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

export type AuthSchema = z.infer<typeof authSchema>;
