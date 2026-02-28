import EmojiPicker, { Theme } from "emoji-picker-react";

const Emojis = ({
  setShowEmoji,
  onEmojiClick,
}: {
  setShowEmoji: (show: boolean) => void;
  onEmojiClick: (emojiData: any) => void;
}) => {
  return (
    <div className="absolute bottom-full left-0 mb-3 z-100 shadow-2xl border border-slate-200 rounded-xl bg-white overflow-hidden animate-in fade-in zoom-in duration-200">
      <div className="flex justify-between items-center p-2 border-b bg-slate-50">
        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 ml-2">
          Select Emoji
        </span>
        <button
          type="button"
          onClick={() => setShowEmoji(false)}
          className="text-[10px] bg-slate-200 hover:bg-red-100 hover:text-red-600 px-2 py-0.5 rounded transition font-bold"
        >
          Close ✖
        </button>
      </div>
      <EmojiPicker
        onEmojiClick={(emojiData) => {
          onEmojiClick(emojiData);
        }}
        previewConfig={{ showPreview: false }}
        width={280}
        height={350}
        theme={Theme.LIGHT}
        searchDisabled={false}
        skinTonesDisabled
      />
    </div>
  );
};

export default Emojis;
