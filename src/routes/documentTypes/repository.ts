import type { Static } from "@sinclair/typebox";
import { db } from "../../db";
import type {
	documentTypesBase,
	documentTypesCreate,
} from "../../schemas/documentTypes";

export const getAllDocumentTypes = async () => {
	const data = await db.selectFrom("documentTypes").selectAll().execute();

	return data;
};

export const getDocumentTypesById = async (id: string) => {
	const data = await db
		.selectFrom("documentTypes")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	return data;
};

export const createDocumentTypes = async (
	body: Static<typeof documentTypesCreate>,
) => {
	const data = await db
		.insertInto("documentTypes")
		.values(body)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const updateDocumentTypes = async (
	id: string,
	body: Partial<Static<typeof documentTypesBase>>,
) => {
	const data = await db
		.updateTable("documentTypes")
		.set(body)
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const deleteDocumentTypes = async (id: string) => {
	const data = await db
		.deleteFrom("documentTypes")
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};
