import type { Static } from "@sinclair/typebox";
import { db } from "../../db";
import type {
	permissionsBase,
	permissionsCreate,
} from "../../schemas/permissions";

export const getAllPermissions = async () => {
	const data = await db.selectFrom("permissions").selectAll().execute();

	return data;
};

export const getPermissionsById = async (id: string) => {
	const data = await db
		.selectFrom("permissions")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	return data;
};

export const createPermissions = async (
	body: Static<typeof permissionsCreate>,
) => {
	const data = await db
		.insertInto("permissions")
		.values(body)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const updatePermissions = async (
	id: string,
	body: Partial<Static<typeof permissionsBase>>,
) => {
	const data = await db
		.updateTable("permissions")
		.set(body)
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const deletePermissions = async (id: string) => {
	const data = await db
		.deleteFrom("permissions")
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};
