import { transformMessage } from '../utils/transformMessage';
import { EMessagesTypes, ETypePlayers, TPlayer, IWSTurnResponse, IWSRandomAttackRequest } from '../models';
import { games } from '../store';
import { randomAttack } from './randomAttack';

const turnChange = (gameId: string) => {
  const playersChanged: Record<string, TPlayer> = {};
  Object.values(games[gameId]).forEach((player) => {
    playersChanged[player.indexPlayer] = {
      ...player,
      isTurn: !player.isTurn,
    } as TPlayer;
  });
  games[gameId] = playersChanged;
};

export const turn = async (gameId: string, isChange?: boolean) => {
  if (isChange) {
    turnChange(gameId);
  }

  const currentPlayer = Object.values(games[gameId]).find(({ isTurn }) => isTurn);
  if (currentPlayer) {
    if (currentPlayer.type === ETypePlayers.user) {
      const message = transformMessage.stringify<IWSTurnResponse>(
        { type: EMessagesTypes.TURN },
        { currentPlayer: currentPlayer.indexPlayer },
      );

      Object.values(games[gameId]).forEach((player) => {
        if (player.type === ETypePlayers.user)
          player.client.send(message);
      });
    } else {
      const message: IWSRandomAttackRequest['data'] = {
        gameId,
        indexPlayer: currentPlayer.indexPlayer,
      };
      await randomAttack(message);
    }
  }
};
