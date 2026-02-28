const SuggestedUserSkeleton = () => {
  return (
    <article className="rounded-xl border border-slate-200 p-3 bg-white animate-pulse">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-slate-200" />

          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="h-2 w-16 rounded bg-slate-100" />
          </div>
        </div>

        <div className="h-7 w-16 rounded-full bg-slate-100" />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="h-4 w-20 rounded-full bg-slate-100" />
        <div className="h-4 w-16 rounded-full bg-slate-50" />
      </div>
    </article>
  );
};
export default SuggestedUserSkeleton;
