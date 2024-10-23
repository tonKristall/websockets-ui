export const transformMessage = {
  parse(message: string) {
    const data = JSON.parse(message);
    return {
      ...data,
      data: JSON.parse(data.data),
    }
  },
  stringify(message: Record<string, unknown>, data: Record<string, unknown>) {
    return JSON.stringify({ ...message, data: JSON.stringify(data) })
  }
}
