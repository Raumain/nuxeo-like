import { Elysia, t } from "elysia";
import { documentTypesBase, documentTypesCreate } from "../../schemas/documentTypes";
import {
	createDocumentTypes,
	deleteDocumentTypes,
	getAllDocumentTypes,
	getDocumentTypesById,
	updateDocumentTypes,
} from "./repository";


const documentTypesRouter = new Elysia({ prefix: "/documentTypes" })
	.get(
		"/",
		async ({ status }) => {
			try {
				const documentTypes = await getAllDocumentTypes();
				return { documentTypes };
			} catch (error) {
				console.error("Error fetching documentTypes:", error);
				return status(500, { error: "Failed to fetch documentTypes" });
			}
		},
		{
			response: {
				200: t.Object({
					documentTypes: t.Array(documentTypesBase),
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
				const documentTypes = await getDocumentTypesById(params.id);

				if (!documentTypes) {
					return status(404, { error: "documentTypes not found" });
				}

				return { documentTypes };
			} catch (error) {
				console.error("Error fetching documentTypes:", error);
				return status(500, { error: "Failed to fetch documentTypes" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				200: t.Object({
					documentTypes: documentTypesBase,
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
				const documentTypes = await createDocumentTypes(body);

				if (!documentTypes) {
					return status(409, { error: "documentTypes not created" });
				}

				return { id: documentTypes.id };
			} catch (error) {
				console.error("Error creating documentTypes:", error);
				return status(500, { error: "Failed to create documentTypes" });
			}
		},
		{
			body: documentTypesCreate,
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
				const documentTypes = await updateDocumentTypes(params.id, body);
				if (!documentTypes) {
					return status(404, { error: "documentTypes not found" });
				}

				return { id: documentTypes.id };
			} catch (error) {
				console.error("Error updating documentTypes:", error);
				return status(500, { error: "Failed to update documentTypes" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			body: t.Partial(documentTypesBase),
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
				const documentTypes = await deleteDocumentTypes(params.id);
				if (!documentTypes) {
					return status(404, { error: "documentTypes not found" });
				}

				return { id: documentTypes.id };
			} catch (error) {
				console.error("Error deleting documentTypes:", error);
				return status(500, { error: "Failed to delete documentTypes" });
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

export default documentTypesRouter;
