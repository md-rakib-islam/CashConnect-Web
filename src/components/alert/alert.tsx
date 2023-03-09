import Icon from "@component/icon/Icon";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { Customer_Order_Details } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Alert() {
  const [showAlert, setShowAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState<any>("");
  const [userEmail, setUserEmail] = useState<any>("");
  const { state, dispatch } = useAppContext();
  const { isLogin } = useUserInf();

  const success = state.alert.alerType === "success" || false;
  const successLogin = state.alert.alerType === "successLogin" || false;
  const successLogout = state.alert.alerType === "successLogout" || false;
  const successOrder = state.alert.alerType === "successOrder" || false;
  const warning = state.alert.alerType === "warning" || false;
  const error = state.alert.alerType === "error" || false;
  const signupError = state.alert.alerType === "signupError" || false;
  const loginError = state.alert.alerType === "loginError" || false;
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
  useEffect(() => {
    if (state.alert.alertLoading) {
      setShowLoading(true);

      if (!showLoading) {
        setTimeout(() => {
          setShowLoading(false);
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertLoading: false,
            },
          });
        }, 1000);
      }
    }
  }, [state.alert.alertLoading]);

  useEffect(() => {
    if (isLogin) {
      axios
        .get(`${Customer_Order_Details}${localStorage.getItem("OrderId")}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("jwt_access_token"),
          },
        })
        .then((res) => {
          console.log("resUseerAlert", res.data[0]);
          setOrderNumber(res.data[0].order?.order_no);
          setUserEmail(res.data[0].updated_by?.email);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [isLogin]);

  return (
    <>
      {!successLogin && (
        <div
          style={{
            position: "absolute",
            top: signupError ? "550px" : loginError ? "315px" : "78px",
            left: 0,
            width: isMobile ? "110%" : "100%",
            textAlign: "center",
            zIndex: showAlert ? 100 : -1,
            opacity: showAlert ? 1 : 0,
            display:
              state.alert.alerType === undefined
                ? "none"
                : state.alert.alerType === "successLogout"
                ? "none"
                : "block",
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
                : loginError
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
                : loginError
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
            width: "100%",
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
      {successLogout && (
        <div
          style={{
            position: "absolute",
            top: "78px",
            left: 0,
            width: "100%",
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
              src="/assets/images/successLogout.gif"
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
      {successOrder && (
        <div
          style={{
            position: "absolute",
            top: "78px",
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#ffffff",
              color: "black",
              padding: "2px 8px",
              borderRadius: "5px",
              width: "90%",
              height: "215px",
              fontWeight: 600,
              boxShadow: "2px 2px 5px #ababab",
            }}
          >
            <img
              style={{ height: "80px", width: "80px" }}
              src="/assets/images/successLogin.gif"
            />

            <div>
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
              </div>

              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <span
                  style={{
                    paddingRight: "5px",
                    paddingLeft: "7px",
                    fontSize: "17px",
                    color: "#4a4d50",
                  }}
                >
                  {`Order Code: ${orderNumber}`}
                </span>
              </div>

              <div
                style={{
                  marginTop: "8px",
                }}
              >
                <span
                  style={{
                    paddingRight: "5px",
                    paddingLeft: "7px",
                    fontSize: "13px",
                    color: "#83878b",
                  }}
                >
                  {`A copy of your order summary has been sent to '${userEmail}'`}
                </span>
              </div>

              <Icon
                size="15px"
                mt="1px"
                style={{
                  cursor: "pointer",
                  top: "10px",
                  right: "34px",
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
      {showLoading && (
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: " rgb(0 0 0 / 50%)",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <img
            style={{
              height: "100px",
              width: "100px",
              marginTop: "100pz",
            }}
            src="/assets/images/gif/loading.gif"
          />
        </div>
      )}
    </>
  );
}

export default Alert;
