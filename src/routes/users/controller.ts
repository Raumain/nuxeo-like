import { Elysia, t } from "elysia";
import { usersBase, usersCreate } from "../../schemas/users";
import {
	createUsers,
	deleteUsers,
	getAllUsers,
	getUsersById,
	updateUsers,
} from "./repository";


const usersRouter = new Elysia({ prefix: "/users" })
	.get(
		"/",
		async ({ status }) => {
			try {
				const users = await getAllUsers();
				return { users };
			} catch (error) {
				console.error("Error fetching users:", error);
				return status(500, { error: "Failed to fetch users" });
			}
		},
		{
			response: {
				200: t.Object({
					users: t.Array(usersBase),
				}),
				500: t.Object({
					error: t.String(),
				}),
			},
		},
	)
	.get(
		"/:id",
		async ({ params, status }) => {
			try {
				const users = await getUsersById(params.id);

				if (!users) {
					return status(404, { error: "users not found" });
				}

				return { users };
			} catch (error) {
				console.error("Error fetching users:", error);
				return status(500, { error: "Failed to fetch users" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				200: t.Object({
					users: usersBase,
				}),
				404: t.Object({
					error: t.String(),
				}),
				500: t.Object({
					error: t.String(),
				}),
			},
		},
	)
	.post(
		"/",
		async ({ body, status }) => {
			try {
				const users = await createUsers(body);

				if (!users) {
					return status(409, { error: "users not created" });
				}

				return { id: users.id };
			} catch (error) {
				console.error("Error creating users:", error);
				return status(500, { error: "Failed to create users" });
			}
		},
		{
			body: usersCreate,
			response: {
				200: t.Object({
					id: t.String(),
				}),
				409: t.Object({
					error: t.String(),
				}),
				500: t.Object({
					error: t.String(),
				}),
			},
		},
	)
	.put(
		"/:id",
		async ({ params, body, status }) => {
			try {
				const users = await updateUsers(params.id, body);
				if (!users) {
					return status(404, { error: "users not found" });
				}

				return { id: users.id };
			} catch (error) {
				console.error("Error updating users:", error);
				return status(500, { error: "Failed to update users" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			body: t.Partial(usersBase),
			response: {
				200: t.Object({
					id: t.String(),
				}),
				404: t.Object({
					error: t.String(),
				}),
				500: t.Object({
					error: t.String(),
				}),
			},
		},
	)
	.delete(
		"/:id",
		async ({ params, status }) => {
			try {
				const users = await deleteUsers(params.id);
				if (!users) {
					return status(404, { error: "users not found" });
				}

				return { id: users.id };
			} catch (error) {
				console.error("Error deleting users:", error);
				return status(500, { error: "Failed to delete users" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				200: t.Object({
					id: t.String(),
				}),
				404: t.Object({
					error: t.String(),
				}),
				500: t.Object({
					error: t.String(),
				}),
			},
		},
	);

export default usersRouter;
