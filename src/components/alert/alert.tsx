import Icon from '@component/icon/Icon';
import { useAppContext } from '@context/app/AppContext';
import React, { useEffect, useState } from 'react';

function Alert({ onLogin = false, onSignup = false }) {

    const [showAlert, setShowAlert] = useState(false)

    const { state, dispatch } = useAppContext();

    useEffect(() => {
        if (state.alert.alertShow) {
            setShowAlert(true)

            if (!showAlert) {
                setTimeout(() => {
                    setShowAlert(false)
                    dispatch({
                        type: "CHANGE_ALERT",
                        payload: {
                            alertShow: false,
                            alertChanged: Math.random()
                        }
                    })
                }, 3000);
            }
        }
    }, [state.alert.alertChanged])

    const AlertValue = state.alert.alertValue

    const success = state.alert.alerType === "success" || false
    const warning = state.alert.alerType === "warning" || false
    const error = state.alert.alerType === "error" || false

    return (
        <>
            {
                <div style={{
                    position: "absolute",
                    top: onLogin ? "45px" : onSignup ? "45px" : "7px",
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    zIndex: showAlert ? 1 : -1,
                    opacity: showAlert ? 1 : 0,
                    transitionProperty: "all",
                    transitionDuration: "1s",
                    transitionTimingFunction: "cubic-bezier(0.27, 0.24, 0, 1.03)",
                    transitionDelay: "0s",
                }}>
                    <div style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "flex",
                        alignItems: "center",
                        background: success ? "rgb(195 237 208)" : warning ? "rgb(227 239 160)" : error ? "rgb(255 155 155)" : "",
                        color: "black",
                        padding: "2px 8px",
                        borderRadius: "5px",
                        width: "fit-content",
                        fontWeight: 600,
                        boxShadow: "2px 2px 5px #ababab",
                    }}>
                        <Icon size="15px" style={{ cursor: "pointer" }}>{success ? "success" : warning ? "warning" : error ? "danger" : ""}</Icon>
                        <span style={{ paddingRight: "5px", paddingLeft: "7px" }}>{AlertValue}</span>
                        <Icon size="15px" mt="1px" style={{ cursor: "pointer" }} onClick={() => setShowAlert(false)}>cancel</Icon>
                    </div>
                </div>

            }
        </>
    )
}

export default Alert
