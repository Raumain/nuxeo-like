import type { Static } from "@sinclair/typebox";
import { db } from "../../db";
import type {
	documentVersionsBase,
	documentVersionsCreate,
} from "../../schemas/documentVersions";

export const getAllDocumentVersions = async () => {
	const data = await db.selectFrom("documentVersions").selectAll().execute();

	return data;
};

export const getDocumentVersionsById = async (id: string) => {
	const data = await db
		.selectFrom("documentVersions")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	return data;
};

export const createDocumentVersions = async (
	body: Static<typeof documentVersionsCreate>,
) => {
	const data = await db
		.insertInto("documentVersions")
		.values(body)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const updateDocumentVersions = async (
	id: string,
	body: Partial<Static<typeof documentVersionsBase>>,
) => {
	const data = await db
		.updateTable("documentVersions")
		.set(body)
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const deleteDocumentVersions = async (id: string) => {
	const data = await db
		.deleteFrom("documentVersions")
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};
