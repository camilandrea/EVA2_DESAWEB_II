import type { Context } from "hono";
import { prismaErrorResponse } from "../lib/prisma-errors.js";
import { parseJsonBody, validationError } from "../lib/http.js";
import { idParamSchema, tagIdParamSchema } from "../schemas/common.schema.js";
import { createNoteSchema, noteTagSchema, updateNoteSchema } from "../schemas/notes.schema.js";
import { notesRepository } from "../repositories/notes.repository.js";

export const getNotes = async (c: Context) => {
  const notes = await notesRepository.findAll();
  return c.json(notes);
};

export const getNoteById = async (c: Context) => {
  const params = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!params.success) return validationError(c, params.error);

  const note = await notesRepository.findById(params.data.id);
  if (!note) return c.json({ error: "Nota no encontrada." }, 404);

  return c.json(note);
};

export const createNote = async (c: Context) => {
  const body = createNoteSchema.safeParse(await parseJsonBody(c));
  if (!body.success) return validationError(c, body.error);

  try {
    const note = await notesRepository.create(body.data);
    return c.json(note, 201);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};

export const updateNote = async (c: Context) => {
  const params = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!params.success) return validationError(c, params.error);

  const body = updateNoteSchema.safeParse(await parseJsonBody(c));
  if (!body.success) return validationError(c, body.error);

  try {
    const note = await notesRepository.update(params.data.id, body.data);
    return c.json(note);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};

export const deleteNote = async (c: Context) => {
  const params = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!params.success) return validationError(c, params.error);

  try {
    const note = await notesRepository.delete(params.data.id);
    return c.json(note);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};

export const addTagToNote = async (c: Context) => {
  const params = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!params.success) return validationError(c, params.error);

  const body = noteTagSchema.safeParse(await parseJsonBody(c));
  if (!body.success) return validationError(c, body.error);

  try {
    const note = await notesRepository.addTag(params.data.id, body.data.tagId);
    return c.json(note);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};

export const removeTagFromNote = async (c: Context) => {
  const idParams = idParamSchema.safeParse({ id: c.req.param("id") });
  if (!idParams.success) return validationError(c, idParams.error);

  const tagParams = tagIdParamSchema.safeParse({ tagId: c.req.param("tagId") });
  if (!tagParams.success) return validationError(c, tagParams.error);

  try {
    const note = await notesRepository.removeTag(idParams.data.id, tagParams.data.tagId);
    return c.json(note);
  } catch (error) {
    return prismaErrorResponse(c, error);
  }
};
