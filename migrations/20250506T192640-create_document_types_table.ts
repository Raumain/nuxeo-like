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
		.addColumn("created_by", "varchar(10)", (col) =>
			col.references("users.id").onDelete("set null"),
		)
		.addColumn("updated_at", "timestamp", (col) =>
			col.defaultTo(sql`now()`).notNull(),
		)
		.addColumn("updated_by", "varchar(10)", (col) =>
			col.references("users.id").onDelete("set null"),
		)
		.addColumn("created_at", "timestamp", (col) =>
			col.defaultTo(sql`now()`).notNull(),
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("document_types").execute();
}
