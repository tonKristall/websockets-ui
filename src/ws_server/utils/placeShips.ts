import { IPosition, IShip } from '../models';

const shipTypesDefault: Omit<IShip, 'position' | 'direction'>[] = [
  { length: 1, type: 'small' },
  { length: 1, type: 'small' },
  { length: 1, type: 'small' },
  { length: 1, type: 'small' },
  { length: 2, type: 'medium' },
  { length: 2, type: 'medium' },
  { length: 2, type: 'medium' },
  { length: 3, type: 'large' },
  { length: 3, type: 'large' },
  { length: 4, type: 'huge' },
];

const generateRandomPosition = (length: number, gridSize: number): {
  position: IPosition;
  direction: boolean
} => {
  const direction = Math.random() < 0.5;
  let position: IPosition;

  if (direction) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * (gridSize - length));
    position = { x, y };
  } else {
    const x = Math.floor(Math.random() * (gridSize - length));
    const y = Math.floor(Math.random() * gridSize);
    position = { x, y };
  }

  return { position, direction };
};

const checkAdjacentCells = (ships: IShip[], newShip: IShip): boolean => {
  const { position, direction, length } = newShip;
  const shipCells: IPosition[] = [];

  for (let i = 0; i < length; i++) {
    if (direction) {
      shipCells.push({ x: position.x, y: position.y + i });
    } else {
      shipCells.push({ x: position.x + i, y: position.y });
    }
  }

  for (const ship of ships) {
    const { position: existingPosition, direction: existingDirection, length: existingLength } = ship;

    const existingShipCells: IPosition[] = [];
    for (let i = 0; i < existingLength; i++) {
      if (existingDirection) {
        existingShipCells.push({ x: existingPosition.x, y: existingPosition.y + i });
      } else {
        existingShipCells.push({ x: existingPosition.x + i, y: existingPosition.y });
      }
    }

    for (const newCell of shipCells) {
      if (existingShipCells.some(existingCell => existingCell.x === newCell.x && existingCell.y === newCell.y)) {
        return true;
      }

      const adjacentOffsets = [
        { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
        { x: -1, y: 0 }, { x: 1, y: 0 },
        { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
      ];

      for (const offset of adjacentOffsets) {
        if (existingShipCells.some(existingCell =>
          existingCell.x === newCell.x + offset.x && existingCell.y === newCell.y + offset.y)) {
          return true;
        }
      }
    }
  }

  return false;
};

export const placeShips = (shipTypes: Omit<IShip, 'position' | 'direction'>[] = shipTypesDefault, gridSize: number = 10): IShip[] => {
  const ships: IShip[] = [];

  for (const type of shipTypes) {
    let shipPlaced = false;

    while (!shipPlaced) {
      const { position, direction } = generateRandomPosition(type.length, gridSize);
      const newShip: IShip = { position, direction, length: type.length, type: type.type };

      if (!checkAdjacentCells(ships, newShip)) {
        ships.push(newShip);
        shipPlaced = true;
      }
    }
  }

  return ships;
};




