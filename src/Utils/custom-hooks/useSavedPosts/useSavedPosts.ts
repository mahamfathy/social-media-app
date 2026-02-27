import { postsService } from "@/services/posts.service";
import { useQuery } from "@tanstack/react-query";

export const useSavedPosts = (enabled: boolean) => {
  return useQuery({
    queryKey: ["savedPosts"],
    queryFn: () => {
      return postsService.getSavedPosts();
    },
    enabled: enabled,
  });
};
