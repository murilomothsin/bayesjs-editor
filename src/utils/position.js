import { isUndefined } from 'lodash';
import { isSubnetwork } from './index';

const getSumHeight = (node, sumHeight) => {
  if (isUndefined(sumHeight)) {
    const isSub = isSubnetwork(node);

    return isSub ? 18 : 0;
  }

  return sumHeight;
};

export const calcNodeStatesHeight = states =>
  18 * states.length;

export const calcNodeHeight = (states = [], sumHeight = 0) =>
  25 + sumHeight + calcNodeStatesHeight(states);

export const calcNodeWidth = () =>
  160;

export const calcNodeWidthHeight = (node, sumHeight) => {
  const sum = getSumHeight(node, sumHeight);
  const height = calcNodeHeight(node.states, sum);
  const width = calcNodeWidth(node);

  return {
    height,
    width,
  };
};
