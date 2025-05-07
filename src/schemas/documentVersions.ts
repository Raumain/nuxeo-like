import { t } from "elysia";
import { generatedData } from "./generated";

export const documentVersionsCreate = t.Object({
 documentId: t.Optional(t.String()),
 versionNumber: t.Optional(t.String()),
 fileUrl: t.Optional(t.String()),
 dataSnapshot: t.Optional(t.Any()),
});

export const documentVersionsBase = t.Intersect([generatedData, documentVersionsCreate]);

