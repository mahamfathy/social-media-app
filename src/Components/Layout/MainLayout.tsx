import { useAuth } from "@/Utils/custom-hooks/useAuthContext/useAuth";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
export const MainLayout = () => {
  const { token } = useAuth();

  return (
    <>
      {token && <Navbar />}

      <main>
        <Outlet />
      </main>

      {token && <Footer />}
    </>
  );
};
