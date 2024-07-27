export function exclude<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  // @ts-expect-error etc
  return Object.fromEntries(
    // @ts-expect-error etc
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  );
}
