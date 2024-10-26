export const transformMessage = {
  parse(message: string) {
    const data = JSON.parse(message);
    return {
      ...data,
      data: data.data ? JSON.parse(data.data) : data.data,
    };
  },
  stringify(message: Record<string, unknown>, data: unknown) {
    return JSON.stringify({ ...message, data: JSON.stringify(data) });
  },
};
