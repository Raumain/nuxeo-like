import type { Static } from "@sinclair/typebox";
import { db } from "../../db";
import type {
	documentsBase,
	documentsCreate,
} from "../../schemas/documents";

export const getAllDocuments = async () => {
	const data = await db.selectFrom("documents").selectAll().execute();

	return data;
};

export const getDocumentsById = async (id: string) => {
	const data = await db
		.selectFrom("documents")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	return data;
};

export const createDocuments = async (
	body: Static<typeof documentsCreate>,
) => {
	const data = await db
		.insertInto("documents")
		.values(body)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const updateDocuments = async (
	id: string,
	body: Partial<Static<typeof documentsBase>>,
) => {
	const data = await db
		.updateTable("documents")
		.set(body)
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const deleteDocuments = async (id: string) => {
	const data = await db
		.deleteFrom("documents")
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};
