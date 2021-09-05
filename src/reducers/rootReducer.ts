import {
  authInitialState,
  authReducer,
  loginActionType,
  registerActionType,
  userActionType,
} from "./authReducer";
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
  | cartActionType
  | userActionType
  | loginActionType
  | registerActionType;

export const initialState = {
  layout: layoutInitialState,
  product: productDetailsInitialState,
  cart: cartInitialState,
  auth: authInitialState,
};

export const rootReducer = combineReducers({
  layout: layoutReducer,
  product: productDetailsReducer,
  cart: cartReducer,
  auth: authReducer,
});
