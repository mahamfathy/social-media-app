import { CommentService } from "@/services/comment.service";
import type { IReply } from "@/Utils/interfaces/reply/reply.interface";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useReply = (postId: string, commentId?: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["replies", commentId];
  const {
    data: repliesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<IReply>({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      CommentService.getCommentReplies(
        postId,
        commentId!,
        pageParam as number,
        5,
      ),
    enabled: !!commentId && !!postId,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta?.pagination) return undefined;
      const { currentPage, numberOfPages } = lastPage.meta.pagination;
      return currentPage < numberOfPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const { mutate: handleAddReply, isPending: isAddingReply } = useMutation({
    mutationFn: ({
      commentId,
      formData,
    }: {
      commentId: string;
      formData: FormData;
    }) => CommentService.addReply(postId, commentId, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["replies", variables.commentId],
      });
      queryClient.invalidateQueries({ queryKey: ["postComments", postId] });
      toast.success("Reply added!");
    },
  });

  const { mutate: handleDeleteReply, isPending: isDeletingReply } = useMutation(
    {
      mutationFn: (replyId: string) =>
        CommentService.deleteComment(postId, replyId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        queryClient.invalidateQueries({ queryKey: ["postComments", postId] });
        toast.success("Reply deleted");
      },
    },
  );

  const { mutate: handleUpdateReply, isPending: isUpdatingReply } = useMutation(
    {
      mutationFn: ({
        replyId,
        formData,
      }: {
        replyId: string;
        formData: FormData;
      }) => CommentService.updateComment(postId, replyId, formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success("Reply updated");
      },
    },
  );
  const handleUpdateReplyAction = (replyId: string, content: string) => {
    const formData = new FormData();
    formData.append("content", content);
    handleUpdateReply({ replyId, formData });
  };

  const allReplies =
    repliesData?.pages.flatMap((page) => page.data?.replies).filter(Boolean) ||
    [];

  return {
    allReplies,
    handleAddReply,
    handleDeleteReply,
    handleUpdateReply,
    handleUpdateReplyAction,
    isAddingReply,
    isDeletingReply,
    isUpdatingReply,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

export default useReply;
