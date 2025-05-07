import { t } from "elysia";
import { generatedData } from "./generated";

export const documentMetadataCreate = t.Object({
 documentId: t.Optional(t.String()),
 data: t.Optional(t.Any()),
});

export const documentMetadataBase = t.Intersect([generatedData, documentMetadataCreate]);

