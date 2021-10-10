import { useAppContext } from '@context/app/AppContext';
import React, { useEffect, useState } from 'react';

function Notification() {

    const [showAlert, setShowAlert] = useState(false)

    const { state } = useAppContext();

    useEffect(() => {
        if (state.alert.alertValue) {
            setShowAlert(true)

            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        }
    }, [state.alert.alertChanged])

    const success = state.alert.alerType === "success" || false
    const warning = state.alert.alerType === "warning" || false
    const error = state.alert.alerType === "error" || false

    const alertColor = success ? "rgb(137 207 159)" : warning ? "rgb(231 218 67)" : error ? "rgb(255 118 118)" : ""

    return (
        <>
            {showAlert &&
                <div style={{
                    position: "fixed",
                    top: "39.px",
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    zIndex: 2
                }}>
                    <span style={{
                        background: alertColor,
                        color: "black",
                        padding: "0px 10px 2px",
                        borderRadius: "10px",
                        width: "fit-content",
                    }}>{state.alert.alertValue}</span>
                </div>
            }
        </>
    )
}

export default Notification
