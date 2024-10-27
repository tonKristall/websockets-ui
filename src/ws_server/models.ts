import { WebSocket } from 'ws';
import { IUser } from '../db/users/types';
import { IRoom } from '../db/rooms/types';

export enum EMessagesTypes {
  REG = 'reg',
  UPDATE_ROOM = 'update_room',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  CREATE_GAME = 'create_game',
  ADD_SHIPS = 'add_ships',
  START_GAME = 'start_game',
  TURN = 'turn',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
  FINISH_GAME = 'finish',
  UPDATE_WINNERS = 'update_winners',
}

export enum EAttackStatus {
  MISS = 'miss',
  KILLED = 'killed',
  SHOT = 'shot',
}

export interface IPosition {
  x: number,
  y: number,
}

export interface IShip {
  position: IPosition,
  direction: boolean,
  length: number,
  type: 'small' | 'medium' | 'large' | 'huge',
}

export interface IShipWithStatus extends IShip {
  isShoot?: boolean,
}

export interface IWSRegRequest {
  type: EMessagesTypes.REG;
  data: { name: string, password: string };
}

export interface IWSCreateRoomRequest {
  type: EMessagesTypes.CREATE_ROOM;
  data: '';
}

export interface IWSAddUserToRoomRequest {
  type: EMessagesTypes.ADD_USER_TO_ROOM;
  data: { indexRoom: string };
}

export interface IWSAddShipsRequest {
  type: EMessagesTypes.ADD_SHIPS;
  data: {
    gameId: string,
    ships: IShip[],
    indexPlayer: string,
  };
}

export interface IWSAttackRequest {
  type: EMessagesTypes.ATTACK;
  data: {
    gameId: string,
    x: number,
    y: number,
    indexPlayer: string,
  };
}

export interface IWSRandomAttackRequest {
  type: EMessagesTypes.RANDOM_ATTACK;
  data: {
    gameId: string,
    indexPlayer: string,
  };
}

export type TWSRequest =
  | IWSRegRequest
  | IWSCreateRoomRequest
  | IWSAddUserToRoomRequest
  | IWSAddShipsRequest
  | IWSAttackRequest
  | IWSRandomAttackRequest;

export interface IWSRegResponse {
  type: EMessagesTypes.REG,
  data: {
    name: string,
    index: string,
    error: boolean,
    errorText: string,
  };
}

export interface IWSUpdateRoomResponse {
  type: EMessagesTypes.UPDATE_ROOM,
  data: IRoom[],
}

export interface IWSCreateGameResponse {
  type: EMessagesTypes.CREATE_GAME;
  data: { idGame: string, idPlayer: string };
}

export interface IWSStartGameResponse {
  type: EMessagesTypes.START_GAME;
  data: {
    ships: IShip[],
    currentPlayerIndex: string,
  };
}

export interface IWSTurnResponse {
  type: EMessagesTypes.TURN;
  data: {
    currentPlayer: string,
  };
}

export interface IWSAttackResponse {
  type: EMessagesTypes.ATTACK,
  data: {
    position: IPosition,
    currentPlayer: string,
    status: EAttackStatus,
  },
}

export interface IWSFinishGameResponse {
  type: EMessagesTypes.FINISH_GAME,
  data: {
    winPlayer: string,
  },
}

export interface IWSUpdateWinnersResponse {
  type: EMessagesTypes.UPDATE_WINNERS,
  data: Array<{ name: string, wins: number }>,
}

export type TWSResponse =
  | IWSRegResponse
  | IWSUpdateRoomResponse
  | IWSCreateGameResponse
  | IWSStartGameResponse
  | IWSTurnResponse
  | IWSAttackResponse
  | IWSFinishGameResponse
  | IWSUpdateWinnersResponse;

export interface IWSWithUser extends WebSocket {
  user?: IUser;
}

export interface IField extends IPosition {
  isShoot: boolean,
}

export interface IPlayer extends Omit<IWSAddShipsRequest['data'], 'ships'> {
  client: IWSWithUser,
  ships?: Array<IShipWithStatus[]>,
  isTurn: boolean,
  field: IField[]
}
