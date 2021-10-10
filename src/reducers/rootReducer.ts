import { alertActionType, alertInitialState, alertReducer } from "./alertReducer";
import {
  authInitialState,
  authReducer,
  loginActionType,
  registerActionType,
  userActionType
} from "./authReducer";
import { cartActionType, cartInitialState, cartReducer } from "./cartReducer";
import combineReducers from "./combineReducers";
import {
  branchActionType,
  citiesActionType,
  countryActionType,
  customer_typeActionType,
  dataInitialState,
  dataReducer,
  rolesActionType,
  thanasActionType
} from "./dataReducer";
import {
  layoutActionType,
  layoutInitialState,
  layoutReducer
} from "./layoutReducer";





// import {
//   productDetailsActionType,
//   productDetailsInitialState,
//   productDetailsReducer,
//   productListActionType,
// } from "./productReducer";

export type rootActionType =
  | layoutActionType
  // | productDetailsActionType
  // | productListActionType
  | cartActionType
  | userActionType
  | loginActionType
  | registerActionType
  | rolesActionType
  | thanasActionType
  | citiesActionType
  | countryActionType
  | branchActionType
  | customer_typeActionType
  | alertActionType

export const initialState = {
  layout: layoutInitialState,
  // product: productDetailsInitialState,
  cart: cartInitialState,
  auth: authInitialState,
  data: dataInitialState,
  alert: alertInitialState,
};

export const rootReducer = combineReducers({
  layout: layoutReducer,
  // product: productDetailsReducer,
  cart: cartReducer,
  auth: authReducer,
  data: dataReducer,
  alert: alertReducer,
});
