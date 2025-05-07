import { t } from "elysia";
import { generatedData } from "./generated";

export const workspaceCreate = t.Object({
    name: t.String(),
    description: t.Nullable(t.String()),
});
export const workspaceBase = t.Intersect([generatedData, workspaceCreate]);
