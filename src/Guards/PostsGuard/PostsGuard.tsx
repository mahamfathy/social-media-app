import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const PostsGuard = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};
