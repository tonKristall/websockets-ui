import { TPlayer, IWSWithUser } from './models';

export const clients: Set<IWSWithUser> = new Set();
export const games: Record<string, Record<string, TPlayer>> = {};
