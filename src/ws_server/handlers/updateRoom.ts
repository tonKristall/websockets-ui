import { EMessagesTypes, IWSUpdateRoomResponse } from '../models';
import { transformMessage } from '../utils/transformMessage';
import { getRooms } from '../../db/rooms/db';
import { clients } from '../store';

export const updateRoom = async () => {
  const rooms = await getRooms();
  const message = transformMessage.stringify<IWSUpdateRoomResponse>(
    { type: EMessagesTypes.UPDATE_ROOM },
    Object.values(rooms),
  );
  clients.forEach((client) => {
    client.send(message);
  });
};
