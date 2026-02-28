import { useSuggestions } from "@/Utils/custom-hooks/useSuggestions/useSuggestions";
import { Search, UserPlus, Users } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { Link } from "react-router-dom";
import SuggestedUserSkeleton from "../SuggestedUserSkeleton/SuggestedUserSkeleton";

const SuggestedFriendsSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const { data, isLoading } = useSuggestions(20, deferredSearch);

  const suggestions =
    data?.pages.flatMap(
      (page) => page?.data?.suggestions || page?.data?.users || [],
    ) || [];

  const displayedInSidebar = suggestions.slice(0, 5);

  return (
    <aside className="hidden h-fit xl:sticky xl:top-21 xl:block w-full">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-[#1877f2]" />
            <h3 className="text-base font-extrabold text-slate-900">
              Suggested Friends
            </h3>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            {isLoading ? "..." : displayedInSidebar.length}
          </span>
        </div>

        <div className="mb-3 relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search friends..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-10 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white transition-all"
          />
        </div>

        <div className="space-y-3 max-h-100 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
          {isLoading ? (
            <>
              <SuggestedUserSkeleton />
              <SuggestedUserSkeleton />
              <SuggestedUserSkeleton />
              <SuggestedUserSkeleton />
            </>
          ) : displayedInSidebar.length > 0 ? (
            displayedInSidebar.map((user) => (
              <div
                key={user._id}
                className="rounded-xl border border-slate-100 p-2.5 hover:border-slate-200 transition-colors bg-white"
              >
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to={`/profile/${user._id}`}
                    className="flex min-w-0 items-center gap-2 rounded-lg text-left transition"
                  >
                    <img
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover border border-slate-50"
                      src={
                        user.photo ||
                        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                      }
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                        {user.name}
                      </p>
                      <p className="truncate text-[11px] text-slate-500">
                        SocialHub user
                      </p>
                    </div>
                  </Link>
                  <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition bg-[#e7f3ff] text-[#1877f2] hover:bg-[#1877f2] hover:text-white">
                    <UserPlus size={13} />
                    Follow
                  </button>
                </div>

                <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold text-slate-500">
                  <span className="rounded-full bg-slate-50 px-2 py-0.5 border border-slate-100">
                    {user.followersCount || 0} followers
                  </span>
                  {user.mutualFollowersCount > 0 && (
                    <span className="rounded-full bg-[#edf4ff] px-2 py-0.5 text-[#1877f2]">
                      {user.mutualFollowersCount} mutual
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-500 text-sm font-medium">
              No friends found
            </div>
          )}
        </div>

        {!isLoading && (
          <Link
            to="/suggestions"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            View more
          </Link>
        )}
      </div>
    </aside>
  );
};

export default SuggestedFriendsSidebar;
