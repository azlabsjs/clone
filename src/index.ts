import { isPlainObject, typeOf } from '@azlabsjs/utilities';
import {
  cloneArrayBuffer,
  cloneBuffer,
  cloneRegExp,
  cloneSymbol,
  cloneTypedArray,
  UnknownType,
} from './internals';

const cloneObjectDeep = <T>(value: T, clonefunc?: (value: T) => T) => {
  if (typeof clonefunc === 'function') {
    return clonefunc(value);
  }
  if (clonefunc || isPlainObject(value)) {
    const res = new (value as UnknownType).constructor();
    for (const key in value) {
      res[key] = cloneDeep(value[key], clonefunc);
    }
    return res;
  }
  return value;
};

const cloneArrayDeep = <T extends UnknownType[]>(
  value: T,
  clonefunc?: (value: T) => T
) => {
  const res = new (value as UnknownType).constructor(value.length);
  for (let i = 0; i < value.length; i++) {
    res[i] = cloneDeep(value[i], clonefunc);
  }
  return res;
};

export const clone = (value: UnknownType) => {
  switch (typeOf(value)) {
    case 'array':
      return value.slice();
    case 'object':
      return { ...value };
    case 'date':
      return new value.constructor(Number(value));
    case 'map':
      return new Map(value);
    case 'set':
      return new Set(value);
    case 'buffer':
      return cloneBuffer(value);
    case 'symbol':
      return cloneSymbol(value);
    case 'arraybuffer':
      return cloneArrayBuffer(value);
    case 'float32array':
    case 'float64array':
    case 'int16array':
    case 'int32array':
    case 'int8array':
    case 'uint16array':
    case 'uint32array':
    case 'uint8clampedarray':
    case 'uint8array':
      return cloneTypedArray(value);
    case 'regexp':
      return cloneRegExp(value);
    case 'error':
      return Object.create(value);
    default: {
      return value;
    }
  }
};

export function cloneDeep<T>(value: T, clonefunc?: (value: T) => T): T {
  switch (typeOf(value)) {
    case 'object':
      return cloneObjectDeep(value, clonefunc);
    case 'array':
      return cloneArrayDeep(value as UnknownType, clonefunc);
    default: {
      return clone(value);
    }
  }
}
