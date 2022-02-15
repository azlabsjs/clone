const valueOf = Symbol.prototype.valueOf;

export const cloneRegExp = (regexp: any) => {
  /** Used to match `RegExp` flags from their coerced string values. */
  const reFlags = /\w*$/;
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
};

export const cloneArrayBuffer = (arrayBuffer: ArrayBuffer) => {
  const constructor = arrayBuffer.constructor as any;
  const result = new constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
};

export const cloneTypedArray = (value: any) => {
  return new value.constructor(value.buffer, value.byteOffset, value.length);
};

export const cloneBuffer = (value: Buffer) => {
  const len = value.length;
  const buf = Buffer.allocUnsafe
    ? Buffer.allocUnsafe(len)
    : Buffer.from(value, undefined, len);
  value.copy(buf);
  return buf;
};

export const cloneSymbol = (value: Symbol) => {
  return valueOf ? Object(valueOf.call(value)) : {};
};
