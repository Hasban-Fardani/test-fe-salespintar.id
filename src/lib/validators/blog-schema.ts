import { z } from "zod";

export const blogFilterSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
});

export type BlogFilterSchemaType = z.infer<typeof blogFilterSchema>;
