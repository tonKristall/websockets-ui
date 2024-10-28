import { EMessagesTypes } from '../models';
import { generateId } from '../utils/generateId';
import { addRoom } from '../../db/rooms/db';
import { IRoom } from '../../db/rooms/types';
import { IUser } from '../../db/users/types';

export const createRoom = async (user: IUser) => {
  const room: IRoom = {
    roomId: generateId(),
    roomUsers: [user] as IRoom['roomUsers'],
  };
  await addRoom(room);
  console.log(`${EMessagesTypes.CREATE_ROOM}: user ${user.name} created room ${room.roomId}`);
  return room;
};
