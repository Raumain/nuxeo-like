import { Elysia, t } from "elysia";
import { fileBase } from "../../schemas/files";
import {
	createFile,
	deleteFile,
	getAllFiles,
	getFileById,
	getFilesByPath,
	updateFile,
} from "./repository";
import { getWorkspaceById } from "../workspaces/repository";

const fileRouter = new Elysia({ prefix: "/files" })
	.get(
		"/",
		async ({ status }) => {
			try {
				const files = await getAllFiles();
				return { files };
			} catch (err) {
				console.error("Error fetching files:", err);
				return status(500, { error: "Failed to fetch files" });
			}
		},
		{
			response: {
				200: t.Object({
					files: t.Array(fileBase),
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
				const file = await getFileById(params.id);

				if (!file) {
					return status(404, { error: "file not found" });
				}

				return file;
			} catch (err) {
				console.error("Error fetching file:", err);
				return status(500, {
					error: "Failed to fetch file",
				});
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				200: fileBase,
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
				const workspace = await getWorkspaceById(body.workspace)
				if (!workspace) return status(409, { error: "Cannot save file : Workspace does not exists" })
				const bodyFile = body.file;
				const { name, size, type } = bodyFile;
				let path = `uploads/${workspace.name}`;

				const existingFile = await getFilesByPath(`${path}/${name}`)

				if (existingFile.length) path = `${path}/${name.split(".")[0]}(${existingFile.length}).${name.split(".")[1]}`
				else path = `${path}/${name}`


				const bytes = await Bun.write(path, bodyFile);
				if (!bytes) return status(500, { error: "Failed to write file" })

				const file = await createFile({
					name,
					size,
					path,
					type,
					tags: body.tags,
					workspaceId: workspace.id
				});
				if (!file) return status(500, { error: "file not created" })

				return { id: file.id };
			} catch (err) {
				console.error("Error creating file:", err);
				return status(500, { error: "Failed to create file" });
			}
		},
		{
			body: t.Object({
				file: t.File(),
				workspace: t.String(),
				tags: t.Nullable(t.ArrayString())
			}),
			response: {
				200: t.Object({
					id: t.String(),
				}),
				400: t.Object({
					error: t.String(),
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
		async ({ params, body }) => {
			try {
				const file = await updateFile(params.id, body);
				if (!file) {
					return { error: "file not found" };
				}

				return { id: file.id };
			} catch (error) {
				console.error("Error updating file:", error);
				return { error: "Failed to update file" };
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			body: t.Partial(fileBase),
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
				const file = await deleteFile(params.id);
				if (!file) {
					return { error: "file not found" };
				}

				return { id: file.id };
			} catch (error) {
				console.error("Error deleting file:", error);
				return { error: "Failed to delete file" };
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

export default fileRouter;
