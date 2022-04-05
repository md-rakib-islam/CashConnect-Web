import { alertActionType, alertInitialState, alertReducer } from "./alertReducer";

import { cartActionType, cartInitialState, cartReducer } from "./cartReducer";
import combineReducers from "./combineReducers";
import {
  layoutActionType,
  layoutInitialState,
  layoutReducer
} from "./layoutReducer";


export type rootActionType =
  | layoutActionType
  | cartActionType
  | alertActionType

export const initialState = {
  layout: layoutInitialState,
  cart: cartInitialState,
  alert: alertInitialState,
};

export const rootReducer = combineReducers({
  layout: layoutReducer,
  cart: cartReducer,
  alert: alertReducer,
});
