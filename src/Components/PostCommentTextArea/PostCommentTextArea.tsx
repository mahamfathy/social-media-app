import { ImageIcon, SendHorizontal } from "lucide-react";
import { useState } from "react";
import Emojis from "../Emojis/Emojis";

interface PostCommentTextAreaProps {
  replyText: string;
  setReplyText: (val: string | ((prev: string) => string)) => void;
  replyImage: File | null;
  setReplyImage: (file: File | null) => void;
  handleAddReply: (params: { commentId: string; formData: FormData }) => void;
  commentId: string;
}

const PostCommentTextArea = ({
  replyText,
  setReplyText,
  replyImage,
  setReplyImage,
  handleAddReply,
  commentId,
}: PostCommentTextAreaProps) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const onEmojiClick = (emojiData: any) => {
    setReplyText((prev) => prev + emojiData.emoji);
  };

  const onSubmit = () => {
    if (!replyText.trim() && !replyImage) return;
    const formData = new FormData();
    formData.append("content", replyText);
    if (replyImage) formData.append("image", replyImage);

    handleAddReply({ commentId, formData });
    setReplyText("");
    setReplyImage(null);
    setShowEmoji(false);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:bg-white">
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && !e.shiftKey && (e.preventDefault(), onSubmit())
        }
        placeholder="Write a reply..."
        className="w-full min-h-9 px-2 py-1 text-xs outline-none bg-transparent resize-none"
        rows={1}
      />

      <div className="mt-1 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <label className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-full cursor-pointer">
            <ImageIcon size={14} />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setReplyImage(e.target.files?.[0] || null)}
            />
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className="p-1.5 hover:bg-slate-200 rounded-full text-sm"
            >
              😊
            </button>
            {showEmoji && (
              <div className="absolute bottom-10 left-0 z-50">
                <Emojis
                  setShowEmoji={setShowEmoji}
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}
          </div>

          {replyImage && (
            <span className="text-[10px] text-blue-500 font-bold">
              Image added
            </span>
          )}
        </div>

        <button
          onClick={onSubmit}
          disabled={!replyText.trim() && !replyImage}
          className="h-8 w-8 flex items-center justify-center rounded-full bg-[#1877f2] text-white disabled:bg-[#9ec5ff]"
        >
          <SendHorizontal size={14} />
        </button>
      </div>
    </div>
  );
};

export default PostCommentTextArea;
