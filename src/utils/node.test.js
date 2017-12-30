import {
  isSubnetwork
} from './node';

test('isSubnetwork should return true', () => {
  expect(isSubnetwork({
    kind: 'BN',
  })).toBe(true)
});

test('isSubnetwork should return false', () => {
  expect(isSubnetwork({
    id: 'node-id',
    states: ['T', 'F'],
    parents: [],
    cpt: {
      T: 0.5,
      F: 0.5,
    }
  })).toBe(false)
});