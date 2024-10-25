import { EMessagesTypes } from "../models";
import { transformMessage } from "../utils/transformMessage";
import { getRooms } from "../../db/rooms/db";
import { clients } from "../store";

export const updateRoom = async () => {
  const rooms = await getRooms();
  const message = transformMessage.stringify(
    { type: EMessagesTypes.UPDATE_ROOM, id: 0 },
    rooms
  );
  clients.forEach((client) => {
    client.send(message);
  })
};
