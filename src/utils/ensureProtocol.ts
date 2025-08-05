// utils/ensureProtocol.ts
export const ensureProtocol = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;
