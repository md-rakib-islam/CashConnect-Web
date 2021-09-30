export const dataInitialState = {
  roles: [],
  thanas: [],
  cities: [],
  country: [],
  branch: [],
  customer_type: [],
};

export type RolesItem = any[];

export type ThanasItem = any[];

export type CitiesItem = any[];

export type CountryItem = any[];

export type BranchItem = any[];

export type Customer_typeItem = any[];

export type rolesStateType = {
  roles: RolesItem;
};

export type thanasStateType = {
  thanas: ThanasItem;
};

export type citiesStateType = {
  cities: CitiesItem;
};

export type countryStateType = {
  cities: CountryItem;
};

export type branchStateType = {
  cities: BranchItem;
};

export type customer_typeStateType = {
  cities: Customer_typeItem;
};

export const actionType = {
  setThanas: "SET_THANAS",
  setRoles: "SET_ROLES",
  setCities: "SET_CITIES",
  setCountry: "SET_COUNTRY",
  setBranch: "SET_BRANCH",
  setCustomer_type: "SET_CUSTOMER_TYPE",
};

export type rolesActionType = {
  type: "SET_ROLES";
  payload: RolesItem;
};

export type thanasActionType = {
  type: "SET_THANAS";
  payload: ThanasItem;
};

export type citiesActionType = {
  type: "SET_CITIES";
  payload: CitiesItem;
};

export type countryActionType = {
  type: "SET_COUNTRY";
  payload: CountryItem;
};

export type branchActionType = {
  type: "SET_BRANCH";
  payload: BranchItem;
};

export type customer_typeActionType = {
  type: "SET_CUSTOMER_TYPE";
  payload: Customer_typeItem;
};

export const dataReducer: React.Reducer<rolesStateType, rolesActionType> = (
  state: rolesStateType,
  action: rolesActionType
) => {
  switch (action.type) {
    case actionType.setThanas:
      return {
        ...state,
        thanas: action.payload,
      };

    case actionType.setRoles:
      return {
        ...state,
        roles: action.payload,
      };

    case actionType.setCities:
      return {
        ...state,
        cities: action.payload,
      };

    case actionType.setCountry:
      return {
        ...state,
        country: action.payload,
      };

    case actionType.setBranch:
      return {
        ...state,
        branch: action.payload,
      };

    case actionType.setCustomer_type:
      return {
        ...state,
        customer_type: action.payload,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
