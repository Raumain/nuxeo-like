import { Elysia, t } from "elysia";
import { groupsBase, groupsCreate } from "../../schemas/groups";
import {
	createGroups,
	deleteGroups,
	getAllGroups,
	getGroupsById,
	updateGroups,
} from "./repository";


const groupsRouter = new Elysia({ prefix: "/groups" })
	.get(
		"/",
		async ({ status }) => {
			try {
				const groups = await getAllGroups();
				return { groups };
			} catch (error) {
				console.error("Error fetching groups:", error);
				return status(500, { error: "Failed to fetch groups" });
			}
		},
		{
			response: {
				200: t.Object({
					groups: t.Array(groupsBase),
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
				const groups = await getGroupsById(params.id);

				if (!groups) {
					return status(404, { error: "groups not found" });
				}

				return { groups };
			} catch (error) {
				console.error("Error fetching groups:", error);
				return status(500, { error: "Failed to fetch groups" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				200: t.Object({
					groups: groupsBase,
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
				const groups = await createGroups(body);

				if (!groups) {
					return status(409, { error: "groups not created" });
				}

				return { id: groups.id };
			} catch (error) {
				console.error("Error creating groups:", error);
				return status(500, { error: "Failed to create groups" });
			}
		},
		{
			body: groupsCreate,
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
				const groups = await updateGroups(params.id, body);
				if (!groups) {
					return status(404, { error: "groups not found" });
				}

				return { id: groups.id };
			} catch (error) {
				console.error("Error updating groups:", error);
				return status(500, { error: "Failed to update groups" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			body: t.Partial(groupsBase),
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
				const groups = await deleteGroups(params.id);
				if (!groups) {
					return status(404, { error: "groups not found" });
				}

				return { id: groups.id };
			} catch (error) {
				console.error("Error deleting groups:", error);
				return status(500, { error: "Failed to delete groups" });
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

export default groupsRouter;
