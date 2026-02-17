import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./Components/Layout/MainLayout";
import { Auth } from "./Pages/Auth/Auth";
import NotFound from "./Pages/NotFound/NotFound";
import PostDetails from "./Pages/PostDetails/PostDetails";
import Posts from "./Pages/Posts/Posts";
import Profile from "./Pages/Profile/Profile";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <Posts /> },
        { path: "/sign-in", element: <Auth /> },
        { path: "/sign-up", element: <Auth /> },
        { path: "/profile", element: <Profile /> },
        { path: "/post-details/:id", element: <PostDetails /> },
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
