export const isEmpty = (value: object = {}) => {
  return typeof value === 'object' && !Object.keys(value)?.length;
};
