import { WebSocketServer } from 'ws';
import { controller } from './controller';
import { transformMessage } from './utils/transformMessage';
import { IWSRegRequest, IWSWithUser } from './models';
import { clients } from './store';

export const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws: IWSWithUser) => {
  clients.add(ws);

  ws.on('message', async (message: string) => {
    try {
      const data: IWSRegRequest = transformMessage.parse(message);
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
