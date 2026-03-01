import { AuthService } from "@/services/auth.service";
import type { IUserData } from "@/Utils/interfaces/user/user-data.interface";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [userData, setUserData] = useState<IUserData | undefined>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await AuthService.getUserData();
        setUserData(data);
      } catch (error) {
        console.error("Fetch User Error:", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
