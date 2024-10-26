import { transformMessage } from '../utils/transformMessage';
import { EMessagesTypes, IPlayer } from '../models';
import { games } from '../store';

const turnChange = (gameId: string) => {
  const playersChanged: Record<string, IPlayer> = {};
  Object.values(games[gameId]).forEach((player) => {
    playersChanged[player.player.indexPlayer] = {
      ...player,
      player: { ...player.player, isTurn: !player.player.isTurn },
    };
  });
  games[gameId] = playersChanged;
};

export const turn = (gameId: string, isChange?: boolean) => {
  if (isChange) {
    turnChange(gameId);
  }

  const currentPlayer = Object.values(games[gameId]).find((player) => player.player.isTurn);

  if (currentPlayer) {
    const message = transformMessage.stringify(
      { type: EMessagesTypes.TURN, id: 0 },
      { currentPlayer: currentPlayer?.player.indexPlayer },
    );
    currentPlayer.client.send(message);
  }
};
