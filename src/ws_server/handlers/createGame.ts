import { EMessagesTypes } from '../models';
import { generateId } from '../utils/generateId';
import { IRoomUser } from '../../db/rooms/types';
import { clients, games } from '../store';
import { transformMessage } from '../utils/transformMessage';

export const createGame = (user1: IRoomUser, user2: IRoomUser) => {
  const idGame = generateId();
  clients.forEach((client) => {
    if (client.user?.index === user1.index || client.user?.index === user2.index) {
      const idPlayer = generateId();
      const message = transformMessage.stringify(
        { type: EMessagesTypes.CREATE_GAME, id: 0 },
        { idGame, idPlayer },
      );
      if (games[idGame]) {
        games[idGame][idPlayer] = ({ client, player: { indexPlayer: idPlayer, gameId: idGame, isTurn: false } });
      } else {
        games[idGame] = { [idPlayer]: { client, player: { indexPlayer: idPlayer, gameId: idGame, isTurn: true } } };
      }

      client.send(message);
    }
  });
};
