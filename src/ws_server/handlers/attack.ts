import { EAttackStatus, EMessagesTypes, IWSAttackRequest, IWSAttackResponse } from '../models';
import { games } from '../store';
import { transformMessage } from '../utils/transformMessage';
import { turn } from './turn';
import { getSurroundingCells } from '../utils/getSurroundingCells';

const getResponse = (message: IWSAttackRequest['data'], status: EAttackStatus) => {
  return transformMessage.stringify<IWSAttackResponse>(
    { type: EMessagesTypes.ATTACK },
    {
      position: { x: message.x, y: message.y },
      status,
      currentPlayer: message.indexPlayer,
    },
  );
};

export const attack = (message: IWSAttackRequest['data']) => {
  const isTurnPlayer = games[message.gameId][message.indexPlayer].isTurn;
  if (!isTurnPlayer) {
    return;
  }

  const game = Object.values(games[message.gameId]);
  const enemy = game.find(({ indexPlayer }) => indexPlayer !== message.indexPlayer);
  if (!enemy) {
    return;
  }

  const fieldIndex = enemy.field.findIndex((cell) => cell.x === message.x && cell.y === message.y);
  if (fieldIndex === -1 || enemy.field[fieldIndex].isShoot) {
    turn(message.gameId);
    return;
  }

  const enemyShips = enemy.ships || [[]];


  let shipIndex = -1;
  const ship = enemyShips.find((s) => {
    shipIndex = s.findIndex(({ position }) => position.x === message.x && position.y === message.y);
    return shipIndex !== -1;
  });

  const responses: string[] = [];

  enemy.field[fieldIndex].isShoot = true;

  if (ship) {
    ship[shipIndex].isShoot = true;
    const isShipSunk = ship.every((s) => s.isShoot);
    if (isShipSunk) {
      ship.forEach((s) => {
        const answer = { ...message, x: s.position.x, y: s.position.y };
        const response = getResponse(answer, EAttackStatus.KILLED);
        responses.push(response);
      });
      const surroundingCells = getSurroundingCells(ship);
      surroundingCells.forEach(({ x, y }) => {
        const fieldIndex = enemy.field.findIndex((cell) => cell.x === x && cell.y === y);
        if (fieldIndex !== -1) {
          enemy.field[fieldIndex].isShoot = true;
        }
        const answer = { ...message, x, y };
        const response = getResponse(answer, EAttackStatus.MISS);
        responses.push(response);
      });
    } else {
      const response = getResponse(message, EAttackStatus.SHOT);
      responses.push(response);
    }
  } else {
    const response = getResponse(message, EAttackStatus.MISS);
    responses.push(response);
  }

  responses.forEach((resp, index) => {
    game.forEach(({ client }) => {
      client.send(resp);
    });
    const isChangeTurn = index === 0 && !ship;
    turn(message.gameId, isChangeTurn);
  });

  console.log(`${EMessagesTypes.ATTACK}: attack position: (${message.x}, ${message.y})`);
};
