import { EMessagesTypes, ETypePlayers, IBot, IPlayer, IWSCreateGameResponse } from '../models';
import { generateId } from '../utils/generateId';
import { clients, games } from '../store';
import { transformMessage } from '../utils/transformMessage';
import { initField } from '../utils/initField';
import { placeShips } from '../utils/placeShips';
import { getFullShips } from '../utils/getFullShips';
import { IUser } from '../../db/users/types';

export const createGameWithBot = (user: IUser) => {
  const idGame = generateId();

  clients.forEach((client) => {
    if (client.user?.index === user.index) {
      const idPlayer = generateId();
      const idBot = generateId();
      const botShips = placeShips();

      const player: IPlayer = {
        type: ETypePlayers.user,
        client,
        indexPlayer: idPlayer,
        gameId: idGame,
        isTurn: true,
        field: initField(),
      };

      const bot: IBot = {
        type: ETypePlayers.bot,
        client: null,
        indexPlayer: idBot,
        gameId: idGame,
        isTurn: false,
        field: initField(),
        ships: getFullShips(botShips),
      };


      games[idGame] = {
        [idPlayer]: player,
        [idBot]: bot,
      };

      const message = transformMessage.stringify<IWSCreateGameResponse>(
        { type: EMessagesTypes.CREATE_GAME },
        { idGame, idPlayer },
      );
      client.send(message);
      console.log(`${EMessagesTypes.SINGLE_PLAY}: user ${user.name} create game with bot`);
    }
  });
};
