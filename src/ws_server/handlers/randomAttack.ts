import { IWSAttackRequest, IWSRandomAttackRequest } from '../models';
import { games } from '../store';

export const randomAttack = (message: IWSRandomAttackRequest['data']): IWSAttackRequest['data'] | undefined => {
  const enemy = Object.values(games[message.gameId]).find(({ indexPlayer }) => indexPlayer !== message.indexPlayer);
  if (!enemy) return;

  const playerField = enemy.field.filter(({ isShoot }) => !isShoot);
  const indexPlayer = Math.floor(Math.random() * playerField.length);
  const position = playerField[indexPlayer];
  return {
    ...message,
    x: position.x,
    y: position.y,
  };
};
