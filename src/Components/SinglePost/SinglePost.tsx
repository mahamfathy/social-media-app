import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import usePostActions from "@/Utils/custom-hooks/usePostActions/usePostActions";
import type { Post } from "@/Utils/interfaces/post/post.interface";
import { Loader2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DropdownPost from "../DropdownPost/DropdownPost";

const SinglePost = ({ post, activeTab }: { post: Post; activeTab: string }) => {
  const { userData } = useAuth();
  const [localIsSaved, setLocalIsSaved] = useState(
    !!userData?.data?.user?.bookmarks?.includes(post._id),
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(post.body || "");
  const [localLikes, setLocalLikes] = useState<number>(
    Number(post.likesCount) || 0,
  );
  const [localIsLiked, setLocalIsLiked] = useState(
    !!post.likes?.includes(userData?.data?.user?._id || ""),
  );

  const { handleUpdate, isUpdating, handleLike } = usePostActions(
    post._id,
    activeTab,
  );

  const handleSaveEdit = async () => {
    const trimmedValue = editValue?.trim() || "";
    if (trimmedValue === post.body) {
      setIsEditing(false);
      return;
    }

    handleUpdate(
      {
        body: trimmedValue,
        privacy: post.privacy as "public" | "following" | "only_me",
        image: post.image,
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  };

  const onLikeClick = () => {
    const newLikedStatus = !localIsLiked;

    setLocalIsLiked(newLikedStatus);
    setLocalLikes((prev) => {
      const current = Number(prev) || 0;
      return newLikedStatus ? current + 1 : current - 1;
    });

    handleLike(undefined, {
      onSuccess: (data) => {
        const serverLikes = data?.likesCount ?? data?.data?.likesCount;

        if (serverLikes !== undefined) {
          setLocalLikes(Number(serverLikes));
        }
      },
      onError: () => {
        setLocalIsLiked(!newLikedStatus);
        setLocalLikes((prev) => (newLikedStatus ? prev - 1 : prev + 1));
      },
    });
  };
  return (
    <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="p-4">
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
              className="block truncate text-sm font-bold text-slate-900 hover:underline"
              to={`/profile/${post.user._id}`}
            >
              {post.user.name}
            </Link>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>{post.createdAt}</span>
              <span className="mx-0.5">·</span>
              <div className="flex items-center gap-1">
                <span className="capitalize">{post.privacy}</span>
              </div>
            </div>
          </div>

          <DropdownPost
            post={post}
            localIsSaved={localIsSaved}
            setLocalIsSaved={setLocalIsSaved}
            activeTab={activeTab}
            onEdit={() => setIsEditing(true)}
          />
        </div>
        <div className="mt-3">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full min-h-25 rounded-lg border border-blue-200 bg-blue-50/30 p-3 text-sm focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none transition"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditValue(post.body || "");
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isUpdating}
                  className="bg-[#1877f2] text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-[#166fe5] disabled:opacity-50 flex items-center gap-1"
                >
                  {isUpdating && <Loader2 size={12} className="animate-spin" />}
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
              {post.body}
            </p>
          )}
        </div>
      </div>

      {post.image && (
        <div className="max-h-155 overflow-hidden border-y border-slate-200 bg-slate-50">
          <img
            alt="post content"
            className="mx-auto max-h-125 w-auto object-contain"
            src={post.image}
          />
        </div>
      )}
      {localIsSaved && (
        <div className="m-4 inline-flex items-center gap-1 rounded-full bg-[#e7f3ff] px-2.5 py-1 text-[11px] font-bold text-[#1877f2]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-bookmark"
          >
            <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"></path>
          </svg>
          Saved
        </div>
      )}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between text-xs text-slate-500 sm:text-sm">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
              <ThumbsUp size={10} fill="white" />
            </span>
            <span className="font-medium">{localLikes} likes</span>
          </div>
          <div className="text-slate-500">
            {post.commentsCount} comments · {post.sharesCount} shares
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 border-t border-slate-100 pt-1">
          <button
            onClick={onLikeClick}
            className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors sm:gap-2 sm:text-sm 
              ${localIsLiked ? "bg-[#e7f3ff] text-[#1877f2]" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <ThumbsUp size={18} fill={localIsLiked ? "currentColor" : "none"} />
            <span>Like</span>
          </button>

          <button className="flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Comment
          </button>

          <button className="flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Share
          </button>
        </div>
      </div>
    </article>
  );
};

export default SinglePost;
