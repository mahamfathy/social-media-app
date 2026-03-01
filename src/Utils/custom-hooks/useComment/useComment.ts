import { CommentService } from "@/services/comment.service";
import type {
  Comment,
  IComment,
} from "@/Utils/interfaces/comment/comment.interface";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useComment = (postId: string, enabled: boolean = false) => {
  const queryClient = useQueryClient();
  const queryKey = ["postComments", postId];

  const [commentText, setCommentText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);

  const { data: commentsData, ...queryProps } = useInfiniteQuery<IComment>({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      CommentService.getPostComments(postId, pageParam as number, 5),
    enabled: enabled && !!postId,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta?.pagination) return undefined;
      const { currentPage, numberOfPages } = lastPage.meta.pagination;
      return currentPage < numberOfPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const { mutate: addComment, isPending: isAddingComment } = useMutation({
    mutationFn: (formData: FormData) =>
      CommentService.addComment(postId, formData),
    onSuccess: () => {
      setCommentText("");
      setSelectedImage(null);
      queryClient.invalidateQueries({ queryKey });
      toast.success("Comment added!");
    },
  });

  const { mutate: updateComment, isPending: isUpdatingComment } = useMutation({
    mutationFn: ({
      commentId,
      formData,
    }: {
      commentId: string;
      formData: FormData;
    }) => CommentService.updateComment(postId, commentId, formData),
    onSuccess: () => {
      setEditingCommentId(null);
      setEditImage(null);
      queryClient.invalidateQueries({ queryKey });
      toast.success("Comment updated!");
    },
  });

  const { mutate: deleteComment, isPending: isDeletingComment } = useMutation({
    mutationFn: (commentId: string) =>
      CommentService.deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Comment deleted");
    },
  });
  const handleAddComment = () => {
    if (!commentText.trim() && !selectedImage) return;
    const formData = new FormData();
    formData.append("content", commentText);
    if (selectedImage) formData.append("image", selectedImage);
    addComment(formData);
  };

  const handleUpdateComment = (commentId: string, content: string) => {
    const formData = new FormData();
    formData.append("content", content);
    if (editImage) formData.append("image", editImage);

    updateComment({ commentId, formData });
  };

  const allComments: Comment[] =
    commentsData?.pages
      .flatMap((page) => page.data?.comments)
      .filter((comment): comment is Comment => !!comment) || [];
  const { mutate: toggleLikeComment } = useMutation({
    mutationFn: (commentId: string) =>
      CommentService.likeUnlikeComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    commentText,
    setCommentText,
    selectedImage,
    setSelectedImage,
    handleAddComment,
    isAddingComment,
    toggleLikeComment,
    editingCommentId,
    setEditingCommentId,
    editContent,
    setEditContent,
    editImage,
    setEditImage,
    handleUpdateComment,
    isUpdatingComment,

    allComments,
    handleDeleteComment: (id: string) => deleteComment(id),
    isDeletingComment,
    ...queryProps,
    handleLikeComment: (commentId: string) => toggleLikeComment(commentId),
    ...queryProps,
  };
};
