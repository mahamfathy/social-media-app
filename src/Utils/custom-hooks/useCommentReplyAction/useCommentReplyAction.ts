import { CommentService } from "@/services/Comment.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCommentReplyActions = (postId: string) => {
  const queryClient = useQueryClient();
  const invalidateAll = (commentId?: string) => {
    queryClient.invalidateQueries({ queryKey: ["postComments", postId] });

    if (commentId) {
      queryClient.invalidateQueries({ queryKey: ["replies", commentId] });
    } else {
      queryClient.invalidateQueries({ queryKey: ["replies"] });
    }
  };

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) =>
      CommentService.deleteComment(postId, commentId),
    onSuccess: () => {
      invalidateAll();
      toast.success("Comment deleted");
    },
    onError: () => toast.error("Failed to delete comment"),
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => {
      const formData = new FormData();
      formData.append("content", content);
      return CommentService.updateComment(postId, commentId, formData);
    },
    onSuccess: () => {
      invalidateAll();
      toast.success("Comment updated");
    },
    onError: () => toast.error("Failed to update comment"),
  });

  const deleteReplyMutation = useMutation({
    mutationFn: (replyId: string) =>
      CommentService.deleteComment(postId, replyId),
    onSuccess: () => {
      invalidateAll();
      toast.success("Reply deleted");
    },
    onError: () => toast.error("Failed to delete reply"),
  });

  const updateReplyMutation = useMutation({
    mutationFn: ({
      replyId,
      content,
    }: {
      replyId: string;
      content: string;
    }) => {
      const formData = new FormData();
      formData.append("content", content);
      return CommentService.updateComment(postId, replyId, formData);
    },
    onSuccess: () => {
      invalidateAll();
      toast.success("Reply updated");
    },
    onError: () => toast.error("Failed to update reply"),
  });

  const { mutate: toggleLike, isPending: isLiking } = useMutation({
    mutationFn: (id: string) => CommentService.likeUnlikeComment(postId, id),
    onSuccess: () => {
      invalidateAll();
    },
    onError: () => toast.error("Action failed"),
  });
  return {
    handleDeleteComment: deleteCommentMutation.mutate,
    isDeletingComment: deleteCommentMutation.isPending,
    handleUpdateComment: updateCommentMutation.mutate,
    isUpdatingComment: updateCommentMutation.isPending,

    handleDeleteReply: deleteReplyMutation.mutate,
    isDeletingReply: deleteReplyMutation.isPending,
    handleUpdateReply: updateReplyMutation.mutate,
    isUpdatingReply: updateReplyMutation.isPending,
    handleToggleLike: toggleLike,
    isLiking,
  };
};

export default useCommentReplyActions;
