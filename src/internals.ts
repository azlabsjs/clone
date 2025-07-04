const valueOf = Symbol.prototype.valueOf;

/** @internal */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownType = any;

/** @internal */
type WithImplicitCoercion<T> =
  | T
  | { valueOf(): T }
  | (T extends string ? { [Symbol.toPrimitive](hint: 'string'): T } : never);

export const cloneRegExp = (regexp: UnknownType) => {
  /** Used to match `RegExp` flags from their coerced string values. */
  const reFlags = /\w*$/;
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
};

export const cloneArrayBuffer = (arrayBuffer: ArrayBuffer) => {
  const constructor = arrayBuffer.constructor as UnknownType;
  const result = new constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
};

export const cloneTypedArray = (value: UnknownType) => {
  return new value.constructor(value.buffer, value.byteOffset, value.length);
};

export const cloneBuffer = (value: Buffer) => {
  const len = value.length;
  const buf = Buffer.allocUnsafe
    ? Buffer.allocUnsafe(len)
    : Buffer.from(
        value as unknown as WithImplicitCoercion<ArrayBufferLike>,
        undefined,
        len
      );
  value.copy(buf);
  return buf;
};

export const cloneSymbol = (value: symbol) => {
  return valueOf ? Object(valueOf.call(value)) : {};
};
