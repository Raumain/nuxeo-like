import { Elysia, t } from "elysia";
import { documentsBase, documentsCreate } from "../../schemas/documents";
import {
	createDocuments,
	deleteDocuments,
	getAllDocuments,
	getDocumentsById,
	updateDocuments,
} from "./repository";


const documentsRouter = new Elysia({ prefix: "/documents" })
	.get(
		"/",
		async ({ status }) => {
			try {
				const documents = await getAllDocuments();
				return { documents };
			} catch (error) {
				console.error("Error fetching documents:", error);
				return status(500, { error: "Failed to fetch documents" });
			}
		},
		{
			response: {
				200: t.Object({
					documents: t.Array(documentsBase),
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
				const documents = await getDocumentsById(params.id);

				if (!documents) {
					return status(404, { error: "documents not found" });
				}

				return { documents };
			} catch (error) {
				console.error("Error fetching documents:", error);
				return status(500, { error: "Failed to fetch documents" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				200: t.Object({
					documents: documentsBase,
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
				const documents = await createDocuments(body);

				if (!documents) {
					return status(409, { error: "documents not created" });
				}

				return { id: documents.id };
			} catch (error) {
				console.error("Error creating documents:", error);
				return status(500, { error: "Failed to create documents" });
			}
		},
		{
			body: documentsCreate,
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
				const documents = await updateDocuments(params.id, body);
				if (!documents) {
					return status(404, { error: "documents not found" });
				}

				return { id: documents.id };
			} catch (error) {
				console.error("Error updating documents:", error);
				return status(500, { error: "Failed to update documents" });
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			body: t.Partial(documentsBase),
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
				const documents = await deleteDocuments(params.id);
				if (!documents) {
					return status(404, { error: "documents not found" });
				}

				return { id: documents.id };
			} catch (error) {
				console.error("Error deleting documents:", error);
				return status(500, { error: "Failed to delete documents" });
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

export default documentsRouter;
