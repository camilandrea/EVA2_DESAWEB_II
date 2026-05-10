import * as z from "zod";

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(120),
  content: z.string().trim().min(1),
  categoryId: z.number().int().positive()
});

export const updateNoteSchema = createNoteSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Debe enviar al menos un campo para actualizar." }
);

export const noteTagSchema = z.object({
  tagId: z.number().int().positive()
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
export type NoteTagInput = z.infer<typeof noteTagSchema>;
