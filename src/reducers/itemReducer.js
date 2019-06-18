import { FETCH_ITEMS, ADD_ITEM } from "./../types";
const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        items: action.items
      };
    case ADD_ITEM:
      return {
        ...state,
        items: action.items
      };
    default:
      return state;
  }
}
