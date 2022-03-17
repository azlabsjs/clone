# CLONE

Utility functions for creating a deep and shallow copy of javascript variables.

# EXAMPLE USAGE

## Create a deep copy of the source object

```ts
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
```

## clone()

> Create a decomposed copy of {lat: 3.08942, long: 1.8942}

```ts
const object = { lat: 3.08942, long: 1.8942 };
const reference = object;
const value = clone(object);
reference.lat = 3.068131;
value.lat = 3.4267831;
```

## cloneDeep()

> use the provided shallow clone function

```ts
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
```
