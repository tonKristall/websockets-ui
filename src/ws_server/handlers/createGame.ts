import { EMessagesTypes } from "../models";
import { generateId } from "../utils/generateId";
import { IRoomUser } from "../../db/rooms/types";
import { clients } from "../store";
import { transformMessage } from "../utils/transformMessage";

export const createGame = async (user1: IRoomUser, user2: IRoomUser) => {
  const idGame = generateId();
  clients.forEach((client) => {
    if (client.user?.index === user1.index || client.user?.index === user2.index) {
      const idPlayer = generateId();
      const message = transformMessage.stringify(
        { type: EMessagesTypes.CREATE_GAME, id: 0 },
        { idGame, idPlayer }
      );
      client.send(message)
    }
  });
};
