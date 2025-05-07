import { Elysia, t } from "elysia";
import { documentMetadataBase, documentMetadataCreate } from "../../schemas/documentMetadata";
import {
	createDocumentMetadata,
	deleteDocumentMetadata,
	getAllDocumentMetadata,
	getDocumentMetadataById,
	updateDocumentMetadata,
} from "./repository";


const documentMetadataRouter = new Elysia({ prefix: "/documentMetadata" })
	.get(
		"/",
		async ({ status }) => {
			try {
				const documentMetadata = await getAllDocumentMetadata();
				return { documentMetadata };
			} catch (error) {
				console.error("Error fetching documentMetadata:", error);
				return status(500, { error: "Failed to fetch documentMetadata" });
			}
		},
		{
			response: {
				200: t.Object({
					documentMetadata: t.Array(documentMetadataBase),
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
				const documentMetadata = await getDocumentMetadataById(params.id);

				if (!documentMetadata) {
					return status(404, { error: "documentMetadata not found" });
				}

				return { documentMetadata };
			} catch (error) {
				console.error("Error fetching documentMetadata:", error);
				return status(500, { error: "Failed to fetch documentMetadata" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				200: t.Object({
					documentMetadata: documentMetadataBase,
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
				const documentMetadata = await createDocumentMetadata(body);

				if (!documentMetadata) {
					return status(409, { error: "documentMetadata not created" });
				}

				return { id: documentMetadata.id };
			} catch (error) {
				console.error("Error creating documentMetadata:", error);
				return status(500, { error: "Failed to create documentMetadata" });
			}
		},
		{
			body: documentMetadataCreate,
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
				const documentMetadata = await updateDocumentMetadata(params.id, body);
				if (!documentMetadata) {
					return status(404, { error: "documentMetadata not found" });
				}

				return { id: documentMetadata.id };
			} catch (error) {
				console.error("Error updating documentMetadata:", error);
				return status(500, { error: "Failed to update documentMetadata" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			body: t.Partial(documentMetadataBase),
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
				const documentMetadata = await deleteDocumentMetadata(params.id);
				if (!documentMetadata) {
					return status(404, { error: "documentMetadata not found" });
				}

				return { id: documentMetadata.id };
			} catch (error) {
				console.error("Error deleting documentMetadata:", error);
				return status(500, { error: "Failed to delete documentMetadata" });
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

export default documentMetadataRouter;
