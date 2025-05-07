import { t } from "elysia";

export const generatedData = t.Object({
	id: t.String(),
	createdBy: t.String(),
	createdAt: t.String({ format: "date-time", default: () => new Date().toISOString() }),
	updatedAt: t.String({ format: "date-time", default: () => new Date().toISOString() }),
	updatedBy: t.String(),
});
