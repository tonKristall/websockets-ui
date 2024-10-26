import { games } from '../store';
import { IShip, IWSAddShipsRequest } from '../models';

export const addShips = (message: IWSAddShipsRequest['data']) => {
  games[message.gameId][message.indexPlayer].ships = message.ships.map((ship) => {
    const shipCoords = [ship];
    for (let i = 1; i < ship.length; i++) {
      const nextShip: IShip = {
        ...ship,
        position: ship.direction
          ? { x: ship.position.x, y: ship.position.y + i }
          : { x: ship.position.x + i, y: ship.position.y },
      };
      shipCoords.push(nextShip);
    }
    return shipCoords;
  });
  return Object.values(games[message.gameId]);
};
