import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import { useComment } from "@/Utils/custom-hooks/useComment/useComment";
import usePostActions from "@/Utils/custom-hooks/usePostActions/usePostActions";
import type { Post } from "@/Utils/interfaces/post/post.interface";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronDown,
  Earth,
  Image as ImageIcon,
  Loader2,
  MessageCircle,
  Repeat2,
  SendHorizontal,
  Share2,
  Smile,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommentCard from "../CommentCard/CommentCard";
import DropdownPost from "../DropdownPost/DropdownPost";
import Emojis from "../Emojis/Emojis";

const SinglePost = ({ post }: { post: Post }) => {
  const { userData } = useAuth();
  const [localIsSaved, setLocalIsSaved] = useState(
    !!userData?.data?.user?.bookmarks?.includes(post._id),
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(post.body || "");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [localLikes, setLocalLikes] = useState<number>(
    Number(post.likesCount) || 0,
  );
  const [localIsLiked, setLocalIsLiked] = useState(
    !!post.likes?.includes(userData?.data?.user?._id || ""),
  );
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();
  const { isUpdating, handleLike, handleUpdate } = usePostActions(post._id);
  const {
    commentText,
    setCommentText,
    selectedImage,
    setSelectedImage,
    handleAddComment,
    isAddingComment,
    allComments,
    isLoading: isLoadingComments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useComment(post._id, showComments);
  const onEmojiClick = (emojiData: { emoji: string }) => {
    setCommentText((prev) => prev + emojiData.emoji);
  };
  const onSaveEdit = () => {
    if (editValue.trim() === post.body) {
      setIsEditing(false);
      return;
    }
    handleUpdate(
      {
        body: editValue,
        privacy: post.privacy as "public" | "following" | "only_me",
        image: post.image,
      },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const onLikeClick = () => {
    const newLikedStatus = !localIsLiked;
    setLocalIsLiked(newLikedStatus);
    setLocalLikes((prev) => (newLikedStatus ? prev + 1 : prev - 1));
    handleLike(undefined, {
      onSuccess: (data) => {
        const serverLikes = data?.likesCount ?? data?.data?.likesCount;
        if (serverLikes !== undefined) setLocalLikes(Number(serverLikes));
      },
      onError: () => {
        setLocalIsLiked(!newLikedStatus);
        setLocalLikes((prev) => (newLikedStatus ? prev - 1 : prev + 1));
      },
    });
  };

  return (
    <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="p-4 pb-0">
        <div className="flex items-center gap-3">
          <Link className="shrink-0" to={`/profile/${post.user._id}`}>
            <img
              alt={post.user.name}
              className="h-11 w-11 rounded-full object-cover"
              src={
                post.user.photo ||
                "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
              }
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link
              className="truncate text-sm font-bold text-slate-900 hover:underline"
              to={`/profile/${post.user._id}`}
            >
              {post.user.name}
            </Link>
            <div className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
              <span>
                {post.createdAt
                  ? formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: false,
                    })
                  : "just now"}
              </span>
              <span className="mx-1">·</span>
              <button className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-slate-100 capitalize">
                <Earth size={11} /> {post.privacy} <ChevronDown size={12} />
              </button>
            </div>
          </div>
          <DropdownPost
            id={post._id}
            type="post"
            ownerId={post.user._id}
            localIsSaved={localIsSaved}
            setLocalIsSaved={setLocalIsSaved}
            onEdit={() => setIsEditing(true)}
          />
        </div>

        <div className="mt-3 text-sm leading-relaxed text-slate-800">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full min-h-25 rounded-lg border border-blue-200 bg-blue-50/30 p-3 outline-none focus:border-[#1877f2]"
                autoFocus
              />
              <div className="flex justify-end gap-2 pb-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-xs font-bold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  onClick={onSaveEdit}
                  disabled={isUpdating}
                  className="bg-[#1877f2] text-white px-4 py-1 rounded-md text-xs font-bold flex items-center gap-2"
                >
                  {isUpdating && <Loader2 size={12} className="animate-spin" />}{" "}
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{post.body}</p>
          )}
        </div>
      </div>

      {post.image && (
        <div className="mt-3 border-y border-slate-100 bg-slate-50">
          <img
            alt="post content"
            className="mx-auto max-h-125 w-full object-contain"
            src={post.image}
          />
        </div>
      )}

      <div className="px-4 py-3 text-sm text-slate-500">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
              <ThumbsUp size={10} fill="white" />
            </span>
            <button className="font-semibold hover:text-[#1877f2] hover:underline">
              {localLikes} likes
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <Repeat2 size={14} /> {post.sharesCount || 0} shares
            </span>
            <span>{post.commentsCount || 0} comments</span>
            <button
              onClick={() => navigate(`/posts/${post._id}`)}
              className="font-bold text-[#1877f2] hover:bg-[#e7f3ff] px-2 py-1 rounded-md transition"
            >
              View details
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 p-1">
          <button
            onClick={onLikeClick}
            className={`flex items-center justify-center gap-2 rounded-md p-2 font-semibold transition ${localIsLiked ? "bg-[#e7f3ff] text-[#1877f2]" : "hover:bg-slate-100"}`}
          >
            <ThumbsUp size={18} fill={localIsLiked ? "currentColor" : "none"} />{" "}
            <span>Like</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center justify-center gap-2 rounded-md p-2 font-semibold hover:bg-slate-100"
          >
            <MessageCircle size={18} /> <span>Comment</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-md p-2 font-semibold hover:bg-slate-100">
            <Share2 size={18} /> <span>Share</span>
          </button>
        </div>
      </div>
      {!showComments && post.topComment && (
        <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Top Comment
          </p>
          <div className="flex items-start gap-2">
            <img
              alt={post.topComment?.commentCreator?.name}
              className="h-8 w-8 rounded-full object-cover"
              src={
                post.topComment?.commentCreator?.photo ||
                "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
              }
            />
            <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
              <p className="truncate text-xs font-bold text-slate-900">
                {post.topComment?.commentCreator?.name || "Anonymous"}
              </p>
              <p className="truncate text-xs font-light text-slate-700">
                @{post.topComment?.commentCreator?.username || "Anonymous"}
              </p>
              <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                {post.topComment?.content || "No comment content available"}
              </p>
              {post.topComment?.image && (
                <img
                  alt={post.topComment?.content}
                  className="mt-2 max-h-44 w-full rounded-lg object-cover"
                  src={post?.topComment?.image}
                />
              )}
            </div>
          </div>
          <button
            onClick={() => setShowComments(!showComments)}
            className="mt-2 text-xs font-bold text-[#1877f2] hover:underline"
          >
            View all comments
          </button>
        </div>
      )}
      {showComments && (
        <div className="border-t border-slate-200 bg-[#f7f8fa] px-4 py-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-extrabold tracking-wide text-slate-700">
                Comments
              </p>
              <span className="rounded-full bg-[#e7f3ff] px-2 py-0.5 text-[11px] font-bold text-[#1877f2]">
                {post.commentsCount}
              </span>
            </div>
            <select className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#1877f2]/20">
              <option value="relevant">Most relevant</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="space-y-4">
            {isLoadingComments ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="animate-spin text-[#1877f2]" size={30} />
              </div>
            ) : allComments.length > 0 ? (
              allComments.map((comment) => (
                <CommentCard
                  postId={post._id}
                  key={comment._id}
                  comment={comment}
                  userData={userData}
                />
              ))
            ) : (
              <p className="py-4 text-center text-sm text-slate-500">
                No comments yet.
              </p>
            )}

            {hasNextPage && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60 flex items-center gap-2 mx-auto"
                >
                  {isFetchingNextPage && (
                    <Loader2 size={14} className="animate-spin" />
                  )}
                  View more comments
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-start gap-2">
            <img
              alt="Me"
              className="h-9 w-9 rounded-full object-cover"
              src={userData?.data?.user?.photo || "default-path.png"}
            />

            <div className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:bg-white focus-within:border-[#c7dafc]">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={`Comment as ${userData?.data?.user?.name}...`}
                rows={1}
                className="w-full min-h-10 resize-none bg-transparent px-2 py-1.5 text-sm outline-none"
              />

              {selectedImage && (
                <div className="relative mt-2 inline-block">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    className="h-20 w-20 rounded-lg object-cover border"
                    alt="preview"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <Loader2 size={10} className="rotate-45" />{" "}
                  </button>
                </div>
              )}

              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <label className="p-2 text-slate-500 hover:bg-slate-200 rounded-full cursor-pointer">
                    <ImageIcon size={16} />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0])
                          setSelectedImage(e.target.files[0]);
                      }}
                    />
                  </label>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowEmoji(!showEmoji)}
                      className={`p-2 rounded-full transition ${
                        showEmoji
                          ? "bg-blue-100 text-[#1877f2]"
                          : "text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <Smile size={16} />
                    </button>

                    {showEmoji && (
                      <Emojis
                        setShowEmoji={setShowEmoji}
                        onEmojiClick={onEmojiClick}
                      />
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAddComment}
                  disabled={
                    isAddingComment || (!commentText.trim() && !selectedImage)
                  }
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-[#1877f2] text-white disabled:opacity-50"
                >
                  {isAddingComment ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <SendHorizontal size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default SinglePost;
