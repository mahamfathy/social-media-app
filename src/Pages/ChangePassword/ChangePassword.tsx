import { AuthService } from "@/services/Auth.service";
import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "@/Utils/schemas/ChangePassword/ChangePassword.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCustomForm } from "../../Utils/custom-hooks/useCustomForm/useCustomForm";

const ChangePassword = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useCustomForm({
    schema: changePasswordSchema,
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const changePassMutation = useMutation({
    mutationFn: (values: ChangePasswordSchema) =>
      AuthService.changePassword({
        password: values.password,
        newPassword: values.newPassword,
      }),
    onSuccess: (data) => {
      reset();
      if (data.message === "success" || data.data?.token) {
        toast.success("Password updated!");
        localStorage.removeItem("token");
        setToken(null);
        navigate("/sign-in", { replace: true });
      }
    },
  });
  const submitForm = (values: ChangePasswordSchema) => {
    changePassMutation.mutate(values);
  };
  return (
    <div className="mx-auto max-w-7xl px-3 py-3.5">
      <main className="min-w-0">
        <div className="mx-auto max-w-2xl">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-key-round"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
              </span>
              <div>
                <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Change Password
                </h1>
                <p className="text-sm text-slate-500">
                  Keep your account secure by using a strong password.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(submitForm)}
              noValidate
              className="space-y-4"
            >
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Current password
                </span>
                <input
                  {...register("password")}
                  placeholder="Enter current password"
                  className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-[#1877f2]"
                  } focus:bg-white`}
                  type="password"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  New password
                </span>
                <input
                  {...register("newPassword")}
                  placeholder="Enter new password"
                  className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition ${
                    errors.newPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-[#1877f2]"
                  } focus:bg-white`}
                  type="password"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Confirm new password
                </span>
                <input
                  {...register("confirmNewPassword")}
                  placeholder="Re-enter new password"
                  className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition ${
                    errors.confirmNewPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-[#1877f2]"
                  } focus:bg-white`}
                  type="password"
                />
                {errors.confirmNewPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </label>

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#1877f2] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Update password"
                )}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
