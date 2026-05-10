import type { Context } from "hono";
import { prismaErrorResponse } from "../lib/prisma-errors.js";
import { parseJsonBody, validationError } from "../lib/http.js";
import { idParamSchema } from "../schemas/common.schema.js";
import { createTagSchema, updateTagSchema } from "../schemas/tags.schema.js";
import { tagsRepository } from "../repositories/tags.repository.js";

export const getTags = async (c: Context) => {
  const tags = await tagsRepository.findAll();
  return c.json(tags);
};

export const getTagById = async (c: Context) => {
  const params = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!params.success) return validationError(c, params.error);

  const tag = await tagsRepository.findById(params.data.id);
  if (!tag) return c.json({ error: "Tag no encontrado." }, 404);

  return c.json(tag);
};

export const createTag = async (c: Context) => {
  const body = createTagSchema.safeParse(await parseJsonBody(c));
  if (!body.success) return validationError(c, body.error);

  try {
    const tag = await tagsRepository.create(body.data);
    return c.json(tag, 201);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};

export const updateTag = async (c: Context) => {
  const params = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!params.success) return validationError(c, params.error);

  const body = updateTagSchema.safeParse(await parseJsonBody(c));
  if (!body.success) return validationError(c, body.error);

  try {
    const tag = await tagsRepository.update(params.data.id, body.data);
    return c.json(tag);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};

export const deleteTag = async (c: Context) => {
  const params = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!params.success) return validationError(c, params.error);

  try {
    const tag = await tagsRepository.delete(params.data.id);
    return c.json(tag);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};
