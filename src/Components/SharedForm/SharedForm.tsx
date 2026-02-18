import axiosInstance from "@/api/api.config";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { authSchema, type AuthSchema } from "@/Pages/Auth/Auth.schema";
import type { IAuth } from "@/Utils/interfaces/auth/auth.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Calendar,
  Lock,
  Mail,
  User,
  VenusAndMars,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export const SharedForm = ({ isLogin }: { isLogin: boolean }) => {
  const navigate = useNavigate();
  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(authSchema),
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = methods;
  const submitForm = async (values: AuthSchema) => {
    const endPoint = isLogin ? "/users/signin" : "/users/signup";
    const payload = isLogin
      ? { email: values.email, password: values.password }
      : values;

    try {
      const { data } = await axiosInstance.post<IAuth>(endPoint, payload);

      if (data.message === "success" || data.data?.token) {
        toast.success(data.message);
        if (data.data?.token) {
          localStorage.setItem("token", data.data?.token);
        }
        setTimeout(() => {
          if (isLogin) {
            navigate("/");
          } else {
            navigate("/sign-in");
          }
        }, 500);
      }
    } catch (error: any) {
      console.error("Submission error details:", error.response?.data);
    }
  };
  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 size-4 text-gray-400" />
              <Input
                {...register("name")}
                id="name"
                placeholder="Maha Fathy"
                className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
        )}
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 size-4 text-gray-400" />
              <Input
                {...register("username")}
                id="username"
                placeholder="maha123"
                className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}{" "}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 size-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="mahafathyh@gmail.com"
              className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}{" "}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 size-4 text-gray-400" />
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Maha@123"
              className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {!isLogin && (
          <>
            <div className="space-y-2 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-10">
              <Label htmlFor="rePassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-4 text-gray-400" />
                <Input
                  id="rePassword"
                  type="password"
                  {...register("rePassword")}
                  placeholder="Confirm your password"
                  className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white"
                />
              </div>
              {errors.rePassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.rePassword.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 size-4 text-gray-400" />
                  <Input
                    type="date"
                    {...register("dateOfBirth")}
                    className="pl-10 rounded-xl bg-gray-50/50 border-gray-200 w-full"
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200">
                        <VenusAndMars className="absolute left-3 top-3 size-4 text-gray-400" />
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all gap-2 mt-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span>Processing...</span>
              <Spinner className="size-5 text-white" />
            </>
          ) : (
            <>
              {isLogin ? "Sign in" : "Create Account"}
              <ArrowRight className="size-5" />
            </>
          )}
        </Button>
      </form>
      {console.log("Form Errors:", errors)}
    </>
  );
};
