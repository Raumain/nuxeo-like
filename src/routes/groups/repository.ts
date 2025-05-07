import type { Static } from "@sinclair/typebox";
import { db } from "../../db";
import type {
	groupsBase,
	groupsCreate,
} from "../../schemas/groups";

export const getAllGroups = async () => {
	const data = await db.selectFrom("groups").selectAll().execute();

	return data;
};

export const getGroupsById = async (id: string) => {
	const data = await db
		.selectFrom("groups")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	return data;
};

export const createGroups = async (
	body: Static<typeof groupsCreate>,
) => {
	const data = await db
		.insertInto("groups")
		.values(body)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const updateGroups = async (
	id: string,
	body: Partial<Static<typeof groupsBase>>,
) => {
	const data = await db
		.updateTable("groups")
		.set(body)
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const deleteGroups = async (id: string) => {
	const data = await db
		.deleteFrom("groups")
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};
