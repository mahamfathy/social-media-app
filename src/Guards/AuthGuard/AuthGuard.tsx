import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface Children {
  children: ReactNode;
}
export const AuthGuard = ({ children }: Children) => {
  if (!localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};
