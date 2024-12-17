import { z } from "zod";

export const ReviewSchema = z.object({
  rating: z.number(),
  content: z.string().min(1),
});

export type Review = z.infer<typeof ReviewSchema>;
