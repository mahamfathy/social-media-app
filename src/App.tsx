import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./Components/Layout/MainLayout";
import { AuthContextProvider } from "./Context/AuthContextProvider";
import { AuthGuard } from "./Guards/AuthGuard/AuthGuard";
import { PostsGuard } from "./Guards/PostsGuard/PostsGuard";
import { Auth } from "./Pages/Auth/Auth";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import Feed from "./Pages/Feed/Feed";
import NotFound from "./Pages/NotFound/NotFound";
import Notifications from "./Pages/Notifications/Notifications";
import PostDetails from "./Pages/PostDetails/PostDetails";
import Profile from "./Pages/Profile/Profile";
import SuggestedFriends from "./Pages/SuggestedFriends/SuggestedFriendsPage";
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
              <Navigate to="/feed" />
              <Feed />
            </PostsGuard>
          ),
        },
        {
          path: "/feed",
          element: (
            <PostsGuard>
              <Feed />
            </PostsGuard>
          ),
        },
        {
          path: "/suggestions",
          element: (
            <PostsGuard>
              <SuggestedFriends />
            </PostsGuard>
          ),
        },
        {
          path: "/settings",
          element: (
            <PostsGuard>
              <ChangePassword />
            </PostsGuard>
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
          path: "/notifications",
          element: (
            <PostsGuard>
              <Notifications />
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
          path: "/profile/:id",
          element: (
            <PostsGuard>
              <Profile />
            </PostsGuard>
          ),
        },
        {
          path: "/posts/:id",
          element: (
            <PostsGuard>
              <PostDetails />
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
