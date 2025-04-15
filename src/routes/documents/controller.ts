import type { Static } from "@sinclair/typebox";
import { Elysia, file, form, t } from "elysia";
import { documentBase, documentCreate } from "../../schemas/documents";
import {
	createDocument,
	deleteDocument,
	getAllDocuments,
	getDocumentById,
	updateDocument,
} from "./repository";

const documentRouter = new Elysia({ prefix: "/documents" })
	.get(
		"/",
		async ({ error }) => {
			try {
				const documents = await getAllDocuments();
				return { documents };
			} catch (err) {
				console.error("Error fetching documents:", err);
				return error(500, { error: "Failed to fetch documents" });
			}
		},
		{
			response: {
				200: t.Object({
					documents: t.Array(documentBase),
				}),
				500: t.Object({
					error: t.String(),
				}),
			},
		},
	)
	.get(
		"/:id",
		async ({ params, error }) => {
			try {
				const document = await getDocumentById(params.id);

				if (!document) {
					return error(404, { error: "document not found" });
				}

        // const file = Bun.file(document.path);

				return form({ document, file: file(document.path) });
			} catch (err) {
				console.error("Error fetching document:", err);
				return error(500, {
					error: "Failed to fetch document",
				});
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			response: {
				// 200: t.Object({
				// 	document: documentBase,
        //   file: t.File(),
				// }),
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
		async ({ body }) => {
			try {
				const file = body.file;
				const { name, size, type } = file;
				const path = `uploads/${file.name}`;
				const bytes = await Bun.write(path, file);
				if (!bytes) {
					throw new Error("Failed to write file");
				}
				const document = await createDocument({
					name,
					size,
					path,
					type,
				});
				if (!document) {
					return { error: "document not created" };
				}

				return { id: document.id };
			} catch (error) {
				console.error("Error creating document:", error);
				return { error: "Failed to create document" };
			}
		},
		{
			body: t.Object({
				file: t.File(),
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
				const document = await updateDocument(params.id, body);
				if (!document) {
					return { error: "document not found" };
				}

				return { id: document.id };
			} catch (error) {
				console.error("Error updating document:", error);
				return { error: "Failed to update document" };
			}
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			body: t.Partial(documentBase),
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
				const document = await deleteDocument(params.id);
				if (!document) {
					return { error: "document not found" };
				}

				return { id: document.id };
			} catch (error) {
				console.error("Error deleting document:", error);
				return { error: "Failed to delete document" };
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

export default documentRouter;
