import { IField } from '../models';

const MAX_X = 10;
const MAX_Y = 10;

export const initField = (): IField[] => {
  const field: IField[] = [];
  for (let i = 0; i < MAX_X; i++) {
    for (let j = 0; j < MAX_Y; j++) {
      field.push({ x: i, y: j, isShoot: false });
    }
  }
  return field;
};
