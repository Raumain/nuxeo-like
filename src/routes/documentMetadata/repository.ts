import type { Static } from "@sinclair/typebox";
import { db } from "../../db";
import type {
	documentMetadataBase,
	documentMetadataCreate,
} from "../../schemas/documentMetadata";

export const getAllDocumentMetadata = async () => {
	const data = await db.selectFrom("documentMetadata").selectAll().execute();

	return data;
};

export const getDocumentMetadataById = async (id: string) => {
	const data = await db
		.selectFrom("documentMetadata")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	return data;
};

export const createDocumentMetadata = async (
	body: Static<typeof documentMetadataCreate>,
) => {
	const data = await db
		.insertInto("documentMetadata")
		.values(body)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const updateDocumentMetadata = async (
	id: string,
	body: Partial<Static<typeof documentMetadataBase>>,
) => {
	const data = await db
		.updateTable("documentMetadata")
		.set(body)
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const deleteDocumentMetadata = async (id: string) => {
	const data = await db
		.deleteFrom("documentMetadata")
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};
