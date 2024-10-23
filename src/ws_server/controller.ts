import { WebSocket } from "ws";
import { reg } from './handlers/reg';
import { EMessagesTypes, TWSMessage } from "./models";

export const controller = async (ws: WebSocket, { type, data }: TWSMessage) => {
  switch (type) {
    case EMessagesTypes.REG:
      try {
        await reg(ws, data);
      } catch (e) {
        console.log(e);
      }
      break;
    default:
      console.log('Unknown request type:', type);
  }
};
