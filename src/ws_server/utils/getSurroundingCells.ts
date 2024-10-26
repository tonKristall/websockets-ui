import { IPosition, IShipWithStatus } from '../models';

export const getSurroundingCells = (ship: IShipWithStatus[]): IPosition[] => {
  const surroundingCells = new Set<IPosition>();

  ship.forEach(({ position }) => {
    surroundingCells.add({ x: position.x - 1, y: position.y });
    surroundingCells.add({ x: position.x + 1, y: position.y });
    surroundingCells.add({ x: position.x, y: position.y - 1 });
    surroundingCells.add({ x: position.x, y: position.y + 1 });
    surroundingCells.add({ x: position.x - 1, y: position.y - 1 });
    surroundingCells.add({ x: position.x + 1, y: position.y - 1 });
    surroundingCells.add({ x: position.x - 1, y: position.y + 1 });
    surroundingCells.add({ x: position.x + 1, y: position.y + 1 });
  });

  return Array.from(surroundingCells).filter(({ x, y }) => {
    return x >= 0 && y >= 0 && !ship.some(shipCell => shipCell.position.x === x && shipCell.position.y === y);
  });
};
