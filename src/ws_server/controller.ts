import { WebSocket } from "ws";
import { reg } from './handlers/reg';
import { EMessagesTypes, TWSMessage } from "./models";
import { updateRoom } from "./handlers/updateRoom";
import { createRoom } from "./handlers/createRoom";
import { IUser } from "../db/users/types";
import { addUserToRoom } from "./handlers/addUserToRoom";
import { addToRoom } from "../db/rooms/db";

let user: IUser | null = null;
export const controller = async (ws: WebSocket, message: TWSMessage) => {

  switch (message.type) {
    case EMessagesTypes.REG:
      try {
        user = await reg(ws, message.data);
        if (user) {
          await updateRoom(ws);
        }
      } catch (e) {
        console.log(e);
      }
      break;
    case EMessagesTypes.CREATE_ROOM:
      try {
        if (user) {
          await createRoom(user);
          await updateRoom(ws);
        }
      } catch (e) {
        console.log(e);
      }
      break;
    default:
      console.log(`Unknown request type: ${message}`,);
  }
};
