
const CHANGE_ALERT = "CHANGE_ALERT";

export const alertInitialState = {
  alertValue: "nothing to say",
  alerType: "success",
  alertShow: false,
  alertChanged: 0
};

const alertSuccessType = "success"
const alertWarningType = "warning"
const alertErrorType = "error"

export type AlertValueType = {
    alertValue?: string;
    alerType?: typeof alertSuccessType | typeof alertWarningType | typeof alertErrorType;
    alertChanged: number;
    alertShow: boolean;
};

export type alertStateType = AlertValueType

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
        alerType: alertpayload.alerType || alertTypeState,
        alertChanged: alertpayload.alertChanged,
        alertShow: alertpayload.alertShow,
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
