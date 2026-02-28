import SinglePost from "@/Components/SinglePost/SinglePost";
import { PostService } from "@/services/Post.service";
import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import { usePost } from "@/Utils/custom-hooks/usePost/usePost";
import { useProfile } from "@/Utils/custom-hooks/useProfile/useProfile";
import { useSavedPosts } from "@/Utils/custom-hooks/useSavedPosts/useSavedPosts";
import type { Post } from "@/Utils/interfaces/post/post.interface";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { userData: myProfile } = useAuth();
  const { data: profileData } = useProfile(id || "");
  const [activeTab, setActiveTab] = useState("my posts");

  const currentUser = id ? profileData?.data?.user : myProfile?.data?.user;

  const { data: postsData, isLoading: postsLoading } = usePost(
    ["posts", id ? "user-profile" : "me", id],
    id ? () => PostService.getUserPosts(id) : () => PostService.getFeed("me"),
    Boolean(currentUser),
  );

  const { data: savedData, isLoading: savedLoading } = useSavedPosts(!id);
  const navigate = useNavigate();
  const currentPosts =
    activeTab === "my posts"
      ? postsData?.data?.posts || []
      : savedData?.data?.bookmarks || [];

  const currentLoading = activeTab === "my posts" ? postsLoading : savedLoading;
  return (
    <div className="space-y-4 ">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center mt-4 ms-4 mb-0 gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-left"
          aria-hidden="true"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back
      </button>
      <div className="mx-auto max-w-7xl px-3 py-3.5 space-y-5 sm:space-y-6">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">
          <div
            className="group/cover relative h-44 sm:h-52 lg:h-60 overflow-hidden"
            style={{
              backgroundImage: currentUser?.cover
                ? `linear-gradient(rgba(15, 23, 42, 0.22), rgba(15, 23, 42, 0.4)), url("${currentUser.cover}")`
                : "linear-gradient(112deg, #0f172a 0%, #1e3a5f 36%, #2b5178 72%, #5f8fb8 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(186,230,253,.22)_0%,rgba(186,230,253,0)_44%)]" />

            {!currentUser?.cover && (
              <>
                <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/8 blur-3xl" />
                <div className="absolute right-8 top-6 h-48 w-48 rounded-full bg-[#c7e6ff]/10 blur-3xl" />
              </>
            )}

            <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/25 to-transparent" />

            {!id && (
              <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100">
                {currentUser?.cover && (
                  <button
                    type="button"
                    className="pointer-events-auto inline-flex items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 15 6 6" />
                      <path d="m15 9 6-6" />
                      <path d="M21 16v5h-5" />
                      <path d="M21 8V3h-5" />
                      <path d="M3 16v5h5" />
                      <path d="m3 21 6-6" />
                      <path d="M3 8V3h5" />
                      <path d="M9 9 3 3" />
                    </svg>
                    View cover
                  </button>
                )}

                <label className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                  {currentUser?.cover ? "Change cover" : "Add cover"}
                  <input accept="image/*" className="hidden" type="file" />
                </label>

                {currentUser?.cover && (
                  <button
                    type="button"
                    className="pointer-events-auto inline-flex items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
            <div className="rounded-3xl border border-white/60 bg-white/92 p-5 backdrop-blur-xl sm:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-end gap-4">
                    <div className="group/avatar relative shrink-0">
                      <button
                        type="button"
                        className="cursor-zoom-in rounded-full"
                      >
                        <img
                          alt={currentUser?.name}
                          className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                          src={currentUser?.photo}
                        />
                      </button>
                      <button
                        type="button"
                        className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m15 15 6 6" />
                          <path d="m15 9 6-6" />
                          <path d="M21 16v5h-5" />
                          <path d="M21 8V3h-5" />
                          <path d="M3 16v5h5" />
                          <path d="m3 21 6-6" />
                          <path d="M3 8V3h5" />
                          <path d="M9 9 3 3" />
                        </svg>
                      </button>
                      <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={17}
                          height={17}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
                          <circle cx={12} cy={13} r={3} />
                        </svg>
                        <input
                          accept="image/*"
                          className="hidden"
                          type="file"
                        />
                      </label>
                    </div>
                    <div className="min-w-0 pb-1">
                      <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
                        {currentUser?.name}
                      </h2>
                      <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                        @{currentUser?.username || "user" + currentUser?._id}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={13}
                          height={13}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <circle cx={9} cy={7} r={4} />
                        </svg>
                        SocialHub member
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid w-full grid-cols-3 gap-2 lg:w-130">
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                      Followers
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                      {currentUser?.followersCount || 0}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                      Following
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                      {currentUser?.followingCount || 0}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                      Bookmarks
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                      {!id
                        ? savedData?.meta?.pagination?.total || 0
                        : currentUser?.bookmarksCount || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-extrabold text-slate-800">
                    About
                  </h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={15}
                        height={15}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-500"
                      >
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                        <rect x={2} y={4} width={20} height={16} rx={2} />
                      </svg>
                      {currentUser?.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={15}
                        height={15}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-500"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <circle cx={9} cy={7} r={4} />
                      </svg>
                      Active on SocialHub Posts
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                      posts
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900">
                      {postsData?.meta?.pagination?.total || 0}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                      Saved posts
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900">
                      {!id
                        ? savedData?.meta?.pagination?.total || 0
                        : currentUser?.bookmarksCount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5 sm:inline-flex sm:w-auto sm:gap-0">
              <button
                onClick={() => setActiveTab("my posts")}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                  activeTab === "my posts"
                    ? "bg-white text-[#1877f2] shadow-sm"
                    : "text-slate-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
                Posts
              </button>
              {!id && (
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                    activeTab === "saved"
                      ? "bg-white text-[#1877f2] shadow-sm"
                      : "text-slate-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    height={15}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
                  </svg>
                  Saved
                </button>
              )}
            </div>
            <span className="rounded-full bg-[#e7f3ff] px-3 py-1 text-xs font-bold text-[#1877f2]">
              {activeTab === "my posts"
                ? postsData?.meta?.pagination?.total || 0
                : savedData?.meta?.pagination?.total || 0}
            </span>
          </div>

          <div className="space-y-3">
            {currentLoading ? (
              <div className="p-10 text-center text-slate-500">
                Loading posts...
              </div>
            ) : currentPosts.length > 0 ? (
              currentPosts.map((post: Post) => (
                <SinglePost key={post._id} post={post} activeTab={""} />
              ))
            ) : (
              <div className="p-10 text-center bg-white rounded-2xl border border-dashed text-slate-400">
                No posts to show yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
