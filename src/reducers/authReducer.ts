export const authInitialState = {
  user: {
    displayName: "John Doe",
    photoURL: "",
    email: "johndoe@withinpixels.com",
    id: 0,
  },
  login: {
    success: false,
    errors: [],
  },
  logout: {
    success: false,
    errors: [],
  },
  register: {
    success: false,
    errors: [],
  },
};

export type UserItem = {
  displayName: string;
  photoURL: string;
  email: string;
  id?: number | string;
};

export type LoginItem = {
  success: boolean;
  error?: any[];
};

export type LogoutItem = {
  success: boolean;
  error?: any[];
};

export type RegisterItem = {
  success: boolean;
  error?: any[];
};

export type userStateType = {
  user: UserItem;
};

export type loginStateType = {
  login: LoginItem;
};

export type logoutStateType = {
  login: LoginItem;
};

export type registerStateType = {
  register: RegisterItem;
};


export const actionType = {
  chageLogin: "CHANGE_LOGIN_DETAILS",
  chageLogout: "CHANGE_LOGOUT_DETAILS",
  chageUser: "CHANGE_USER_DETAILS",
  chageRegister: "CHANGE_REGISTER_DETAILS",
};

export type userActionType = {
  type: "CHANGE_USER_DETAILS";
  payload: UserItem;
};

export type loginActionType = {
  type: "CHANGE_LOGIN_DETAILS";
  payload: LoginItem;
};

export type logoutActionType = {
  type: "CHANGE_LOGOUT_DETAILS";
  payload: LogoutItem;
};

export type registerActionType = {
  type: "CHANGE_REGISTER_DETAILS";
  payload: RegisterItem;
};

export const authReducer: React.Reducer<userStateType, userActionType> = (
  state: userStateType,
  action: userActionType
) => {
  switch (action.type) {
    case actionType.chageLogin:
      return {
        ...state,
        login: action.payload,
      };

    case actionType.chageLogout:
      return {
        ...state,
        logout: action.payload,
      };

    case actionType.chageUser:
      return {
        ...state,
        user: action.payload,
      };

    case actionType.chageRegister:
      return {
        ...state,
        register: action.payload,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
