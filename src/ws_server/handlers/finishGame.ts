import { games } from '../store';
import { transformMessage } from '../utils/transformMessage';
import { EMessagesTypes, IWSFinishGameResponse } from '../models';
import { updateWinners } from './updateWinners';
import { addWinner } from '../../db/winners/db';

export const finishGame = async (gameId: string, winPlayer: string) => {
  const game = Object.values(games[gameId]);
  const winName = games[gameId][winPlayer].client?.user?.name;
  const response = transformMessage.stringify<IWSFinishGameResponse>(
    { type: EMessagesTypes.FINISH_GAME },
    {
      winPlayer,
    });

  game.forEach(({ client }) => {
    client && client.send(response);
  });

  if (winName) {
    console.log(`User ${winName} is win`);
    await addWinner(winName);
  }
  await updateWinners();
  delete games[gameId];
};
