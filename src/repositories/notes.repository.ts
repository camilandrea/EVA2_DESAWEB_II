import { Prisma } from "../../generated/client/client.js";
import { prisma } from "../lib/prisma.js";
import type { CreateNoteInput, UpdateNoteInput } from "../schemas/notes.schema.js";

const noteInclude = {
  category: true,
  tags: {
    include: {
      tag: true
    }
  }
} as const;

export type NoteWithRelations = Prisma.NoteGetPayload<{
  include: typeof noteInclude;
}>;

export type NoteRepository = {
  findAll: () => Promise<NoteWithRelations[]>;
  findById: (id: number) => Promise<NoteWithRelations | null>;
  create: (data: CreateNoteInput) => Promise<NoteWithRelations>;
  update: (id: number, data: UpdateNoteInput) => Promise<NoteWithRelations>;
  delete: (id: number) => Promise<NoteWithRelations>;
  addTag: (noteId: number, tagId: number) => Promise<NoteWithRelations>;
  removeTag: (noteId: number, tagId: number) => Promise<NoteWithRelations>;
};

export const notesRepository: NoteRepository = {
  findAll: () =>
    prisma.note.findMany({
      include: noteInclude,
      orderBy: { id: "asc" }
    }),

  findById: (id) =>
    prisma.note.findUnique({
      where: { id },
      include: noteInclude
    }),

  create: (data) =>
    prisma.note.create({
      data,
      include: noteInclude
    }),

  update: (id, data) =>
    prisma.note.update({
      where: { id },
      data,
      include: noteInclude
    }),

  delete: (id) =>
    prisma.note.delete({
      where: { id },
      include: noteInclude
    }),

  addTag: async (noteId, tagId) => {
    await prisma.noteTag.create({
      data: { noteId, tagId }
    });

    return prisma.note.findUniqueOrThrow({
      where: { id: noteId },
      include: noteInclude
    });
  },

  removeTag: async (noteId, tagId) => {
    await prisma.noteTag.delete({
      where: {
        noteId_tagId: { noteId, tagId }
      }
    });

    return prisma.note.findUniqueOrThrow({
      where: { id: noteId },
      include: noteInclude
    });
  }
};
