import type { Static } from "@sinclair/typebox";
import { db } from "../../db";
import type { documentBase, documentCreate } from "../../schemas/documents";
import { convertDatesToStrings } from "../../utils/replaceDatesWithStrings";

export const getAllDocuments = async () => {
	const data = await db.selectFrom("documents").selectAll().execute();
	return convertDatesToStrings(data);
};

export const getDocumentById = async (id: string) => {
	const data = await db
		.selectFrom("documents")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	return convertDatesToStrings(data);
};

export const createDocument = async (body: Static<typeof documentCreate>) => {
	const data = await db
		.insertInto("documents")
		.values({
			...body,
			id: crypto.randomUUID(),
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "system",
			updatedBy: "system",
		})
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const updateDocument = async (
	id: string,
	body: Partial<Static<typeof documentBase>>,
) => {
	const data = await db
		.updateTable("documents")
		.set({
			...body,
			updatedAt: new Date(),
			updatedBy: "system",
		})
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const deleteDocument = async (id: string) => {
	const data = await db
		.deleteFrom("documents")
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};
