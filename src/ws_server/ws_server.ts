import { WebSocketServer } from 'ws';
import { controller } from './controller';
import { transformMessage } from "./utils/transformMessage";
import { EMessagesTypes, IWSRegMessage, IWSWithUser } from "./models";
import { IUser } from "../db/users/types";
import { clients } from "./store";

export const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws: IWSWithUser) => {
  clients.add(ws);

  ws.on('message', async (message: string) => {
    try {
      const data: IWSRegMessage = transformMessage.parse(message);
      await controller(ws, data);
    } catch (e) {
      console.error(message.toString());
      console.error(e);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

wss.on('listening', () => {
  console.log(`WebSocket server started on port ${wss.options.port}`);
});

wss.on(EMessagesTypes.CREATE_GAME, (clients: [IUser, IUser]) => {
  console.log('create game');
})
