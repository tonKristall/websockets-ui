import { WebSocket } from 'ws';
import { IUser } from '../db/users/types';

export enum EMessagesTypes {
  REG = 'reg',
  UPDATE_ROOM = 'update_room',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  CREATE_GAME = 'create_game',
  ADD_SHIPS = 'add_ships',
  START_GAME = 'start_game',
  TURN = 'turn',
}

export interface IShip {
  position: {
    x: number,
    y: number,
  },
  direction: boolean,
  length: number,
  type: 'small' | 'medium' | 'large' | 'huge',
}

export interface IWSRegMessage {
  type: EMessagesTypes.REG;
  data: { name: string, password: string };
}

export interface IWSCreateRoomMessage {
  type: EMessagesTypes.CREATE_ROOM;
  data: '';
}

export interface IWSAddUserToRoomMessage {
  type: EMessagesTypes.ADD_USER_TO_ROOM;
  data: { indexRoom: string };
}

export interface IWSCreateGameMessage {
  type: EMessagesTypes.CREATE_GAME;
  data: { idGame: string, idPlayer: string };
}

export interface IWSAddShipsMessage {
  type: EMessagesTypes.ADD_SHIPS;
  data: {
    gameId: string,
    ships: IShip[],
    indexPlayer: string,
  };
}

export interface IWSStartGameMessage {
  type: EMessagesTypes.START_GAME;
  data: {
    ships: IShip[],
    currentPlayerIndex: string,
  };
}

export interface IWSTurnMessage {
  type: EMessagesTypes.TURN;
  data: {
    currentPlayer: string,
  };
}

export type TWSMessage =
  | IWSRegMessage
  | IWSCreateRoomMessage
  | IWSAddUserToRoomMessage
  | IWSCreateGameMessage
  | IWSAddShipsMessage
  | IWSStartGameMessage;

export interface IWSWithUser extends WebSocket {
  user?: IUser;
  ships?: IShip[] | null;
}

export interface IPlayer {
  client: IWSWithUser,
  player: Omit<IWSAddShipsMessage['data'], 'ships'> & { ships?: IShip[], isTurn: boolean };
}
