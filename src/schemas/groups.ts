import { t } from "elysia";
import { generatedData } from "./generated";

export const groupsCreate = t.Object({
 name: t.Optional(t.String()),
});

export const groupsBase = t.Intersect([generatedData, groupsCreate]);

