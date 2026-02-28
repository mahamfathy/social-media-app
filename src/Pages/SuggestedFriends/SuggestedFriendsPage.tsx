import SuggestedUserCard from "@/Components/SuggestedUserCard/SuggestedUserCard";
import SuggestedUserSkeleton from "@/Components/SuggestedUserSkeleton/SuggestedUserSkeleton";
import { useSuggestions } from "@/Utils/custom-hooks/useSuggestions/useSuggestions";
import type { SuggestedUser } from "@/Utils/interfaces/post/suggested-user.interface"; // سيبيها زي ما هي
import { ArrowLeft, Loader2, Search } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuggestedFriendsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuggestions(20, deferredSearch);

  const allSuggestions: SuggestedUser[] =
    data?.pages.flatMap(
      (page) => page?.data?.suggestions || page?.data?.users || [],
    ) || [];

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2"></div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            {allSuggestions.length}
          </span>
        </div>

        <label className="relative mb-4 block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SuggestedUserSkeleton key={i} />
            ))
          ) : allSuggestions.length > 0 ? (
            allSuggestions.map((user: SuggestedUser) => (
              <SuggestedUserCard key={user._id} user={user} />
            ))
          ) : (
            <p className="col-span-full py-10 text-center text-slate-500 font-bold">
              No users found.
            </p>
          )}

          {isFetchingNextPage && (
            <>
              <SuggestedUserSkeleton />
              <SuggestedUserSkeleton />
            </>
          )}
        </div>

        {hasNextPage && !isLoading && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Loading...
              </>
            ) : (
              "Load more users"
            )}
          </button>
        )}
      </section>
    </div>
  );
};

export default SuggestedFriendsPage;
