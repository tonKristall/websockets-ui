import { reg } from './handlers/reg';
import { EMessagesTypes, IWSWithUser, TWSMessage } from './models';
import { updateRoom } from './handlers/updateRoom';
import { createRoom } from './handlers/createRoom';
import { addUserToRoom } from './handlers/addUserToRoom';
import { createGame } from './handlers/createGame';
import { addShips } from './handlers/addShips';
import { startGame } from './handlers/startGame';
import { turn } from './handlers/turn';

export const controller = async (ws: IWSWithUser, message: TWSMessage) => {
  console.log(message);
  switch (message.type) {
    case EMessagesTypes.REG:
      const user = await reg(ws, message.data);
      if (!user) {
        break;
      }
      ws.user = user;
      await updateRoom();
      break;
    case EMessagesTypes.CREATE_ROOM:
      if (!ws.user) {
        break;
      }
      await createRoom(ws.user);
      await updateRoom();
      break;
    case EMessagesTypes.ADD_USER_TO_ROOM:
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
      createGame(user1, user2);
      break;
    case EMessagesTypes.ADD_SHIPS:
      const game = addShips(message.data);
      if (game.every((player) => player.player.ships)) {
        startGame(game);
        turn(message.data.gameId);
      }
      break;
    default:
      console.log(`Unknown request type: ${JSON.stringify(message)}`);
  }
};
