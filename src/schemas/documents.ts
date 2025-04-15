import { t } from "elysia";
import { generatedData } from "./generated";

export const documentCreate = t.Object({
	name: t.String(),
	size: t.Number(),
	path: t.String(),
	type: t.String(),
});
export const documentBase = t.Intersect([generatedData, documentCreate]);
