export const isEmpty = (data: any) => {
  if (typeof data === 'string' || typeof data === 'object') {
    if (data) {
      if (data.trim().length === 0) {
        return false;
      }
    }
  }
  return true;
};