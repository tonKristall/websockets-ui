import { IShip } from '../models';

export const getFullShips = (ships: IShip[]): IShip[][] => {
  return ships.map((ship) => {
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
};
