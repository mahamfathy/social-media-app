import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
export const MainLayout = () => {
  const { token } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f2f5]">
      {token && <Navbar />}

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};
