import { t } from "elysia";
import { generatedData } from "./generated";

export const documentTypesCreate = t.Object({
 name: t.Optional(t.String()),
 schema: t.Optional(t.Any()),
 isFolder: t.Optional(t.Boolean()),
});

export const documentTypesBase = t.Intersect([generatedData, documentTypesCreate]);

