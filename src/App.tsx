import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./Components/Layout/MainLayout";
import { AuthContextProvider } from "./Context/AuthContextProvider";
import { AuthGuard } from "./Guards/AuthGuard/AuthGuard";
import { PostsGuard } from "./Guards/PostsGuard/PostsGuard";
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
        {
          index: true,
          element: (
            <PostsGuard>
              <Posts />
            </PostsGuard>
          ),
        },
        {
          path: "/sign-in",
          element: (
            <AuthGuard>
              <Auth />
            </AuthGuard>
          ),
        },
        {
          path: "/sign-up",
          element: (
            <AuthGuard>
              <Auth />
            </AuthGuard>
          ),
        },
        {
          path: "/profile",
          element: (
            <PostsGuard>
              <Profile />
            </PostsGuard>
          ),
        },
        {
          path: "/post-details/:id",
          element: (
            <PostsGuard>
              <PostDetails />{" "}
            </PostsGuard>
          ),
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Toaster />
          <RouterProvider router={routes} />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
};
export default App;
