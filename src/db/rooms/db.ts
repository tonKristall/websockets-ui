import { readFile, writeFile } from 'fs/promises';
import { TRoomList } from './types';
import { IRoom } from './types';

const filePath = './src/db/rooms/data.json';

export const getRooms = async (): Promise<TRoomList> => {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data) || {};
  } catch (error) {
    return {};
  }
};

export const getRoom = async (roomId: string): Promise<IRoom | undefined> => {
  const rooms = await getRooms();
  return rooms[roomId];
};

export const addRoom = async (room: IRoom): Promise<void> => {
  try {
    const rooms = await getRooms();
    rooms[room.roomId] = room;
    await writeFile(filePath, JSON.stringify(rooms, null, 2));
  } catch (err) {
  }
};

export const removeRoom = async (roomId: string): Promise<void> => {
  try {
    const rooms = await getRooms();
    delete rooms [roomId];
    await writeFile(filePath, JSON.stringify(rooms, null, 2));
  } catch (err) {
  }
};
