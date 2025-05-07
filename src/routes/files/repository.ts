import type { Static } from "@sinclair/typebox";
import { db } from "../../db";
import type { fileBase, fileCreate } from "../../schemas/files";
import { convertDatesToStrings } from "../../utils/replaceDatesWithStrings";
import { sql } from "bun";

export const getAllFiles = async () => {
	const data = await db.selectFrom("files").selectAll().execute();
	return convertDatesToStrings(data);
};

export const getFileById = async (id: string) => {
	const data = await db
		.selectFrom("files")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	return convertDatesToStrings(data);
};

export const getFilesByPath = async (path: string) => {
	const data = await db
		.selectFrom("files")
		.selectAll()
		.where("path", "=", path)
		.execute();

	return convertDatesToStrings(data);
};

export const createFile = async (body: Static<typeof fileCreate>) => {
	const data = await db
		.insertInto("files")
		.values({
			...body,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "system",
			updatedBy: "system",
		})
		.returning("id")
		.executeTakeFirst();

	sql`SELECT `

	return data;
};

export const updateFile = async (
	id: string,
	body: Partial<Static<typeof fileBase>>,
) => {
	const data = await db
		.updateTable("files")
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

export const deleteFile = async (id: string) => {
	const data = await db
		.deleteFrom("files")
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};
