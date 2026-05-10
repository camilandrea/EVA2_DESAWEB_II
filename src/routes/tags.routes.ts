import { Hono } from "hono";
import { createTag, deleteTag, getTagById, getTags, updateTag } from "../controllers/tags.controller.js";

export const tagsRouter = new Hono();

tagsRouter.get("/", getTags);
tagsRouter.get("/:id", getTagById);
tagsRouter.post("/", createTag);
tagsRouter.patch("/:id", updateTag);
tagsRouter.delete("/:id", deleteTag);
