import { 
  CHANGE_NODE_DESCRIPTION,
} from "../actions/index";

const INITAL_STATE = {}

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_NODE_DESCRIPTION:
      const { id, description } = action.payload

      return {
        ...state,
        [id]: description
      };
    default:
      return state;
  }
};