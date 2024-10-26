import { transformMessage } from '../utils/transformMessage';
import { EMessagesTypes, IPlayer, IWSTurnResponse } from '../models';
import { games } from '../store';

const turnChange = (gameId: string) => {
  const playersChanged: Record<string, IPlayer> = {};
  Object.values(games[gameId]).forEach((player) => {
    playersChanged[player.indexPlayer] = {
      ...player,
      isTurn: !player.isTurn,
    };
  });
  games[gameId] = playersChanged;
};

export const turn = (gameId: string, isChange?: boolean) => {
  if (isChange) {
    turnChange(gameId);
  }

  const currentPlayer = Object.values(games[gameId]).find(({ isTurn }) => isTurn);

  if (currentPlayer) {
    const message = transformMessage.stringify<IWSTurnResponse>(
      { type: EMessagesTypes.TURN },
      { currentPlayer: currentPlayer.indexPlayer },
    );

    Object.values(games[gameId]).forEach(({ client }) => {
      client.send(message);
    });
  }
};
