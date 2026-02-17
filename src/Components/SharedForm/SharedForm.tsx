import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  ArrowRight,
  Calendar,
  Lock,
  Mail,
  User,
  VenusAndMars,
} from "lucide-react";
import { Button } from "../ui/button";
export const SharedForm = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="fullname">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 size-4 text-gray-400" />
              <Input
                id="fullname"
                placeholder="John Doe"
                className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 size-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 size-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white"
            />
          </div>
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
                  placeholder="Confirm your password"
                  className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 size-4 text-gray-400" />
                  <Input
                    type="date"
                    className="pl-10 rounded-xl bg-gray-50/50 border-gray-200 w-full"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select>
                  <SelectTrigger className="w-full  flex items-center justify-between rounded-xl bg-gray-50/50 border-blue-500  relative focus:ring-blue-500">
                    <VenusAndMars className="absolute left-3 top-3 size-4 text-gray-400" />
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all gap-2 mt-4 text-base"
        >
          {isLogin ? "Sign in" : "Create Account"}
          <ArrowRight className="size-5" />
        </Button>
      </form>
    </>
  );
};
