import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("document_types")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("name", "varchar", (col) => col.notNull().unique())
		.addColumn("schema", "jsonb", (col) => col.notNull())
		.addColumn("is_folder", "boolean", (col) => col.defaultTo(false).notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("document_types").execute();
}
