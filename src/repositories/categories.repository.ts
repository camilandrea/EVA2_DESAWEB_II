import { Prisma } from "../../generated/client/client.js";
import { prisma } from "../lib/prisma.js";
import type { CreateCategoryInput, UpdateCategoryInput } from "../schemas/categories.schema.js";

export type CategoryWithNotes = Prisma.CategoryGetPayload<{
  include: { notes: true };
}>;

export type CategoryRepository = {
  findAll: () => Promise<CategoryWithNotes[]>;
  findById: (id: number) => Promise<CategoryWithNotes | null>;
  create: (data: CreateCategoryInput) => Promise<CategoryWithNotes>;
  update: (id: number, data: UpdateCategoryInput) => Promise<CategoryWithNotes>;
  delete: (id: number) => Promise<CategoryWithNotes>;
};

const categoryInclude = {
  notes: true
} as const;

export const categoriesRepository: CategoryRepository = {
  findAll: () =>
    prisma.category.findMany({
      include: categoryInclude,
      orderBy: { id: "asc" }
    }),

  findById: (id) =>
    prisma.category.findUnique({
      where: { id },
      include: categoryInclude
    }),

  create: (data) =>
    prisma.category.create({
      data,
      include: categoryInclude
    }),

  update: (id, data) =>
    prisma.category.update({
      where: { id },
      data,
      include: categoryInclude
    }),

  delete: (id) =>
    prisma.category.delete({
      where: { id },
      include: categoryInclude
    })
};
