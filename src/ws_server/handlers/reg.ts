import { WebSocket } from 'ws';
import { EMessagesTypes, IWSRegRequest, IWSRegResponse } from '../models';
import { addUser, getUser } from '../../db/users/db';
import { generateId } from '../utils/generateId';
import { transformMessage } from '../utils/transformMessage';
import { IUser } from '../../db/users/types';
import { addWinner } from '../../db/winners/db';

export const reg = async (ws: WebSocket, data: IWSRegRequest['data']) => {
  const user = await getUser(data.name);
  if (user) {
    const isError = user.password !== data.password;
    const answer = transformMessage.stringify<IWSRegResponse>(
      { type: EMessagesTypes.REG },
      {
        name: user.name,
        index: user.index,
        error: isError,
        errorText: isError ? 'Wrong password' : '',
      });
    ws.send(answer);
    console.log('reg: ' + (isError ? `wrong password for user ${data.name}: ${data.password}` : `user ${data.name} is authorized`));
    return isError ? null : user;
  } else {
    const index = generateId();
    const newUser: IUser = {
      index,
      name: data.name,
      password: data.password,
    };
    await addUser(newUser);
    await addWinner(newUser.name);
    const answer = transformMessage.stringify<IWSRegResponse>(
      { type: EMessagesTypes.REG },
      {
        name: newUser.name,
        index: newUser.index,
        error: false,
        errorText: '',
      });
    ws.send(answer);
    console.log(`${EMessagesTypes.REG}: registration new user ${newUser.index}`);
    return newUser;
  }
};
