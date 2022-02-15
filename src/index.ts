import { isPlainObject, typeOf } from '@iazlabs/utilities';
import {
  cloneArrayBuffer,
  cloneBuffer,
  cloneRegExp,
  cloneSymbol,
  cloneTypedArray,
} from './internals';

const cloneObjectDeep = (value: any, clonefunc?: Function) => {
  if (typeof clonefunc === 'function') {
    return clonefunc(value);
  }
  if (clonefunc || isPlainObject(value)) {
    const res = new value.constructor();
    for (let key in value) {
      res[key] = cloneDeep(value[key], clonefunc);
    }
    return res;
  }
  return value;
};

const cloneArrayDeep = (value: any, clonefunc?: Function) => {
  const res = new value.constructor(value.length);
  for (let i = 0; i < value.length; i++) {
    res[i] = cloneDeep(value[i], clonefunc);
  }
  return res;
};

export const clone = (value: any) => {
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

export const cloneDeep = <T>(value: T, clonefunc?: Function) => {
  switch (typeOf(value)) {
    case 'object':
      return cloneObjectDeep(value, clonefunc) as T;
    case 'array':
      return cloneArrayDeep(value, clonefunc) as T;
    default: {
      return clone(value) as T;
    }
  }
};
