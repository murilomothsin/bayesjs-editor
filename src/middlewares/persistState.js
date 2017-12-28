import { PERSIST_STATE } from '../actions';
import { getStateToSave } from '../selectors';
import { isUndefined } from 'lodash'

export const persistState = store => next => (action) => {
  if (action.type !== PERSIST_STATE) {
    return next(action);
  }

  const stateToSave = getStateToSave(store.getState());
  const serializedState = JSON.stringify(stateToSave);

  localStorage.setItem('state', serializedState);

  return undefined;
};

const migrateDescriptions = state => {
  const { network, descriptions } = state
  const { nodes } = network
  const currentDescriptions = descriptions || {}
  const filtredNodes = nodes
    .filter(({ description }) => !isUndefined(description))

  const mergedDescriptions = filtredNodes
    .reduce((acc, { id, description }) => ({
      ...acc,
      [id]: description
    }), currentDescriptions)

  for (const node of filtredNodes) {
    delete node.description
  }

  return {
    ...state,
    descriptions: mergedDescriptions
  }
}

const migrations = state => 
  [ migrateDescriptions ]
    .reduce((cState, migration) => migration(cState), state)

export const loadState = () => {
  const serializedState = localStorage.getItem('state');

  if (serializedState != null) {
    const state = JSON.parse(serializedState);

    if (state.version === 2) {
      // let { network, nodes, positions } = state

      // if (network.kind === undefined) network.kind = NETWORK_KINDS.BN;
      // if (network.id === undefined) network.id = v4();

      // if (nodes && positions) {
      //   return {
      //     ...network,
      //     nodes,
      //     positions
      //   };
      // }
    } else if (state.version < 2) {
      return undefined;
    }

    delete state.version;

    return migrations(state);
  }

  return undefined;
};
