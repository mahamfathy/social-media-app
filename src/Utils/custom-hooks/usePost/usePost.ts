import { postsService } from "@/services/posts.service";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../useAuth/useAuth";

export const usePost = (activeTab: string, userId?: string) => {
  const { userData } = useAuth();

  const myId = userData?.data?.user._id;
  return useQuery({
    queryKey: ["posts", activeTab, userId || myId],
    queryFn: () => {
      if (userId && userId !== myId) {
        return postsService.getUserPosts(userId);
      }
      switch (activeTab) {
        case "community":
          return postsService.getFeed("all");
        case "my posts":
          return postsService.getFeed("me");
        case "saved":
          return postsService.getSavedPosts();
        default:
          return postsService.getFeed("following");
      }
    },
    enabled: Boolean(myId) || Boolean(userId),
  });
};
