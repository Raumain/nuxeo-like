import { Elysia, t } from "elysia";
import { workspaceBase } from "../../schemas/workspaces";
import {
	createWorkspace,
	deleteWorkspace,
	getAllWorkspaces,
	getWorkspaceById,
	updateWorkspace,
} from "./repository";
import { createNewWorkspace } from "./service";

const workspaceRouter = new Elysia({ prefix: "/workspaces" })
	.get(
		"/",
		async ({ status }) => {
			try {
				const workspaces = await getAllWorkspaces();
				return { workspaces };
			} catch (err) {
				console.error("Error fetching workspaces:", err);
				return status(500, { error: "Failed to fetch workspaces" });
			}
		},
		{
			response: {
				200: t.Object({
					workspaces: t.Array(workspaceBase),
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
				const workspace = await getWorkspaceById(params.id);

				if (!workspace) {
					return status(404, { error: "workspace not found" });
				}

				return { workspace };
			} catch (err) {
				console.error("Error fetching workspace:", err);
				return status(500, {
					error: "Failed to fetch workspace",
				});
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				200: t.Object({
					workspace: workspaceBase,
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
				const { name, description } = body;
				await createNewWorkspace({ name });
				const workspace = await createWorkspace({
					name,
					description,
				});
				if (!workspace) return status(500, { error: "workspace not created" });

				return { id: workspace.id };
			} catch (err) {
				console.error("Error creating workspace:", err);
				return status(500, { error: "Failed to create workspace" });
			}
		},
		{
			body: t.Object({
				name: t.String(),
				description: t.Nullable(t.String()),
			}),
			response: {
				200: t.Object({
					id: t.String(),
				}),
				400: t.Object({
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
		async ({ params, body }) => {
			try {
				const workspace = await updateWorkspace(params.id, body);
				if (!workspace) {
					return { error: "workspace not found" };
				}

				return { id: workspace.id };
			} catch (error) {
				console.error("Error updating workspace:", error);
				return { error: "Failed to update workspace" };
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			body: t.Partial(workspaceBase),
			response: {
				200: t.Object({
					id: t.String(),
				}),
				400: t.Object({
					error: t.String(),
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
		async ({ params }) => {
			try {
				const workspace = await deleteWorkspace(params.id);
				if (!workspace) {
					return { error: "workspace not found" };
				}

				return { id: workspace.id };
			} catch (error) {
				console.error("Error deleting workspace:", error);
				return { error: "Failed to delete workspace" };
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
				400: t.Object({
					error: t.String(),
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

export default workspaceRouter;
