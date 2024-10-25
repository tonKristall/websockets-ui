import { IUser } from "../../db/users/types";
import { updateRooms, getRooms } from "../../db/rooms/db";
import { IWSAddUserToRoomMessage } from "../models";

export const addUserToRoom = async (user: IUser, data: IWSAddUserToRoomMessage['data']) => {
  const rooms = await getRooms();
  const room = rooms.find((room) => room.roomId === data.indexRoom);
  if (room && !room.roomUsers.find((roomUser) => roomUser.index === user.index)) {
    room.roomUsers.push(user);
    await updateRooms(rooms);
  }
  return room?.roomUsers;
}
