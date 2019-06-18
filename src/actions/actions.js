import { FETCH_ITEMS, ADD_ITEM } from "../types";

export const fetchOldItems = () => dispatch => {
  dispatch({
    type: FETCH_ITEMS,
    items: [
      { id: 0, name: "this is old", isDone: true },
      { id: 1, name: "this is older", isDone: false }
    ]
  });
};

export const addItem = data => dispatch => {
  dispatch({
    type: ADD_ITEM,
    items: data
  });
};
