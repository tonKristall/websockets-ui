import { getWinners } from '../../db/winners/db';
import { EMessagesTypes } from '../models';
import { transformMessage } from '../utils/transformMessage';
import { clients } from '../store';

export const updateWinners = async () => {
  const winners = await getWinners();
  const response = transformMessage.stringify(
    { type: EMessagesTypes.UPDATE_WINNERS },
    winners,
  );
  console.log(winners);
  clients.forEach((client) => {
    client.send(response);
  });
};
