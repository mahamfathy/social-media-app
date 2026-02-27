import z from "zod";
export const postSchema = z.object({
  body: z.string().min(1, "Post cannot be empty"),
  privacy: z.enum(["public", "following", "only_me"]),
  image: z.any().optional(),
});

export type PostSchema = z.infer<typeof postSchema>;
