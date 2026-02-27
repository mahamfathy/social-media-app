import z from "zod";

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 Char")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must has at least 1 small letter, capital letter, a number and a symbol ",
      ),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmNewPassword;
    },
    {
      message: "Passwords don't match",
      path: ["confirmNewPassword"],
    },
  );
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
