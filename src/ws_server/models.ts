export enum EMessagesTypes {
  REG = 'reg',
  UPDATE_ROOM = 'update_room',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
}

export interface IWSRegMessage {
  type: EMessagesTypes.REG;
  data: { name: string, password: string };
}

export interface IWSCreateRoomMessage {
  type: EMessagesTypes.CREATE_ROOM;
  data: "";
}

export interface IWSAddUserToRoomMessage {
  type: EMessagesTypes.ADD_USER_TO_ROOM;
  data: { indexRoom: string };
}

export type TWSMessage = IWSRegMessage | IWSCreateRoomMessage | IWSAddUserToRoomMessage;
