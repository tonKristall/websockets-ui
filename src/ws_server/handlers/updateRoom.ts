import { WebSocket } from "ws";
import { EMessagesTypes, IWSRegMessage } from "../models";
import { addUser, getUser } from "../../db/users/db";
import { generateId } from "../utils/generateId";
import { transformMessage } from "../utils/transformMessage";
import { getRooms } from "../../db/rooms/db";

export const updateRoom = async (ws: WebSocket) => {
  const rooms = await getRooms();
  const message = transformMessage.stringify(
    { type: EMessagesTypes.UPDATE_ROOM, id: 0 },
    rooms
  );
  ws.send(message);
};
