import { cartActionType, cartInitialState, cartReducer } from "./cartReducer";
import combineReducers from "./combineReducers";
import {
  layoutActionType,
  layoutInitialState,
  layoutReducer,
} from "./layoutReducer";
import {
  productDetailsActionType,
  productDetailsInitialState,
  productDetailsReducer,
  productListActionType,
} from "./productReducer";

export type rootActionType =
  | layoutActionType
  | productDetailsActionType
  | productListActionType
  | cartActionType;

export const initialState = {
  layout: layoutInitialState,
  product: productDetailsInitialState,
  cart: cartInitialState,
};

export const rootReducer = combineReducers({
  layout: layoutReducer,
  product: productDetailsReducer,
  cart: cartReducer,
});
