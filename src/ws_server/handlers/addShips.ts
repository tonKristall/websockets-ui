import { games } from '../store';
import { IWSAddShipsMessage } from '../models';

export const addShips = (message: IWSAddShipsMessage['data']) => {
  games[message.gameId][message.indexPlayer].player.ships = message.ships;
  return Object.values(games[message.gameId]);
};
