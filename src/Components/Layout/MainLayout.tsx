import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
export const MainLayout = () => {
  const { token } = useAuth();

  return (
    <>
      {token && <Navbar />}
      <div className="mx-auto max-w-7xl px-3 py-3.5">
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      {token && <Footer />}
    </>
  );
};
