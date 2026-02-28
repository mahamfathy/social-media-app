import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import usePostActions from "@/Utils/custom-hooks/usePostActions/usePostActions";
import type { Post } from "@/Utils/interfaces/post/post.interface";
import {
  Bookmark,
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import DeletePostComment from "../DeletePostComment/DeletePostComment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface DropdownPostProps {
  post: Post;
  activeTab: string;
  onEdit: () => void;
  localIsSaved: boolean;
  setLocalIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownPost = ({
  post,
  onEdit,
  localIsSaved,
  setLocalIsSaved,
}: DropdownPostProps) => {
  const { userData } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { handleSave, handleDelete, isSaving, isDeleting } = usePostActions(
    post._id,
  );

  const myPost = userData?.data?.user?._id === post?.user?._id;

  const onSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = !localIsSaved;

    setLocalIsSaved(newStatus);

    handleSave(undefined, {
      onError: () => {
        setLocalIsSaved(!newStatus);
      },
    });
  };
  const confirmDelete = async () => {
    handleDelete();
    setShowDeleteModal(false);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            disabled={isDeleting}
            className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 outline-none disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <MoreHorizontal size={18} />
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-44 rounded-xl shadow-lg border-slate-200"
        >
          <DropdownMenuItem
            disabled={isSaving}
            onClick={onSaveClick}
            className="flex items-center gap-2 px-3 py-2 font-semibold text-slate-700 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 size={15} className="animate-spin text-[#1f6fe5]" />
                <span className="text-[#1f6fe5]">Saving...</span>
              </>
            ) : localIsSaved ? (
              <>
                <Bookmark size={15} fill="#1f6fe5" className="text-[#1f6fe5]" />
                <span className="text-[#1f6fe5]">Unsave post</span>
              </>
            ) : (
              <>
                <Bookmark size={15} />
                <span>Save post</span>
              </>
            )}
          </DropdownMenuItem>

          {myPost && (
            <>
              <DropdownMenuItem
                onClick={onEdit}
                className="flex items-center gap-2 px-3 py-2 font-semibold text-slate-700 cursor-pointer"
              >
                <Pencil size={15} /> Edit post
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-3 py-2 font-semibold text-rose-600 cursor-pointer focus:text-rose-600 focus:bg-rose-50"
              >
                <Trash2 size={15} className="text-rose-600" />
                Delete post
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {showDeleteModal && (
        <DeletePostComment
          setShowDeleteModal={setShowDeleteModal}
          confirmDelete={confirmDelete}
          isDeleting={isDeleting}
          type="post"
        />
      )}
    </>
  );
};

export default DropdownPost;
