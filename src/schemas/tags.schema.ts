import * as z from "zod";

export const createTagSchema = z.object({
  name: z.string().trim().min(1).max(50)
});

export const updateTagSchema = createTagSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Debe enviar al menos un campo para actualizar." }
);

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
