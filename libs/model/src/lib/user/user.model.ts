export interface User {
  id?: number;
  username: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  sub?: string | number;
  currentHashedRefreshToken?: string;
}

export type LoginDto = Pick<User, 'username' | 'password'>;

export type TokenPayload = Omit<User, 'password'>;

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CUSTOMER = 'CUSTOMER',
  GUEST = 'GUEST',
}
