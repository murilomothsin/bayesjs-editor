import { combineReducers } from 'redux';
import network from './network';
import nodes from './nodes';
import positions from './positions';
import arrows from './arrows';
import descriptions from './descriptions';
import undoable from 'redux-undo';

const rootReducer = combineReducers({
  network,
  descriptions,
  nodes: (state = []) => [],
  positions: (state = []) => [],
});

export default rootReducer;
