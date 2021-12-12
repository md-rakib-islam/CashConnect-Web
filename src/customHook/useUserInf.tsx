
function useUserInf() {

    try {
        var user_id: any = localStorage?.getItem("UserId");
    } catch (err) {
        var user_id = null;
    }

    try {
        var authTOKEN: any = {
            headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("jwt_access_token"),
            },
        };
    } catch (err) {
        var authTOKEN = null
    }
    try {
        var order_Id: any = localStorage.getItem("OrderId");
    } catch (err) {
        var order_Id = null
    }

    const isLogin = (user_id && localStorage.getItem("jwt_access_token")) ? true : false

    return { user_id, authTOKEN, order_Id, isLogin }
}

export default useUserInf


// import { useEffect, useState } from "react";

// function useUserInf() {

//     const [user_id, setuser_id] = useState("")
//     const [authTOKEN, setauthTOKEN] = useState({})
//     const [order_Id, setorder_Id] = useState("")
//     const [user_type, setuser_type] = useState("")
//     const [isLogin, setisLogin] = useState(false)

//     useEffect(() => {
//         setuser_id(localStorage?.getItem("UserId"))
//     }, [localStorage?.getItem("UserId")])

//     useEffect(() => {
//         setauthTOKEN({
//             headers: {
//                 "Content-type": "application/json",
//                 Authorization: localStorage.getItem("jwt_access_token"),
//             }
//         })

//         setisLogin((localStorage?.getItem("UserId") && localStorage.getItem("jwt_access_token")) ? true : false)
//     }, [localStorage.getItem("jwt_access_token")])

//     useEffect(() => {
//         setorder_Id(localStorage.getItem("OrderId"))
//     }, [localStorage.getItem("OrderId")])

//     useEffect(() => {
//         setuser_type(localStorage.getItem("userType"))
//     }, [localStorage.getItem("userType")])


//     return { user_id, authTOKEN, order_Id, isLogin, user_type }
// }

// export default useUserInf

