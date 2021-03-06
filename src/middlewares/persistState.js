import { PERSIST_STATE } from '../actions';
import { getStateToSave } from '../selectors';

export const persistState = store => next => action => {
  if (action.type !== PERSIST_STATE) {
    return next(action);
  }

  const stateToSave = getStateToSave(store.getState());
  const serializedState = JSON.stringify(stateToSave);

  localStorage.setItem('state', serializedState);

  return undefined;
};

export const loadState = () => {
  const serializedState = localStorage.getItem('state');

  if (serializedState != null) {
    const state = JSON.parse(serializedState);

    if (state.version !== 2) {
      return undefined;
    }

    delete state.version;

    return state;
  }

  return undefined;
};
