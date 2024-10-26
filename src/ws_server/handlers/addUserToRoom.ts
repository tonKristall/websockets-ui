import { IUser } from '../../db/users/types';
import { updateRoom, getRoom } from '../../db/rooms/db';
import { EMessagesTypes, IWSAddUserToRoomRequest } from '../models';

export const addUserToRoom = async (user: IUser, data: IWSAddUserToRoomRequest['data']) => {
  const room = await getRoom(data.indexRoom);
  if (room && !room.roomUsers.find((roomUser) => roomUser.index === user.index)) {
    room.roomUsers.push(user);
    await updateRoom(room);
  }
  console.log(`${EMessagesTypes.ADD_USER_TO_ROOM}: add user ${user.name} to room ${data.indexRoom}`);
  return room?.roomUsers;
};
