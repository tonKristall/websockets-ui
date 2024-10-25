import { reg } from './handlers/reg';
import { EMessagesTypes, IWSWithUser, TWSMessage } from "./models";
import { updateRoom } from "./handlers/updateRoom";
import { createRoom } from "./handlers/createRoom";
import { addUserToRoom } from "./handlers/addUserToRoom";

export const controller = async (ws: IWSWithUser, message: TWSMessage) => {
  console.log(message);
  switch (message.type) {
    case EMessagesTypes.REG:
      try {
        const user = await reg(ws, message.data);
        if (user) {
          ws.user = user;
          await updateRoom(ws);
        }
      } catch (e) {
        console.error(e);
      }
      break;
    case EMessagesTypes.CREATE_ROOM:
      try {
        if (ws.user) {
          await createRoom(ws.user);
          await updateRoom(ws);
        }
      } catch (e) {
        console.error(e);
      }
      break;
    case EMessagesTypes.ADD_USER_TO_ROOM:
      try {
        if (ws.user) {
          const roomUsers = await addUserToRoom(ws.user, message.data);
          if (roomUsers) {
            await updateRoom(ws);
          }
        }
      } catch (e) {
        console.error(e);
      }
      break;
    default:
      console.log(`Unknown request type: ${message}`,);
  }
};
