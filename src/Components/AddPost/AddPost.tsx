import { PostService } from "@/services/Post.service";
import { useCustomForm } from "@/Utils/custom-hooks/useCustomForm/useCustomForm";
import { postSchema, type PostSchema } from "@/Utils/schemas/Post/Post.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import toast from "react-hot-toast";

const AddPost = ({
  name,
  photo,
}: {
  name: string | null;
  photo: string | null;
}) => {
  const { register, reset, watch, handleSubmit, setValue } =
    useCustomForm<PostSchema>({
      schema: postSchema,
      defaultValues: { body: "", image: null, privacy: "public" },
    });

  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const bodyText = watch("body") || "";

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setValue("body", bodyText + emojiData.emoji);
  };

  const addPost = async (values: PostSchema) => {
    const formData = new FormData();
    formData.append("body", values.body);
    formData.append("privacy", values.privacy);
    if (values.image && values.image.length > 0)
      formData.append("image", values.image[0]);
    return await PostService.addPost(formData);
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully! 🎉");
      reset();
      setShowEmoji(false);
    },
  });

  const onSubmit = (data: PostSchema) => {
    mutate(data);
  };

  const defaultAvatar =
    "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 flex items-start gap-3">
          <img
            src={photo || defaultAvatar}
            alt={name || "user"}
            className="h-11 w-11 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-base font-extrabold text-slate-900">
              {name || "Guest"}
            </p>
            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-earth"
                aria-hidden="true"
              >
                <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                <circle cx={12} cy={12} r={10} />
              </svg>

              <select
                {...register("privacy")}
                className="cursor-pointer bg-transparent outline-none"
              >
                <option value="public">Public</option>
                <option value="following">Followers</option>
                <option value="only_me">Only me</option>
              </select>
            </div>
          </div>
        </div>

        <div className="relative">
          <textarea
            {...register("body")}
            rows={4}
            placeholder={`What's on your mind, ${name || "Guest"}?`}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <span className="text-emerald-600 text-lg">🖼️</span>
              <span className="hidden sm:inline">Photo/video</span>
              <input
                accept="image/*"
                className="hidden"
                type="file"
                {...register("image")}
              />
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmoji(!showEmoji)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                <span className="text-amber-500 text-lg">😊</span>
                <span className="hidden sm:inline">Feeling/activity</span>
              </button>

              {showEmoji && (
                <div className="absolute top-full left-0 mt-2 z-50 shadow-2xl border rounded-xl bg-white overflow-hidden sm:left-auto sm:right-0">
                  <div className="flex justify-between items-center p-2 border-b bg-slate-50">
                    <span className="text-xs font-bold text-slate-400 ml-2">
                      Emojis
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowEmoji(false)}
                      className="text-xs bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded text-slate-700 transition"
                    >
                      Close ✖
                    </button>
                  </div>
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    previewConfig={{ showPreview: false }}
                    width={300}
                    height={350}
                    searchDisabled={false}
                    skinTonesDisabled
                  />
                </div>
              )}
            </div>
          </div>

          <button
            disabled={isPending || !bodyText.trim()}
            className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-6 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
