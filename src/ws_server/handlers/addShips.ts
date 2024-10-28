import { games } from '../store';
import { IWSAddShipsRequest } from '../models';
import { getFullShips } from '../utils/getFullShips';

export const addShips = (message: IWSAddShipsRequest['data']) => {
  games[message.gameId][message.indexPlayer].ships = getFullShips(message.ships);
  return Object.values(games[message.gameId]);
};
