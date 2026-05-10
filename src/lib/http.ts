import type { Context } from "hono";
import type { ZodError } from "zod";

export const parseJsonBody = async (c: Context): Promise<unknown> => {
  try {
    return await c.req.json();
  } catch {
    return null;
  }
};

export const validationError = (c: Context, error: ZodError) =>
  c.json(
    {
      error: "Datos inválidos",
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))
    },
    400
  );
