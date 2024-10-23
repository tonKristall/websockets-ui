export enum EMessagesTypes {
  REG = 'reg',
}

export interface IWSRegMessage {
  type: EMessagesTypes.REG;
  data: { name: string, password: string };
}

export type TWSMessage = IWSRegMessage
