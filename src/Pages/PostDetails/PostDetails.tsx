import SinglePost from "@/Components/SinglePost/SinglePost";
import { PostService } from "@/services/Post.service";
import { usePost } from "@/Utils/custom-hooks/usePost/usePost";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = usePost(
    ["posts", id],
    () => PostService.getSinglePost(id as string),
    Boolean(id),
  );
  const post = data?.data?.post;
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (isError || !post) {
    return <NotFound />;
  }

  return (
    <div className="mx-auto mt-5 max-w-3xl space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
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
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back
      </button>

      <SinglePost post={post} activeTab="details" />
    </div>
  );
};

export default PostDetails;
