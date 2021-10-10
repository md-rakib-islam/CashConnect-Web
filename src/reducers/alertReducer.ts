
const CHANGE_ALERT = "CHANGE_ALERT";

export const alertInitialState = {
  alertValue: "",
  alerType: "success",
  alertChanged: 0
};

const alertSuccessType = "success"
const alertWarningType = "warning"
const alertErrorType = "error"

export type AlertValueType = {
    alertValue: string;
    alerType: typeof alertSuccessType | typeof alertWarningType | typeof alertErrorType;
    alertChanged: number;
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

      let alertpayload = action.payload;

      setTimeout(() => {
        return {
          alertValue: "",
          alerType: alertTypeState,
          alertChanged: alertChangedState,
        };
      }, 3000);

      return {
        alertValue: alertpayload.alertValue,
        alerType: alertpayload.alerType,
        alertChanged: alertpayload.alertChanged
      };

    default: {
      return {
        alertValue: alertValueState,
        alerType: alertTypeState,
        alertChanged: alertChangedState,
      };
    }
  }
};
