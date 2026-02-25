const PostSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white shadow-sm p-4">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/4 rounded bg-slate-200" />
          <div className="h-2 w-1/6 rounded bg-slate-200" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-2/3 rounded bg-slate-200" />
      </div>

      <div className="mt-4 h-60 w-full rounded-lg bg-slate-100" />

      <div className="mt-4 flex justify-between border-t border-slate-100 pt-3">
        <div className="h-4 w-16 rounded bg-slate-100" />
        <div className="h-4 w-16 rounded bg-slate-100" />
        <div className="h-4 w-16 rounded bg-slate-100" />
      </div>
    </div>
  );
};

export default PostSkeleton;
