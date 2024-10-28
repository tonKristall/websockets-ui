import { TWSResponse } from '../models';

export const transformMessage = {
  parse(message: string) {
    const data = JSON.parse(message);
    return {
      ...data,
      data: data.data ? JSON.parse(data.data) : data.data,
    };
  },
  stringify<T extends TWSResponse>(message: Omit<T, 'data'>, data: T['data']) {
    return JSON.stringify({ ...message, data: JSON.stringify(data), id: 0 });
  },
};
