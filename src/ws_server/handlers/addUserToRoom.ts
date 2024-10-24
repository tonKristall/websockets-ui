import { IRoom } from "../../db/rooms/types";
import { IUser } from "../../db/users/types";
import { addToRoom } from "../../db/rooms/db";

export const addUserToRoom = async (room: IRoom, user: IUser) => {
  await addToRoom(room.roomId, user);
}
