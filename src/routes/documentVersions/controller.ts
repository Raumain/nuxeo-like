import { Elysia, t } from "elysia";
import { documentVersionsBase, documentVersionsCreate } from "../../schemas/documentVersions";
import {
	createDocumentVersions,
	deleteDocumentVersions,
	getAllDocumentVersions,
	getDocumentVersionsById,
	updateDocumentVersions,
} from "./repository";


const documentVersionsRouter = new Elysia({ prefix: "/documentVersions" })
	.get(
		"/",
		async ({ status }) => {
			try {
				const documentVersions = await getAllDocumentVersions();
				return { documentVersions };
			} catch (error) {
				console.error("Error fetching documentVersions:", error);
				return status(500, { error: "Failed to fetch documentVersions" });
			}
		},
		{
			response: {
				200: t.Object({
					documentVersions: t.Array(documentVersionsBase),
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
				const documentVersions = await getDocumentVersionsById(params.id);

				if (!documentVersions) {
					return status(404, { error: "documentVersions not found" });
				}

				return { documentVersions };
			} catch (error) {
				console.error("Error fetching documentVersions:", error);
				return status(500, { error: "Failed to fetch documentVersions" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				200: t.Object({
					documentVersions: documentVersionsBase,
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
				const documentVersions = await createDocumentVersions(body);

				if (!documentVersions) {
					return status(409, { error: "documentVersions not created" });
				}

				return { id: documentVersions.id };
			} catch (error) {
				console.error("Error creating documentVersions:", error);
				return status(500, { error: "Failed to create documentVersions" });
			}
		},
		{
			body: documentVersionsCreate,
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
				const documentVersions = await updateDocumentVersions(params.id, body);
				if (!documentVersions) {
					return status(404, { error: "documentVersions not found" });
				}

				return { id: documentVersions.id };
			} catch (error) {
				console.error("Error updating documentVersions:", error);
				return status(500, { error: "Failed to update documentVersions" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			body: t.Partial(documentVersionsBase),
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
				const documentVersions = await deleteDocumentVersions(params.id);
				if (!documentVersions) {
					return status(404, { error: "documentVersions not found" });
				}

				return { id: documentVersions.id };
			} catch (error) {
				console.error("Error deleting documentVersions:", error);
				return status(500, { error: "Failed to delete documentVersions" });
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

export default documentVersionsRouter;
