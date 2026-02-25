import { postsService } from "@/services/posts.service";
import { useQuery } from "@tanstack/react-query";

export const usePost = (activeTab: string, userId?: string) => {
  return useQuery({
    queryKey: ["posts", activeTab, userId],
    queryFn: () => {
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
    enabled: activeTab !== "my posts" || !!userId,
  });
};
