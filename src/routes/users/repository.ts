import type { Static } from "@sinclair/typebox";
import { db } from "../../db";
import type {
	usersBase,
	usersCreate,
} from "../../schemas/users";

export const getAllUsers = async () => {
	const data = await db.selectFrom("users").selectAll().execute();

	return data;
};

export const getUsersById = async (id: string) => {
	const data = await db
		.selectFrom("users")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	return data;
};

export const createUsers = async (
	body: Static<typeof usersCreate>,
) => {
	const data = await db
		.insertInto("users")
		.values(body)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const updateUsers = async (
	id: string,
	body: Partial<Static<typeof usersBase>>,
) => {
	const data = await db
		.updateTable("users")
		.set(body)
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};

export const deleteUsers = async (id: string) => {
	const data = await db
		.deleteFrom("users")
		.where("id", "=", id)
		.returning("id")
		.executeTakeFirst();

	return data;
};
