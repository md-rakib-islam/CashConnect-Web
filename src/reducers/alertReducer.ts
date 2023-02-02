const CHANGE_ALERT = "CHANGE_ALERT";

export const alertInitialState = {
  alertValue: "nothing to say",
  alerType: "",
  alertShow: false,
  alertChanged: 0,
};

const alertSuccessType = "success";
const alertWarningType = "warning";
const alertErrorType = "error";
const alertSignUpErrorType = "signupError";
const alertSuccessLoginType = "successLogin";

export type AlertValueType = {
  alertValue?: string;
  alerType?:
    | typeof alertSuccessType
    | typeof alertWarningType
    | typeof alertErrorType
    | typeof alertSignUpErrorType
    | typeof alertSuccessLoginType;
  alertChanged?: number;
  alertShow?: boolean;
};

export type alertStateType = AlertValueType;

export type alertActionType = {
  type: typeof CHANGE_ALERT;
  payload: AlertValueType;
};

export const alertReducer: React.Reducer<alertStateType, alertActionType> = (
  state: alertStateType,
  action: alertActionType
) => {
  switch (action.type) {
    case CHANGE_ALERT:
      let alertValueState = state.alertValue;
      let alertTypeState = state.alerType;
      let alertChangedState = state.alertChanged;
      let alertShowState = state.alertShow;

      let alertpayload = action.payload;

      return {
        alertValue: alertpayload.alertValue || alertValueState,
        alerType: alertpayload.alerType,

        alertChanged: Math.random(),
        alertShow:
          alertpayload.alertShow == undefined
            ? true
            : alertpayload.alerType && alertpayload.alertShow
            ? true
            : false,
      };

    default: {
      return {
        alertValue: alertValueState,
        alerType: alertTypeState,
        alertChanged: alertChangedState,
        alertShow: alertShowState,
      };
    }
  }
};
