import { z } from "zod";
import { QuerySchema } from "./commonSchema";

export const SearchSchema = z.object({
  keyword: QuerySchema,
});

export type Query = z.infer<typeof SearchSchema>;
