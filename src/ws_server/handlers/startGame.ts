import { EMessagesTypes, ETypePlayers, IWSStartGameResponse, TPlayer } from '../models';
import { transformMessage } from '../utils/transformMessage';

export const startGame = (players: TPlayer[]) => {
  players.forEach((player) => {
    if (player.type === ETypePlayers.user && player.ships) {
      const message = transformMessage.stringify<IWSStartGameResponse>(
        { type: EMessagesTypes.START_GAME },
        { ships: player.ships[0], currentPlayerIndex: player.indexPlayer },
      );
      player.client.send(message);
    }
  });
};
