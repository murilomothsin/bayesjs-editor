export const calcNodeHeight = (states = [], sumHeight = 0) => 
  25 + sumHeight + calcNodeStatesHeight(states)

export const calcNodeStatesHeight = (states, sumHeight = 0) => 
  18 * states.length

export const calcNodeWidth = node => 
  160