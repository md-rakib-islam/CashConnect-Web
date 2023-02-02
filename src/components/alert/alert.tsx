import Icon from "@component/icon/Icon";
import { useAppContext } from "@context/app/AppContext";
import useWindowSize from "@hook/useWindowSize";
import React, { useEffect, useState } from "react";

function Alert() {
  const [showAlert, setShowAlert] = useState(false);
  const { state, dispatch } = useAppContext();

  const success = state.alert.alerType === "success" || false;
  const successLogin = state.alert.alerType === "successLogin" || false;
  const warning = state.alert.alerType === "warning" || false;
  const error = state.alert.alerType === "error" || false;
  const signupError = state.alert.alerType === "signupError" || false;
  const AlertValue = state.alert.alertValue;

  const width = useWindowSize();
  const isMobile = width < 769;

  useEffect(() => {
    console.log("alertShow", state);
    if (state.alert.alertShow && state.alert.alerType) {
      setShowAlert(true);

      if (!showAlert) {
        setTimeout(() => {
          setShowAlert(false);
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertShow: false,
              alertChanged: Math.random(),
            },
          });
        }, 4000);
      }
    }
  }, [state.alert.alertChanged]);

  return (
    <>
      {!successLogin && (
        <div
          style={{
            position: "absolute",
            top: signupError ? "550px" : "78px",
            left: 0,
            width: isMobile ? "110%" : "100%",
            textAlign: "center",
            zIndex: showAlert ? 100 : -1,
            opacity: showAlert ? 1 : 0,
            display: showAlert
              ? "block"
              : state.alert.alerType === undefined
              ? "none"
              : "none",
            transitionProperty: "all",
            transitionDuration: "1s",
            transitionTimingFunction: "cubic-bezier(0.27, 0.24, 0, 1.03)",
            transitionDelay: "0s",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: state.alert.alerType === undefined ? "none" : "flex",

              alignItems: "center",
              background: success
                ? "rgb(195 237 208)"
                : warning
                ? "rgb(227 239 160)"
                : error
                ? "rgb(255 155 155)"
                : signupError
                ? "rgb(255 155 155)"
                : "",
              color: "black",
              padding: "2px 8px",
              borderRadius: "5px",
              width: "fit-content",
              fontWeight: 600,
              boxShadow: "2px 2px 5px #ababab",
            }}
          >
            <Icon
              size="15px"
              style={{
                cursor: "pointer",
                display: state.alert.alerType === undefined ? "none" : "block",
              }}
            >
              {success
                ? "success"
                : warning
                ? "warning"
                : error
                ? "danger"
                : signupError
                ? "danger"
                : ""}
            </Icon>
            <span
              style={{
                paddingRight: "5px",
                paddingLeft: "7px",
                display: state.alert.alerType === undefined ? "none" : "block",
              }}
            >
              {AlertValue}
            </span>
            <Icon
              size="15px"
              mt="1px"
              style={{
                cursor: "pointer",
                visibility:
                  state.alert.alerType === undefined ? "hidden" : "visible",
              }}
              onClick={() => setShowAlert(false)}
            >
              cancel
            </Icon>
          </div>
        </div>
      )}

      {successLogin && (
        <div
          style={{
            position: "absolute",
            top: "78px",
            left: 0,
            width: isMobile ? "110%" : "100%",
            textAlign: "center",
            zIndex: showAlert ? 100 : -1,
            opacity: showAlert ? 1 : 0,
            display: showAlert ? "block" : "none",
            transitionProperty: "all",
            transitionDuration: "1s",
            transitionTimingFunction: "cubic-bezier(0.27, 0.24, 0, 1.03)",
            transitionDelay: "0s",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#ffffff",
              color: "black",
              padding: "2px 8px",
              borderRadius: "5px",
              width: "67%",
              height: "150px",
              fontWeight: 600,
              boxShadow: "2px 2px 5px #ababab",
            }}
          >
            <img
              style={{ height: "80px", width: "80px" }}
              src="/assets/images/successLogin.gif"
            />

            <div>
              <span
                style={{
                  paddingRight: "5px",
                  paddingLeft: "7px",
                  fontSize: "22px",
                }}
              >
                {AlertValue}
              </span>
              <Icon
                size="15px"
                mt="1px"
                style={{
                  cursor: "pointer",
                  top: "6px",
                  right: "92px",
                  position: "absolute",
                }}
                onClick={() => setShowAlert(false)}
              >
                cancel
              </Icon>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Alert;
