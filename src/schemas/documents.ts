import { t } from "elysia";
import { generatedData } from "./generated";

export const documentsCreate = t.Object({
 parentId: t.Optional(t.String()),
 typeId: t.Optional(t.String()),
 title: t.Optional(t.String()),
 slug: t.Optional(t.String()),
 path: t.Optional(t.String()),
 isFolder: t.Optional(t.Boolean()),
});

export const documentsBase = t.Intersect([generatedData, documentsCreate]);

