import { WebSocketServer } from 'ws';
import { generateId } from './utils/generateId.js';

export const wss = new WebSocketServer({ port: 3000, id: generateId() });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log(data);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

wss.on('listening', () => {
  console.log(`WebSocket ${wss.options.id} server started on port ${wss.options.port}`);
});
