import { WebSocketServer } from 'ws';
import { controller } from './controller';
import { transformMessage } from "./utils/transformMessage";
import { IWSRegMessage, IWSWithUser } from "./models";

export const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws: IWSWithUser) => {
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
    console.log('Client disconnected');
  });
});

wss.on('listening', () => {
  console.log(`WebSocket server started on port ${wss.options.port}`);
});
