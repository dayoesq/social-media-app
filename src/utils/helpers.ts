export const isEmpty = (data: string) => {
  if (typeof data === 'string') {
    if (data.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  }
  throw new Error('Expected parameter type must be a string');
};