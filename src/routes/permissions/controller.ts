import { Elysia, t } from "elysia";
import { permissionsBase, permissionsCreate } from "../../schemas/permissions";
import {
	createPermissions,
	deletePermissions,
	getAllPermissions,
	getPermissionsById,
	updatePermissions,
} from "./repository";


const permissionsRouter = new Elysia({ prefix: "/permissions" })
	.get(
		"/",
		async ({ status }) => {
			try {
				const permissions = await getAllPermissions();
				return { permissions };
			} catch (error) {
				console.error("Error fetching permissions:", error);
				return status(500, { error: "Failed to fetch permissions" });
			}
		},
		{
			response: {
				200: t.Object({
					permissions: t.Array(permissionsBase),
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
				const permissions = await getPermissionsById(params.id);

				if (!permissions) {
					return status(404, { error: "permissions not found" });
				}

				return { permissions };
			} catch (error) {
				console.error("Error fetching permissions:", error);
				return status(500, { error: "Failed to fetch permissions" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				200: t.Object({
					permissions: permissionsBase,
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
				const permissions = await createPermissions(body);

				if (!permissions) {
					return status(409, { error: "permissions not created" });
				}

				return { id: permissions.id };
			} catch (error) {
				console.error("Error creating permissions:", error);
				return status(500, { error: "Failed to create permissions" });
			}
		},
		{
			body: permissionsCreate,
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
				const permissions = await updatePermissions(params.id, body);
				if (!permissions) {
					return status(404, { error: "permissions not found" });
				}

				return { id: permissions.id };
			} catch (error) {
				console.error("Error updating permissions:", error);
				return status(500, { error: "Failed to update permissions" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			body: t.Partial(permissionsBase),
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
				const permissions = await deletePermissions(params.id);
				if (!permissions) {
					return status(404, { error: "permissions not found" });
				}

				return { id: permissions.id };
			} catch (error) {
				console.error("Error deleting permissions:", error);
				return status(500, { error: "Failed to delete permissions" });
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

export default permissionsRouter;
