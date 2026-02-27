import * as z from "zod";

export const authSchema = z
  .object({
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
    rePassword: z.string().optional().or(z.literal("")),
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
    dateOfBirth: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (value) => !value || new Date(value) < new Date(),
        "Date must be in the Past",
      ),
    gender: z.enum(["male", "female"]).optional(),
  })
  .refine(
    (data) => {
      if (data.rePassword) {
        return data.password === data.rePassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["rePassword"],
    },
  );

export type AuthSchema = z.infer<typeof authSchema>;
