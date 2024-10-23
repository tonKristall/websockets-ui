import { WebSocket } from "ws";
import { IWSRegMessage } from "../models";
import { addUser, getUser } from "../../db/db";
import { generateId } from "../utils/generateId";
import { transformMessage } from "../utils/transformMessage";

export const reg = async (ws: WebSocket, data: IWSRegMessage['data']) => {
  const user = await getUser(data.name);
  if (user) {
    const isError = user.password !== data.password;
    const answer = transformMessage.stringify(
      { type: 'reg', id: 0 },
      {
        name: user.name,
        index: user.index,
        error: isError,
        errorText: isError ? 'Wrong password' : '',
      })
    ws.send(answer);
    console.log(isError ? `Wrong password for user ${data.name}: ${data.password}` : `User ${data.name} is authorized`)
  } else {
    const index = generateId();
    const newUser = {
      index,
      name: data.name,
      password: data.password
    }
    await addUser(newUser);
    const answer = transformMessage.stringify(
      { type: 'reg', id: 0 },
      {
        name: newUser.name,
        index: newUser.index,
        error: false,
        errorText: '',
      })
    ws.send(answer);
    console.log(`Registration new user ${newUser.index}`)
  }
};
