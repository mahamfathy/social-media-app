import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  if (!localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};
