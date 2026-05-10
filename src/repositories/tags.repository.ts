import { Prisma } from "../../generated/client/client.js";
import { prisma } from "../lib/prisma.js";
import type { CreateTagInput, UpdateTagInput } from "../schemas/tags.schema.js";

export type TagWithNotes = Prisma.TagGetPayload<{
  include: { notes: { include: { note: true } } };
}>;

export type TagRepository = {
  findAll: () => Promise<TagWithNotes[]>;
  findById: (id: number) => Promise<TagWithNotes | null>;
  create: (data: CreateTagInput) => Promise<TagWithNotes>;
  update: (id: number, data: UpdateTagInput) => Promise<TagWithNotes>;
  delete: (id: number) => Promise<TagWithNotes>;
};

const tagInclude = {
  notes: {
    include: {
      note: true
    }
  }
} as const;

export const tagsRepository: TagRepository = {
  findAll: () =>
    prisma.tag.findMany({
      include: tagInclude,
      orderBy: { id: "asc" }
    }),

  findById: (id) =>
    prisma.tag.findUnique({
      where: { id },
      include: tagInclude
    }),

  create: (data) =>
    prisma.tag.create({
      data,
      include: tagInclude
    }),

  update: (id, data) =>
    prisma.tag.update({
      where: { id },
      data,
      include: tagInclude
    }),

  delete: (id) =>
    prisma.tag.delete({
      where: { id },
      include: tagInclude
    })
};
