import { Hono } from "hono";
import {
  addTagToNote,
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  removeTagFromNote,
  updateNote
} from "../controllers/notes.controller.js";

export const notesRouter = new Hono();

notesRouter.get("/", getNotes);
notesRouter.get("/:id", getNoteById);
notesRouter.post("/", createNote);
notesRouter.patch("/:id", updateNote);
notesRouter.delete("/:id", deleteNote);
notesRouter.post("/:id/tags", addTagToNote);
notesRouter.delete("/:id/tags/:tagId", removeTagFromNote);
