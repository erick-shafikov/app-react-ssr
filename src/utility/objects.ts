export type StrObj = Record<string, unknown>;

export type FlattenObjectKeys<
  T extends StrObj,
  OnlyInner extends boolean = false,
  K = keyof T
> = K extends string
  ? T[K] extends StrObj
    ? OnlyInner extends true
      ? `${K}.${FlattenObjectKeys<T[K], OnlyInner>}`
      : `${K}.${FlattenObjectKeys<T[K], OnlyInner>}` | `${K}`
    : `${K}`
  : never;

export type GetByDotKey<
  T extends StrObj,
  K extends string
> = K extends `${infer R1}.${infer R2}`
  ? T[R1] extends StrObj
    ? GetByDotKey<T[R1], R2>
    : never
  : K extends keyof T
  ? T[K]
  : never;

export function getByDotKey<T extends StrObj, K extends FlattenObjectKeys<T>>(
  obj: T,
  key: K
): GetByDotKey<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return key.split(".").reduce((t: any, k) => {
    if (t[k] === undefined) {
      throw new Error("dotted key is wrong");
    }

    return t[k];
  }, obj);
}

export function runFnWithTuple<T extends (...args: unknown[]) => unknown>(
  fn: T,
  params: Parameters<T>
): ReturnType<T> {
  return fn(...params) as ReturnType<T>;
}
