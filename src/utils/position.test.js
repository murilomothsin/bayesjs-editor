import {
  calcNodeHeight,
  calcNodeStatesHeight,
  calcNodeWidth,
  calcNodeWidthHeight,
} from './position';

const createNode = (states) => ({
  id: 'node-id',
  states,
  parents: [],
})

test('calcNodeHeight should return 61', () => {
  const states = ['T', 'F']
  
  expect(calcNodeHeight(states)).toBe(61)
});

test('calcNodeHeight should return 79', () => {
  const states = ['T', 'F', 'O']
  
  expect(calcNodeHeight(states)).toBe(79)
});

test('calcNodeHeight should return 100', () => {
  const states = ['T', 'F', 'O']
  
  expect(calcNodeHeight(states, 21)).toBe(100)
});

test('calcNodeWidth should return 160', () => {
  expect(calcNodeWidth()).toBe(160)
});

test('calcNodeStatesHeight should return 36', () => {
  const states = ['T', 'F']
  
  expect(calcNodeStatesHeight(states)).toBe(36)
});

test('calcNodeStatesHeight should return 72', () => {
  const states = ['T', 'F', 'O', 'A']
  
  expect(calcNodeStatesHeight(states)).toBe(72)
});

test('calcNodeWidthHeight should return { height: 61, width: 160 }', () => {
  const states = ['T', 'F']
  const node = createNode(states)
  
  expect(calcNodeWidthHeight(node)).toEqual({
    height: 61,
    width: 160,
  })
});

test('calcNodeWidthHeight should return { height: 97, width: 160 }', () => {
  const states = ['T', 'F', 'O', 'A']
  const node = createNode(states)
  
  expect(calcNodeWidthHeight(node)).toEqual({
    height: 97,
    width: 160,
  })
});