import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import type { Post } from "@/Utils/interfaces/post/post.interface";
import { Bookmark, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const SinglePost = ({ post }: { post: Post }) => {
  const { userData } = useAuth();
  const myPost = userData?.data?.user._id === post.user._id;
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={11}
                  height={11}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-earth"
                >
                  <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                  <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                  <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                  <circle cx={12} cy={12} r={10} />
                </svg>
                <span className="capitalize">{post.privacy}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 outline-none">
                <MoreHorizontal size={18} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-44 rounded-xl shadow-lg border-slate-200"
            >
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 font-semibold text-slate-700 cursor-pointer">
                <Bookmark size={15} />
                Save post
              </DropdownMenuItem>
              {myPost && (
                <>
                  <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 font-semibold text-slate-700 cursor-pointer">
                    <Pencil size={15} />
                    Edit post
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 font-semibold text-rose-600 cursor-pointer focus:text-rose-600 focus:bg-rose-50">
                    <Trash2 size={15} className="text-rose-600" />
                    Delete post
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {post.body}
          </p>
        </div>
      </div>

      {post.image && (
        <div className="max-h-155 overflow-hidden border-y border-slate-200 bg-slate-50">
          <button
            type="button"
            className="group relative block w-full cursor-zoom-in"
          >
            <img
              alt="post content"
              className="mx-auto max-h-125 w-auto object-contain"
              src={post.image}
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
          </button>
        </div>
      )}

      <div className="px-4 py-3">
        <div className="flex items-center justify-between text-xs text-slate-500 sm:text-sm">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </span>
            <span className="font-medium">{post.likesCount} likes</span>
          </div>
          <div className="flex gap-3">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-repeat2 lucide-repeat-2"
                aria-hidden="true"
              >
                <path d="m2 9 3-3 3 3"></path>
                <path d="M13 18H7a2 2 0 0 1-2-2V6"></path>
                <path d="m22 15-3 3-3-3"></path>
                <path d="M11 6h6a2 2 0 0 1 2 2v10"></path>
              </svg>
              {post.sharesCount} shares
            </span>
            <span>{post.commentsCount} comments</span>

            <button className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
              View details
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 border-t border-slate-100 pt-1">
          <button className="flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            Like
          </button>
          <button className="flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Comment
          </button>
          <button className="flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" x2="12" y1="2" y2="15" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </article>
  );
};

export default SinglePost;
