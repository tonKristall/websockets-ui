import { WebSocket } from "ws";
import { EMessagesTypes, IWSRegMessage } from "../models";
import { addUser, getUser } from "../../db/users/db";
import { generateId } from "../utils/generateId";
import { transformMessage } from "../utils/transformMessage";
import { addRoom, getRooms } from "../../db/rooms/db";
import { IRoom } from "../../db/rooms/types";
import { IUser } from "../../db/users/types";

export const createRoom = async (user: IUser) => {
  const room: IRoom = {
    roomId: generateId(),
    roomUsers: [user] as IRoom["roomUsers"],
  }
  await addRoom(room);
  console.log(`${EMessagesTypes.CREATE_ROOM}: created room ${room.roomId}`)
  return room;
};
