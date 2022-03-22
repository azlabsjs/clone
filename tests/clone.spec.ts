import { cloneDeep, clone } from '../src';

describe('clone utilities function', () => {
  it('should create a deep copy of the source object', () => {
    const source = {
      name: 'Azandrew',
      authorizations: new Set(['all', 'create-users', 'list-users']),
      address: {
        coord: new Map().set('lat', '3.458642').set('long', '1.6574822'),
      },
      emails: ['azandrewdevelopper@gmail.com'],
      typed: new Uint16Array(),
    };
    const copy = cloneDeep(source);
    copy.name = 'Adevou Fera EKPEH';
    copy.authorizations.clear();
    copy.address.coord.set('lat', '2.867429');
    copy.emails = ['azlabs@gmail.com'];
    expect(source.name).not.toEqual(copy.name);
    expect(Array.from(source.authorizations)).not.toEqual([]);
    expect(Array.from(copy.authorizations)).toEqual([]);
    expect(copy.emails).not.toEqual(source.emails);
  });

  it('clone() should returns create a decomposed copy of {lat: 3.08942, long: 1.8942}', () => {
    const object = { lat: 3.08942, long: 1.8942 };
    const reference = object;
    const value = clone(object);
    reference.lat = 3.068131;
    value.lat = 3.4267831;
    expect(reference).toEqual(object);
    expect(value).not.toEqual(object);
  });

  it('cloneDeep() should use the provided shallow clone function', () => {
    const object = {
      lat: 3.08942,
      long: 1.8942,
      address: {
        city: 'LOME',
        district: 'HN',
        country: 'TOGO',
      },
    };
    const value = cloneDeep(object, (value: Object) => {
      return { ...value };
    });
    value.lat = 3.89018;
    value.address.city = 'ACCRA';
    value.address.country = 'GHANA';
    expect(value.lat).not.toEqual(object.lat);
    expect(value.address.city).toEqual(object.address.city);
  });
});
