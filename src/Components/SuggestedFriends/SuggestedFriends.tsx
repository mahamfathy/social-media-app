import { useSuggestions } from "@/Utils/custom-hooks/useSuggestions/useSuggestions";
import { Search } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { Link } from "react-router-dom";
import SuggestedUserCard from "../SuggestedUserCard/SuggestedUserCard";
import SuggestedUserSkeleton from "../SuggestedUserSkeleton/SuggestedUserSkeleton";

const SuggestedFriends = () => {
  const [isHide, setIsHide] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);

  const { data, isLoading } = useSuggestions(20, deferredSearch);

  const allSuggestions =
    data?.pages.flatMap(
      (page) => page?.data?.suggestions || page?.data?.users || [],
    ) || [];

  const displayedInFeed = allSuggestions.slice(0, 5);

  return (
    <div className="space-y-3 xl:hidden">
      <button
        onClick={() => setIsHide(!isHide)}
        type="button"
        className="inline-flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm active:scale-[0.98] transition-transform"
      >
        <span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
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
            className="lucide lucide-users text-[#1877f2]"
            aria-hidden="true"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <path d="M16 3.128a4 4 0 0 1 0 7.744" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <circle cx={9} cy={7} r={4} />
          </svg>
          Suggested Friends
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            {isLoading ? "..." : displayedInFeed.length}
          </span>
          <span className="text-xs font-bold text-[#1877f2]">
            {isHide ? "Show" : "Hide"}
          </span>
        </span>
      </button>

      {!isHide && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm animate-in slide-in-from-top-2 duration-200">
          <div className="relative mb-3">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search people..."
              className="w-full rounded-lg border border-slate-100 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#1877f2] focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-2">
            {isLoading ? (
              <>
                <SuggestedUserSkeleton />
                <SuggestedUserSkeleton />
                <SuggestedUserSkeleton />
              </>
            ) : displayedInFeed.length > 0 ? (
              displayedInFeed.map((user) => (
                <SuggestedUserCard key={user._id} user={user} />
              ))
            ) : (
              <p className="text-center text-xs text-slate-400 py-6 font-medium">
                No results found for "{searchQuery}"
              </p>
            )}
          </div>

          {!isLoading && (
            <Link
              to="/suggestions"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-[#1877f2] transition-colors"
            >
              View more people
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestedFriends;
