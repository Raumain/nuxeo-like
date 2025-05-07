import { t } from "elysia";
import { generatedData } from "./generated";

export const fileCreate = t.Object({
	name: t.String(),
	size: t.Number(),
	path: t.String(),
	type: t.String(),
	tags: t.Nullable(t.ArrayString()),
	workspaceId: t.String()
});
export const fileBase = t.Intersect([generatedData, fileCreate]);
