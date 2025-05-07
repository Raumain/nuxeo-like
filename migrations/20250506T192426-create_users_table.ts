import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("users")
		.addColumn("id", "varchar(10)", (col) =>
			col.primaryKey().notNull().unique(),
		)
		.addColumn("email", "varchar(100)", (col) => col.notNull().unique())
		.addColumn("first_name", "varchar(100)", (col) => col.notNull())
		.addColumn("last_name", "varchar(100)", (col) => col.notNull())
		.addColumn("groups", "uuid", (col) => col.references("groups.id").notNull())
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
		.alterTable("groups")
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
	await db.schema.dropTable("users").execute();
}
