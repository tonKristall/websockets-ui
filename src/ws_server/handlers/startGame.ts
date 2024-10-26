import { EMessagesTypes, IPlayer, IWSStartGameResponse } from '../models';
import { transformMessage } from '../utils/transformMessage';

export const startGame = (players: IPlayer[]) => {
  players.forEach(({ indexPlayer, client, ships }) => {
    if (ships) {
      const message = transformMessage.stringify<IWSStartGameResponse>(
        { type: EMessagesTypes.START_GAME },
        { ships: ships[0], currentPlayerIndex: indexPlayer },
      );
      client.send(message);
    }
  });
};
