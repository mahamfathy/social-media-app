import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import FeatureItem from "@/Components/FeatureItem/FeatureItem";
import { SharedForm } from "@/Components/SharedForm/SharedForm";
import StatItem from "@/Components/StateItem/StateItem";
import {
  Bell,
  Facebook,
  Heart,
  Image as ImageIcon,
  MessageCircle,
  Star,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import authImg from "../../assets/auth.jpg";

export const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/sign-in";
  return (
    <div className="grid lg:grid-cols-2 min-h-screen font-sans ">
      <div
        className="flex space-y-6 text-center items-center lg:text-start lg:items-baseline text-white flex-col justify-between p-10 relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 71, 230, 0.8), rgba(20, 71, 230, 0.8)), url(${authImg})`,
        }}
      >
        <header>
          <div className="flex items-center gap-3">
            <span className="size-10 md:size-12 text-lg font-bold flex justify-center items-center bg-white/40 border border-white/30 rounded-xl backdrop-blur-md">
              S
            </span>
            <span className="text-2xl font-bold tracking-tight">SocialHub</span>
          </div>
        </header>

        <div className="content space-y-7">
          <div className="title space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold max-w-lg leading-tight">
              {!isLogin ? " Connect with " : "Welcome Back "}{" "}
              <span className="bg-linear-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent">
                {!isLogin ? "amazing people" : "to SocialHub App"}
              </span>
            </h2>
            <p className="max-w-md opacity-90 text-lg">
              {!isLogin
                ? "Join millions of users sharing moments, ideas, and building meaningful connections every day."
                : "Signin to connect people all over the world"}
            </p>
          </div>

          <section className="feature-section hidden md:block">
            <ul className="feature-cards grid grid-cols-2 gap-4">
              <FeatureItem
                icon={<MessageCircle className="text-teal-300" size={20} />}
                title="Real-time Chat"
                desc="Instant messaging"
              />
              <FeatureItem
                icon={<ImageIcon className="text-blue-200" size={20} />}
                title="Share Media"
                desc="Photos & videos"
              />
              <FeatureItem
                icon={<Bell className="text-pink-200" size={20} />}
                title="Smart Alerts"
                desc="Stay updated"
              />
              <FeatureItem
                icon={<Users className="text-teal-300" size={20} />}
                title="Communities"
                desc="Find your tribe"
              />
            </ul>
          </section>

          <section className="stats-section hidden lg:block ">
            <ul className="flex items-center gap-10">
              <StatItem
                icon={<Users size={20} />}
                value="2M+"
                label="Active Users"
              />
              <StatItem
                icon={<Heart size={20} />}
                value="10M+"
                label="Posts Shared"
              />
              <StatItem
                icon={<MessageCircle size={20} />}
                value="50M+"
                label="Messages Sent"
              />
            </ul>
          </section>

          <figure className="hidden lg:block bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6 space-y-4 hover:bg-white/15 transition-all duration-300 max-w-md">
            <div className="flex text-yellow-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <blockquote className="text-lg italic leading-relaxed">
              "SocialHub has completely changed how I connect with friends. The
              experience is seamless!"
            </blockquote>
            <figcaption className="flex items-center gap-3 pt-2">
              <div className="size-10 rounded-full bg-linear-to-tr from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-xs">
                AJ
              </div>
              <div className="flex flex-col text-sm">
                <cite className="not-italic font-bold">Alex Johnson</cite>
                <span className="opacity-70 text-xs">Product Designer</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="bg-gray-50 flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-lg shadow-xl border-none rounded-3xl bg-white overflow-hidden">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-extrabold tracking-tight">
              {isLogin ? "Login" : "Create account"}
            </CardTitle>
            <CardDescription className="text-base">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Link
                to={isLogin ? "/sign-up" : "/sign-in"}
                className="text-blue-600 font-semibold p-1 hover:underline ml-1"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {" "}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 gap-2 h-11 rounded-xl hover:bg-gray-50"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="size-4"
                  alt="Google"
                />
                <span className="text-sm">Google</span>
              </Button>
              <Button className="flex-1 gap-2 h-11 rounded-xl bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-none">
                <Facebook className="size-4" fill="currentColor" />
                <span className="text-sm">Facebook</span>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-400 font-medium">
                  or continue with email
                </span>
              </div>
            </div>
            <SharedForm isLogin={isLogin} />
          </CardContent>{" "}
        </Card>
      </div>
    </div>
  );
};
