import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { categoriesRouter } from "./routes/categories.routes.js";
import { notesRouter } from "./routes/notes.routes.js";
import { tagsRouter } from "./routes/tags.routes.js";

export const app = new Hono();

app.use(logger());
app.use(prettyJSON());

app.get("/", (c) =>
  c.json({
    name: "API de Notas",
    endpoints: ["/notes", "/categories", "/tags"]
  })
);

app.route("/notes", notesRouter);
app.route("/categories", categoriesRouter);
app.route("/tags", tagsRouter);

app.notFound((c) => c.json({ error: "Ruta no encontrada." }, 404));

app.onError((error, c) => {
  console.error(error);
  return c.json({ error: "Error interno del servidor." }, 500);
});
