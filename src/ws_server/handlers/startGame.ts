import { EMessagesTypes, IPlayer } from '../models';
import { transformMessage } from '../utils/transformMessage';

export const startGame = (players: IPlayer[]) => {
  players.forEach(({ player, client }) => {
    const message = transformMessage.stringify(
      { type: EMessagesTypes.START_GAME, id: 0 },
      { ships: player.ships, currentPlayerIndex: player.indexPlayer },
    );
    client.send(message);
  });
};
