import { readFile, writeFile } from 'fs/promises';
import { IRoom } from './types';

const filePath = './src/db/rooms/data.json';

export const getRooms = async (): Promise<IRoom[]> => {
  try {
    const data = await readFile(filePath, 'utf-8');
    return (JSON.parse(data) || []) as IRoom[];
  } catch (error) {
    return [];
  }
};

export const getRoom = async (roomId: string): Promise<IRoom | undefined> => {
  const rooms = await getRooms();
  return rooms.find((room) => room.roomId === roomId);
};

export const addRoom = async (room: IRoom): Promise<void> => {
  try {
    const rooms = await getRooms();
    rooms.push(room);
    await writeFile(filePath, JSON.stringify(rooms, null, 2));
  } catch (err) {
  }
};

export const updateRooms = async (rooms: IRoom[]): Promise<void> => {
  await writeFile(filePath, JSON.stringify(rooms, null, 2));
}

export const removeRoom = async (roomId: string): Promise<void> => {
  try {
    const rooms = await getRooms();
    const newRooms = rooms.filter((room) => room.roomId !== roomId);
    await writeFile(filePath, JSON.stringify(newRooms, null, 2));
  } catch (err) {
  }
}

export const clearRooms = async (): Promise<void> => {
  try {
    await writeFile(filePath, JSON.stringify([]));
  } catch (err) {
  }
};
