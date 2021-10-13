import { alertActionType, alertInitialState, alertReducer } from "./alertReducer";
import {
  authInitialState,
  authReducer,
  loginActionType,
  logoutActionType,
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


export type rootActionType =
  | layoutActionType
  | cartActionType
  | userActionType
  | loginActionType
  | logoutActionType
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
  cart: cartInitialState,
  auth: authInitialState,
  data: dataInitialState,
  alert: alertInitialState,
};

export const rootReducer = combineReducers({
  layout: layoutReducer,
  cart: cartReducer,
  auth: authReducer,
  data: dataReducer,
  alert: alertReducer,
});
