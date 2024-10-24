import { readFile, writeFile } from 'fs/promises';
import { IUser } from './types';

const filePath = './src/db/users/data.json';

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const data = await readFile(filePath, 'utf-8');
    return (JSON.parse(data) || []) as IUser[];
  } catch (error) {
    return [];
  }
};

export const getUser = async (name: string): Promise<IUser | undefined> => {
  const users = await getUsers();
  return users.find((user) => user.name === name);
};

export const addUser = async (user: IUser): Promise<void> => {
  try {
    const users = await getUsers();
    users.push(user);
    await writeFile(filePath, JSON.stringify(users, null, 2));
  } catch (err) {
  }
};

export const clearUsers = async (): Promise<void> => {
  try {
    await writeFile(filePath, JSON.stringify([]));
  } catch (err) {
  }
};
