import AddPost from "@/Components/AddPost/AddPost";
import PostSkeleton from "@/Components/PostSkeleton/PostSkeleton";
import SinglePost from "@/Components/SinglePost/SinglePost";
import SuggestedFriends from "@/Components/SuggestedFriends/SuggestedFriends";
import SuggestedFriendsSidebar from "@/Components/SuggestedFriendsSidebar/SuggestedFriendsSidebar";
import { PostService } from "@/services/Post.service";
import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import { usePost } from "@/Utils/custom-hooks/usePost/usePost";
import type { Post } from "@/Utils/interfaces/post/post.interface";
import { useState } from "react";

type PostTab = "feed" | "community" | "saved" | "my posts";

const Feed = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState<PostTab>("feed");

  const myId = userData?.data?.user?._id;
  const getFetchFn = () => {
    switch (activeTab) {
      case "community":
        return () => PostService.getFeed("all");
      case "my posts":
        return () => PostService.getFeed("me");
      case "saved":
        return () => PostService.getSavedPosts();
      default:
        return () => PostService.getFeed("following");
    }
  };
  const { data, isLoading } = usePost(
    ["posts", activeTab],
    getFetchFn(),
    !!myId,
  );
  const posts =
    activeTab === "saved"
      ? [...(data?.data?.bookmarks || [])].reverse()
      : data?.data?.posts || [];
  const getTabClass = (tab: PostTab) =>
    `flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
      activeTab === tab
        ? "bg-[#e7f3ff] text-[#1877f2]"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <>
      <div className="mx-auto max-w-7xl px-3 py-3.5 grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
        <aside className="hidden h-fit space-y-3 xl:sticky xl:top-21 xl:block">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <button
              onClick={() => setActiveTab("feed")}
              className={getTabClass("feed")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                height={17}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="lucide lucide-newspaper"
              >
                <path d="M15 18h-5" />
                <path d="M18 14h-8" />
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                <rect width={8} height={4} x={10} y={6} rx={1} />
              </svg>
              Feed
            </button>

            <button
              onClick={() => setActiveTab("my posts")}
              className={getTabClass("my posts")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                height={17}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="lucide lucide-sparkles"
              >
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                <path d="M20 2v4" />
                <path d="M22 4h-4" />
                <circle cx={4} cy={20} r={2} />
              </svg>
              My Posts
            </button>

            <button
              onClick={() => setActiveTab("community")}
              className={getTabClass("community")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                height={17}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="lucide lucide-earth"
              >
                <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                <circle cx={12} cy={12} r={10} />
              </svg>
              Community
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={getTabClass("saved")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                height={17}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="lucide lucide-bookmark"
              >
                <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
              </svg>
              Saved
            </button>
          </div>
        </aside>

        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm xl:hidden">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab("feed")}
                className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                  activeTab === "feed"
                    ? "bg-[#e7f3ff] text-[#1877f2]"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M15 18h-5" />
                  <path d="M18 14h-8" />
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                  <rect width={8} height={4} x={10} y={6} rx={1} />
                </svg>
                Feed
              </button>
              <button
                onClick={() => setActiveTab("my posts")}
                className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                  activeTab === "my posts"
                    ? "bg-[#e7f3ff] text-[#1877f2]"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                  <path d="M20 2v4" />
                  <path d="M22 4h-4" />
                  <circle cx={4} cy={20} r={2} />
                </svg>
                My Posts
              </button>
              <button
                onClick={() => setActiveTab("community")}
                className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                  activeTab === "community"
                    ? "bg-[#e7f3ff] text-[#1877f2]"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                  <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                  <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                  <circle cx={12} cy={12} r={10} />
                </svg>
                Community
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                  activeTab === "saved"
                    ? "bg-[#e7f3ff] text-[#1877f2]"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
                </svg>
                Saved
              </button>
            </div>
          </div>
          <SuggestedFriends />
          <AddPost
            name={userData?.data?.user.name || null}
            photo={userData?.data?.user.photo || null}
          />

          <div className="space-y-4">
            {isLoading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : posts.length > 0 ? (
              posts.map((post: Post) => (
                <SinglePost key={post._id} post={post} activeTab={activeTab} />
              ))
            ) : (
              <div className="text-center py-10 text-slate-400">
                No posts found in this section.
              </div>
            )}

            {!isLoading && (
              <div className="flex min-h-10 items-center justify-center">
                <span className="text-xs font-semibold text-slate-400">
                  You reached the end
                </span>
              </div>
            )}
          </div>
        </section>

        <SuggestedFriendsSidebar />
      </div>
    </>
  );
};

export default Feed;
