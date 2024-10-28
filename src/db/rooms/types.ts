export interface IRoomUser {
  name: string;
  index: string;
}

export interface IRoom {
  roomId: string;
  roomUsers: IRoomUser[];
}

export type TRoomList = Record<string, IRoom>
