import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

// Database schema
export interface Database {
  users: UsersTable;
  user: AuthCodesTable;
}

export interface UsersTable {
  id: Generated<number>;
  name: string;
  email: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface AuthCodesTable {
  id: Generated<number>;
  user: string; // email address
  code: string; // 6-digit code
  created_at: ColumnType<Date, string | undefined, never>;
}

// Type helpers for CRUD operations
export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export type UserAuthCode = Selectable<AuthCodesTable>;
export type NewUserAuthCode = Insertable<AuthCodesTable>;
