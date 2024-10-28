import { readFile, writeFile } from 'fs/promises';
import { IWinner } from './types';

const filePath = './src/db/winners/data.json';

export const getWinners = async (): Promise<IWinner[]> => {
  try {
    const data = await readFile(filePath, 'utf-8');
    return (JSON.parse(data) || []) as IWinner[];
  } catch (error) {
    return [];
  }
};

export const addWinner = async (name: string): Promise<void> => {
  try {
    const winners = await getWinners();
    const winner = winners.find((user) => user.name === name);
    if (winner) {
      winner.wins += 1;
    } else {
      winners.push({ name, wins: 0 });
    }
    await writeFile(filePath, JSON.stringify(winners, null, 2));
  } catch (err) {
  }
};
