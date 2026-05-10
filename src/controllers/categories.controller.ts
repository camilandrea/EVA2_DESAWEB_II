import type { Context } from "hono";
import { prismaErrorResponse } from "../lib/prisma-errors.js";
import { parseJsonBody, validationError } from "../lib/http.js";
import { idParamSchema } from "../schemas/common.schema.js";
import { createCategorySchema, updateCategorySchema } from "../schemas/categories.schema.js";
import { categoriesRepository } from "../repositories/categories.repository.js";

export const getCategories = async (c: Context) => {
  const categories = await categoriesRepository.findAll();
  return c.json(categories);
};

export const getCategoryById = async (c: Context) => {
  const params = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!params.success) return validationError(c, params.error);

  const category = await categoriesRepository.findById(params.data.id);
  if (!category) return c.json({ error: "Categoría no encontrada." }, 404);

  return c.json(category);
};

export const createCategory = async (c: Context) => {
  const body = createCategorySchema.safeParse(await parseJsonBody(c));
  if (!body.success) return validationError(c, body.error);

  try {
    const category = await categoriesRepository.create(body.data);
    return c.json(category, 201);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};

export const updateCategory = async (c: Context) => {
  const params = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!params.success) return validationError(c, params.error);

  const body = updateCategorySchema.safeParse(await parseJsonBody(c));
  if (!body.success) return validationError(c, body.error);

  try {
    const category = await categoriesRepository.update(params.data.id, body.data);
    return c.json(category);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};

export const deleteCategory = async (c: Context) => {
  const params = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!params.success) return validationError(c, params.error);

  try {
    const category = await categoriesRepository.delete(params.data.id);
    return c.json(category);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};
