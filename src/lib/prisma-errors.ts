import { Prisma } from "../../generated/client/client.js";
import type { Context } from "hono";

export type PrismaErrorResponse = {
  status: 400 | 404 | 409 | 500;
  body: {
    error: string;
    code?: string;
  };
};

export const parsePrismaError = (error: unknown): PrismaErrorResponse => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return { status: 409, body: { error: "El registro ya existe.", code: error.code } };
    }

    if (error.code === "P2003") {
      return { status: 400, body: { error: "La relación indicada no existe.", code: error.code } };
    }

    if (error.code === "P2025") {
      return { status: 404, body: { error: "Registro no encontrado.", code: error.code } };
    }
  }

  return { status: 500, body: { error: "Error interno del servidor." } };
};

export const prismaErrorResponse = (c: Context, error: unknown) => {
  const parsed = parsePrismaError(error);
  return c.json(parsed.body, parsed.status);
};
