import { PostService } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";

export const useSavedPosts = (enabled: boolean) => {
  return useQuery({
    queryKey: ["savedPosts"],
    queryFn: () => {
      return PostService.getSavedPosts();
    },
    enabled: enabled,
  });
};
