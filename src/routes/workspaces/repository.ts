import type { Static } from "@sinclair/typebox";
import { db } from "../../db";
import type { workspaceBase, workspaceCreate } from "../../schemas/workspaces";
import { convertDatesToStrings } from "../../utils/replaceDatesWithStrings";

export const getAllWorkspaces = async () => {
	const data = await db.selectFrom("workspaces").selectAll().execute();
	return convertDatesToStrings(data);
};

export const getWorkspaceById = async (id: string) => {
	const data = await db
		.selectFrom("workspaces")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	return convertDatesToStrings(data);
};

export const getWorkspaceByName = async (name: string) => {
	const data = await db
		.selectFrom("workspaces")
		.selectAll()
		.where("name", "=", name)
		.executeTakeFirst();

	return convertDatesToStrings(data);
};

export const createWorkspace = async (body: Static<typeof workspaceCreate>) => {
	const data = await db
		.insertInto("workspaces")
		.values({
			...body,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "system",
			updatedBy: "system",
		})
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const updateWorkspace = async (
	id: string,
	body: Partial<Static<typeof workspaceBase>>,
) => {
	const data = await db
		.updateTable("workspaces")
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

export const deleteWorkspace = async (id: string) => {
	const data = await db
		.deleteFrom("workspaces")
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};
