import type { SuggestedUser } from "@/Utils/interfaces/post/suggested-user.interface";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const SuggestedUserCard = ({ user }: { user: SuggestedUser }) => {
  return (
    <article className="rounded-xl border border-slate-200 p-3 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center justify-between gap-3">
        <Link
          to={`/profile/${user._id}`}
          className="flex min-w-0 items-center gap-3"
        >
          <img
            alt={user.name}
            className="h-12 w-12 rounded-full object-cover border border-slate-50"
            src={
              user.photo ||
              "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
            }
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 hover:underline cursor-pointer">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-500">SocialHub user</p>
          </div>
        </Link>
        <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff] active:scale-95">
          <UserPlus size={13} />
          Follow
        </button>
      </div>

      <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
        <span className="rounded-full bg-slate-100 px-2 py-0.5">
          {user.followersCount} followers
        </span>
        {user.mutualFollowersCount > 0 && (
          <span className="rounded-full bg-[#edf4ff] px-2 py-0.5 text-[#1877f2]">
            {user.mutualFollowersCount} mutual
          </span>
        )}
      </div>
    </article>
  );
};

export default SuggestedUserCard;
