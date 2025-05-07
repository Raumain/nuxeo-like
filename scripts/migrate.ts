import { Migrator, FileMigrationProvider } from "kysely";
import { run } from "kysely-migration-cli";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "../src/db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.resolve(__dirname, "..", "migrations"),
    }),
});

run(db, migrator);
