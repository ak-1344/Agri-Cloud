export const generateRandomId = (prefix: string) => {
  return `${prefix}-${Math.random().toString(36).substring(2, 10)}`;
};

export const validateFields = (fields: Record<string, any>): string[] => {
  const missing = Object.keys(fields).filter(key => !fields[key]);
  return missing;
};
