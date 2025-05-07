import { t } from "elysia";
import { generatedData } from "./generated";

export const usersCreate = t.Object({
 email: t.Optional(t.String()),
 firstName: t.Optional(t.String()),
 lastName: t.Optional(t.String()),
 groups: t.Optional(t.String()),
});

export const usersBase = t.Intersect([generatedData, usersCreate]);

