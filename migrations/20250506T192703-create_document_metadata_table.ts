import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("document_metadata")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("document_id", "uuid", (col) =>
			col.references("documents.id").onDelete("cascade").notNull(),
		)
		.addColumn("data", "jsonb", (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("document_metadata").execute();
}
