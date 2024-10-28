import { EMessagesTypes, ETypePlayers, IPlayer, IWSCreateGameResponse } from '../models';
import { generateId } from '../utils/generateId';
import { IRoomUser } from '../../db/rooms/types';
import { clients, games } from '../store';
import { transformMessage } from '../utils/transformMessage';
import { initField } from '../utils/initField';

export const createGame = (user1: IRoomUser, user2: IRoomUser) => {
  const idGame = generateId();
  clients.forEach((client) => {
    if (client.user?.index === user1.index || client.user?.index === user2.index) {
      const idPlayer = generateId();
      const message = transformMessage.stringify<IWSCreateGameResponse>(
        { type: EMessagesTypes.CREATE_GAME },
        { idGame, idPlayer },
      );

      const player: IPlayer = {
        type: ETypePlayers.user,
        client,
        indexPlayer: idPlayer,
        gameId: idGame,
        isTurn: !games[idGame],
        field: initField(),
      };

      if (games[idGame]) {
        games[idGame][idPlayer] = player;
      } else {
        games[idGame] = {
          [idPlayer]: player,
        };
      }

      client.send(message);
    }
  });
};
