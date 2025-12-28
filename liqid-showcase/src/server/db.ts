import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import type { Database as DatabaseSchema } from './types.js';

// Use DATABASE_PATH from env, default to in-memory
const databasePath = process.env.DATABASE_PATH || ':memory:';

const dialect = new SqliteDialect({
  database: new Database(databasePath),
});

export const db = new Kysely<DatabaseSchema>({
  dialect,
});

// Initialize database tables
export async function initializeDatabase() {
  // Create users table if it doesn't exist
  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('email', 'text', (col) => col.notNull().unique())
    .addColumn('created_at', 'text', (col) =>
      col.defaultTo('CURRENT_TIMESTAMP'),
    )
    .execute();

  // Create user table (for auth codes) if it doesn't exist
  await db.schema
    .createTable('user')
    .ifNotExists()
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('user', 'text', (col) => col.notNull())
    .addColumn('code', 'text', (col) => col.notNull())
    .addColumn('created_at', 'text', (col) =>
      col.defaultTo('CURRENT_TIMESTAMP'),
    )
    .execute();
}
