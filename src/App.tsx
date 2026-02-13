import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./Components/Layout/MainLayout";
import { Login } from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import PostDetails from "./Pages/PostDetails/PostDetails";
import Posts from "./Pages/Posts/Posts";
import Profile from "./Pages/Profile/Profile";
import SignUp from "./Pages/SignUp/SignUp";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <Posts /> },
        { path: "/login", element: <Login /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/profile", element: <Profile /> },
        { path: "/post-details:id", element: <PostDetails /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};
export default App;
