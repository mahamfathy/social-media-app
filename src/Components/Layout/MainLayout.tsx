import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export const MainLayout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/sign-in" || location.pathname === "/sign-up" ? (
        <Outlet />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};
