import useCommentReplyActions from "@/Utils/custom-hooks/useCommentReplyAction/useCommentReplyAction";
import useReply from "@/Utils/custom-hooks/useReply/useReply";
import type { Comment } from "@/Utils/interfaces/comment/comment.interface";
import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeletePostComment from "../DeletePostComment/DeletePostComment";
import DropdownPost from "../DropdownPost/DropdownPost";
import PostCommentTextArea from "../PostCommentTextArea/PostCommentTextArea";

interface CommentCardProps {
  comment: Comment;
  userData: any;
  postId: string;
}

const CommentCard = ({ comment, userData, postId }: CommentCardProps) => {
  const {
    handleUpdateComment,
    isUpdatingComment,
    handleDeleteComment,
    handleDeleteReply,
    handleUpdateReply,
    isUpdatingReply,
    handleToggleLike,
  } = useCommentReplyActions(postId);

  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content || "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [localIsLiked, setLocalIsLiked] = useState(
    comment.likes?.includes(userData?._id),
  );
  const [localLikesCount, setLocalLikesCount] = useState(
    comment.likesCount || 0,
  );
  const [replyText, setReplyText] = useState("");
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editReplyValue, setEditReplyValue] = useState("");

  const { allReplies, handleAddReply, isLoading } = useReply(
    postId,
    showReplies ? comment._id : undefined,
  );

  const onSaveReplyEdit = (replyId: string) => {
    if (editReplyValue.trim() === "") return;
    handleUpdateReply(
      { replyId, content: editReplyValue },
      {
        onSuccess: () => {
          setEditingReplyId(null);
          setEditReplyValue("");
        },
      },
    );
  };

  const onDeleteReplyClick = (replyId: string) => {
    handleDeleteReply(replyId);
  };
  const onLikeCommentClick = () => {
    const newStatus = !localIsLiked;
    setLocalIsLiked(newStatus);
    setLocalLikesCount((prev) => (newStatus ? prev + 1 : prev - 1));

    handleToggleLike(comment._id, {
      onError: () => {
        setLocalIsLiked(!newStatus);
        setLocalLikesCount((prev) => (newStatus ? prev - 1 : prev + 1));
      },
    });
  };
  return (
    <div className="group">
      <div className="relative flex items-start gap-2">
        <Link
          to={`/profile/${comment.commentCreator?._id}`}
          className="shrink-0"
        >
          <img
            alt={comment.commentCreator?.name}
            className="mt-0.5 h-8 w-8 rounded-full object-cover"
            src={
              comment.commentCreator?.photo ||
              "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
            }
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="relative inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-3 py-2">
            <Link
              to={`/profile/${comment.commentCreator?._id}`}
              className="text-xs font-bold text-slate-900 hover:underline"
            >
              {comment.commentCreator?.name}
            </Link>

            {isEditing ? (
              <div className="mt-1 min-w-45">
                <textarea
                  className="w-full text-sm p-2 rounded-lg border border-slate-300 focus:border-[#1877f2] outline-none transition-all"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                />
                <div className="flex justify-end gap-2 mt-1">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-[10px] text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateComment(
                        { commentId: comment._id, content: editValue },
                        { onSuccess: () => setIsEditing(false) },
                      )
                    }
                    disabled={isUpdatingComment}
                    className="text-[10px] text-[#1877f2] font-bold"
                  >
                    {isUpdatingComment ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
                  {comment.content}
                </p>
                {comment.image && (
                  <img
                    src={comment.image || ""}
                    alt="Comment image"
                    className="mt-1 w-full max-h-48 object-cover rounded-lg"
                  />
                )}
              </>
            )}
          </div>

          <div className="mt-1 flex items-center gap-4 px-1">
            <span className="text-xs text-slate-400">
              {comment.createdAt
                ? format(new Date(comment.createdAt), "MMM d, h:mm a")
                : "Just now"}
            </span>
            <button
              onClick={onLikeCommentClick}
              className={`text-xs font-bold transition-colors ${
                localIsLiked
                  ? "text-[#1877f2]"
                  : "text-slate-500 hover:text-[#1877f2]"
              }`}
            >
              Like {localLikesCount > 0 && `(${localLikesCount})`}
            </button>
            <button
              onClick={() => setShowReplies((prev) => !prev)}
              className="text-xs font-bold text-slate-500 hover:underline"
            >
              Reply ({comment.repliesCount || 0})
            </button>
            <DropdownPost
              id={comment._id}
              postId={postId}
              type="comment"
              ownerId={comment.commentCreator?._id}
              onEdit={() => setIsEditing(true)}
              onDelete={() => setShowDeleteModal(true)}
            />
          </div>
        </div>
      </div>
      {showReplies && (
        <div className="relative mt-2 ml-5 pl-4 border-l-2 border-slate-100">
          <div className="space-y-3 mb-3">
            {isLoading ? (
              <p className="text-[10px] text-slate-400">Loading replies...</p>
            ) : allReplies?.length > 0 ? (
              allReplies.map((reply: any) => (
                <div
                  key={reply._id}
                  className="relative flex items-start gap-2 group/reply"
                >
                  <img
                    alt={reply.commentCreator?.name}
                    className="h-6 w-6 rounded-full object-cover shrink-0"
                    src={
                      reply.commentCreator?.photo ||
                      "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <div className="inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-2.5 py-1.5">
                      <p className="text-[11px] font-bold text-slate-900">
                        {reply.commentCreator?.name}
                      </p>

                      {editingReplyId === reply._id ? (
                        <div className="mt-1 min-w-37.5">
                          <textarea
                            className="w-full text-[12px] p-1.5 rounded-lg border border-slate-300 focus:border-[#1877f2] outline-none"
                            value={editReplyValue}
                            onChange={(e) => setEditReplyValue(e.target.value)}
                            autoFocus
                          />
                          <div className="flex justify-end gap-2 mt-1">
                            <button
                              onClick={() => setEditingReplyId(null)}
                              className="text-[9px] text-slate-500"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => onSaveReplyEdit(reply._id)}
                              disabled={isUpdatingReply}
                              className="text-[9px] text-[#1877f2] font-bold"
                            >
                              {isUpdatingReply ? "Saving..." : "Save"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-0.5 text-[12px] text-slate-700">
                          {reply.content}
                        </p>
                      )}
                    </div>

                    <div className="mt-0.5 flex items-center gap-3 px-2">
                      <span className="text-[10px] text-slate-400">
                        {reply.createdAt
                          ? format(new Date(reply.createdAt), "h:mm a")
                          : "Just now"}
                      </span>
                      <button
                        onClick={() => handleToggleLike(reply._id)}
                        className={`text-[11px] font-bold hover:underline transition-colors ${
                          reply.likes?.includes(userData?._id) || reply.isLiked
                            ? "text-[#1877f2]"
                            : "text-slate-500"
                        }`}
                      >
                        Like {reply.likesCount > 0 && `(${reply.likesCount})`}
                      </button>
                      <DropdownPost
                        id={reply._id}
                        postId={postId}
                        type="reply"
                        ownerId={reply.commentCreator?._id}
                        onEdit={() => {
                          setEditingReplyId(reply._id);
                          setEditReplyValue(reply.content);
                        }}
                        onDelete={() => onDeleteReplyClick(reply._id)} // استخدام onDeleteReplyClick هنا
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No replies yet.</p>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <img
              src={
                userData?.photo ||
                "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
              }
              className="h-6 w-6 rounded-full object-cover"
              alt="User profile"
            />
            <PostCommentTextArea
              commentId={comment._id}
              replyText={replyText}
              setReplyText={setReplyText}
              replyImage={replyImage}
              setReplyImage={setReplyImage}
              handleAddReply={handleAddReply}
            />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeletePostComment
          setShowDeleteModal={setShowDeleteModal}
          confirmDelete={() => {
            handleDeleteComment(comment._id);
            setShowDeleteModal(false);
          }}
          isDeleting={false}
          type="comment"
        />
      )}
    </div>
  );
};

export default CommentCard;
