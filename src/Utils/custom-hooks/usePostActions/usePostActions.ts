import { PostService } from "@/services/Post.service";
import type { PostSchema } from "@/Utils/schemas/Post/Post.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const usePostActions = (postId: string) => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => PostService.toggleLike(postId),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post like updated");
    },
  });

  const saveMutation = useMutation({
    mutationFn: () => PostService.toggleBookmark(postId),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Bookmark updated");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => PostService.deletePost(postId),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (newContent: PostSchema) =>
      PostService.updatePost(postId, newContent),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated");
    },
  });

  return {
    handleLike: likeMutation.mutate,
    handleSave: saveMutation.mutate,
    handleDelete: deleteMutation.mutate,
    handleUpdate: updateMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isUpdating: updateMutation.isPending,
    isSaving: saveMutation.isPending,
  };
};

export default usePostActions;
