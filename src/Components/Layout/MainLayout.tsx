import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
export const MainLayout = () => {
  const { token } = useAuth();

  return (
    <>
      {token && <Navbar />}
      <div className="bg-[#f0f2f5]">
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      {token && <Footer />}
    </>
  );
};
