import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import useCommentReplyActions from "@/Utils/custom-hooks/useCommentReplyAction/useCommentReplyAction";
import usePostActions from "@/Utils/custom-hooks/usePostActions/usePostActions";
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

interface DropdownActionProps {
  id: string;
  postId?: string;
  type: "post" | "comment" | "reply";
  ownerId: string;
  onEdit: () => void;
  onDelete?: () => void;
  localIsSaved?: boolean;
  setLocalIsSaved?: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab?: string;
}

const DropdownAction = ({
  id,
  postId,
  type,
  onDelete,
  ownerId,
  onEdit,
  localIsSaved,
  setLocalIsSaved,
}: DropdownActionProps) => {
  const { userData } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const postActions = usePostActions(id);
  const commentActions = useCommentReplyActions(postId || "");

  const isMyItem = userData?.data?.user?._id === ownerId;
  const getActions = () => {
    switch (type) {
      case "post":
        return {
          handleDelete: postActions.handleDelete,
          isDeleting: postActions.isDeleting,
        };
      case "comment":
        return {
          handleDelete: () => commentActions.handleDeleteComment(id),
          isDeleting: commentActions.isDeletingComment,
        };
      case "reply":
        return {
          handleDelete: () => commentActions.handleDeleteReply(id),
          isDeleting: commentActions.isDeletingReply,
        };
      default:
        return { handleDelete: () => {}, isDeleting: false };
    }
  };

  const { handleDelete, isDeleting } = getActions();

  const confirmDelete = async () => {
    if (onDelete) {
      onDelete();
    } else {
      handleDelete();
    }
    setShowDeleteModal(false);
  };
  const onSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type !== "post" || !setLocalIsSaved) return;

    const newStatus = !localIsSaved;
    setLocalIsSaved(newStatus);
    postActions.handleSave(undefined, {
      onError: () => setLocalIsSaved(!newStatus),
    });
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
          {type === "post" && (
            <DropdownMenuItem
              disabled={postActions.isSaving}
              onClick={onSaveClick}
              className="flex items-center gap-2 px-3 py-2 font-semibold text-slate-700 cursor-pointer disabled:opacity-50"
            >
              {postActions.isSaving ? (
                <>
                  {" "}
                  <Loader2
                    size={15}
                    className="animate-spin text-[#1f6fe5]"
                  />{" "}
                  <span className="text-[#1f6fe5]">Saving...</span>{" "}
                </>
              ) : localIsSaved ? (
                <>
                  {" "}
                  <Bookmark
                    size={15}
                    fill="#1f6fe5"
                    className="text-[#1f6fe5]"
                  />{" "}
                  <span className="text-[#1f6fe5]">Unsave</span>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Bookmark size={15} /> <span>Save post</span>{" "}
                </>
              )}
            </DropdownMenuItem>
          )}

          {isMyItem && (
            <>
              <DropdownMenuItem
                onClick={onEdit}
                className="flex items-center gap-2 px-3 py-2 font-semibold text-slate-700 cursor-pointer"
              >
                <Pencil size={15} /> Edit {type}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-3 py-2 font-semibold text-rose-600 cursor-pointer focus:text-rose-600 focus:bg-rose-50"
              >
                <Trash2 size={15} /> Delete {type}
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
          type={type}
        />
      )}
    </>
  );
};

export default DropdownAction;
