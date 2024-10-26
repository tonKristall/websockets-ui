import { IUser } from '../../db/users/types';
import { updateRoom, getRoom } from '../../db/rooms/db';
import { IWSAddUserToRoomMessage } from '../models';

export const addUserToRoom = async (user: IUser, data: IWSAddUserToRoomMessage['data']) => {
  const room = await getRoom(data.indexRoom);
  if (room && !room.roomUsers.find((roomUser) => roomUser.index === user.index)) {
    room.roomUsers.push(user);
    await updateRoom(room);
  }
  return room?.roomUsers;
};
