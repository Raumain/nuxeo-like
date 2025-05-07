import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("permissions")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("document_id", "uuid", (col) =>
			col.references("documents.id").onDelete("cascade").notNull(),
		)
		.addColumn("user_id", "varchar(10)", (col) =>
			col.references("users.id").onDelete("cascade").notNull(),
		)
		.addColumn("access_type", "varchar", (col) => col.notNull())
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
  await db.schema.dropTable("permissions").execute();
}
