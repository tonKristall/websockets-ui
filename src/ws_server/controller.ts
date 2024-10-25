import { reg } from './handlers/reg';
import { EMessagesTypes, IWSWithUser, TWSMessage } from "./models";
import { updateRoom } from "./handlers/updateRoom";
import { createRoom } from "./handlers/createRoom";
import { addUserToRoom } from "./handlers/addUserToRoom";
import { createGame } from "./handlers/createGame";

export const controller = async (ws: IWSWithUser, message: TWSMessage) => {
  console.log(message);
  switch (message.type) {
    case EMessagesTypes.REG:
      try {
        const user = await reg(ws, message.data);
        if (!user) {
          break;
        }
        ws.user = user;
        await updateRoom();
      } catch (e) {
        console.error(e);
      }
      break;
    case EMessagesTypes.CREATE_ROOM:
      try {
        if (!ws.user) {
          break;
        }
        await createRoom(ws.user);
        await updateRoom();
      } catch (e) {
        console.error(e);
      }
      break;
    case EMessagesTypes.ADD_USER_TO_ROOM:
      try {
        if (!ws.user) {
          break;
        }
        const roomUsers = await addUserToRoom(ws.user, message.data);
        if (!roomUsers) {
          break;
        }
        await updateRoom();
        const [user1, user2] = roomUsers;
        if (!user1 || !user2) {
          break;
        }
        await createGame(user1, user2);
      } catch (e) {
        console.error(e);
      }
      break;
    default:
      console.log(`Unknown request type: ${JSON.stringify(message)}`,);
  }
};
