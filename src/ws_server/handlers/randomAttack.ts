import { IWSAttackRequest, IWSRandomAttackRequest } from '../models';
import { games } from '../store';
import { attack } from './attack';

export const randomAttack = async (message: IWSRandomAttackRequest['data']) => {
  const enemy = Object.values(games[message.gameId]).find(({ indexPlayer }) => indexPlayer !== message.indexPlayer);
  if (!enemy) return;

  const playerField = enemy.field.filter(({ isShoot }) => !isShoot);
  const indexPlayer = Math.floor(Math.random() * playerField.length);
  const position = playerField[indexPlayer];
  const randomAttackMessage: IWSAttackRequest['data'] = {
    ...message,
    x: position.x,
    y: position.y,
  };
  await attack(randomAttackMessage);
};
