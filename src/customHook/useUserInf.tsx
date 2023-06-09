import { useEffect, useState } from "react";

function useUserInf() {

    const [user_id, setUser_id] = useState(null)
    const [order_Id, setOrder_Id] = useState(null)
    const [isLogin, setIsLogin] = useState<any>(false)
    const [authTOKEN, setAuthTOKEN] = useState({
        headers: {
            "Content-type": "application/json",
            Authorization: '',
        },
    })


    useEffect(() => {
        setUser_id(localStorage.getItem("UserId"))
        setOrder_Id(localStorage.getItem("OrderId"))
        setIsLogin((localStorage.getItem("UserId") && localStorage.getItem("jwt_access_token")) ? true : false)
        setAuthTOKEN({
            headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("jwt_access_token"),
            },
        })

        const resetUserData = () => {
            setUser_id(localStorage.getItem("UserId"))
            setOrder_Id(localStorage.getItem("OrderId"))
            setIsLogin((localStorage.getItem("UserId") && localStorage.getItem("jwt_access_token")) ? true : false)
            setAuthTOKEN({
                headers: {
                    "Content-type": "application/json",
                    Authorization: localStorage.getItem("jwt_access_token"),
                },
            })
        };

        //reset state whene localstorage changed
        window.addEventListener('storage', resetUserData);

        //unsibscibe event listener when this hook unmount
        return () => window.removeEventListener('storage', resetUserData);
    }, [])

    return { user_id, authTOKEN, order_Id, isLogin }
}

export default useUserInf