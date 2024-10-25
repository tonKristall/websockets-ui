import { WebSocket } from "ws";
import { EMessagesTypes } from "../models";
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
