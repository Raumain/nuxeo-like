import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("documents")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("parent_id", "uuid", (col) => col.notNull())
		.addColumn("type_id", "uuid", (col) =>
			col.references("document_types.id").onDelete("restrict").notNull(),
		)
		.addColumn("title", "varchar", (col) => col.notNull())
		.addColumn("slug", "varchar", (col) => col.notNull())
		.addColumn("path", "varchar", (col) => col.notNull())
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

	await db.schema
		.alterTable("documents")
		.addForeignKeyConstraint(
			"fk_documents_parent_id",
			["parent_id"],
			"documents",
			["id"],
			(col) => col.onDelete("set null"),
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("documents").execute();
}
