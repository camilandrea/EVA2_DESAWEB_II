import * as z from "zod";

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const tagIdParamSchema = z.object({
  tagId: z.coerce.number().int().positive()
});

export type IdParamInput = z.infer<typeof idParamSchema>;
export type TagIdParamInput = z.infer<typeof tagIdParamSchema>;
