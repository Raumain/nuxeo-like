import { t } from "elysia";
import { generatedData } from "./generated";

export const permissionsCreate = t.Object({
 documentId: t.Optional(t.String()),
 userId: t.Optional(t.String()),
 accessType: t.Optional(t.String()),
});

export const permissionsBase = t.Intersect([generatedData, permissionsCreate]);

