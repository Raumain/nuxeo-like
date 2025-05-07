import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("files")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("name", "varchar", (col) => col.notNull())
		.addColumn("size", "integer", (col) => col.notNull())
		.addColumn("updated_by", "varchar(100)", (col) => col.notNull())
		.addColumn("path", "varchar", (col) => col.notNull().unique())
		.addColumn("type", "varchar", (col) => col.notNull())
		.addColumn("tags", "jsonb", (col) =>
			col.defaultTo(sql<Record<string, unknown>>`'[]'::jsonb`),
		)
		.addColumn("workspace_id", "uuid", (col) => col.notNull())
		.addColumn("created_by", "varchar(100)", (col) => col.notNull())
		.addColumn("updated_at", "timestamp", (col) =>
			col.defaultTo(sql`now()`).notNull(),
		)
		.addColumn("created_at", "timestamp", (col) =>
			col.defaultTo(sql`now()`).notNull(),
		)
		.addForeignKeyConstraint(
			"fk_files_workspaces",
			["workspace_id"],
			"workspaces",
			["id"],
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("files").execute();
}
