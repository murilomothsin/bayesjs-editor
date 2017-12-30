import { isSubnetwork } from './index'
import { isUndefined } from 'lodash'

const getSumHeight = (node, sumHeight) => {
  if (isUndefined(sumHeight)) {
    const isSub = isSubnetwork(node)
    
    return isSub ? 18 : 0
  }

  return sumHeight;
}

export const calcNodeHeight = (states = [], sumHeight = 0) => 
  25 + sumHeight + calcNodeStatesHeight(states)

export const calcNodeStatesHeight = (states, sumHeight = 0) => 
  18 * states.length

export const calcNodeWidth = node => 
  160

export const calcNodeWidthHeight = (node, sumHeight) => {
  const sum = getSumHeight(node, sumHeight)
  const height = calcNodeHeight(node.states, sum);
  const width = calcNodeWidth(node);

  return {
    height,
    width,
  }
}