
function useUserInf() {

    try {
        var user_id: any = localStorage?.getItem("UserId");
    } catch (err) {
        user_id = null;
    }

    try {
        var authTOKEN: any = {
            headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("jwt_access_token"),
            },
        };
    } catch (err) {
        authTOKEN = {
            headers: {
                "Content-type": "application/json",
                Authorization: null
            },
        };
    }
    try {
        var order_Id = localStorage.getItem("OrderId");
    } catch (err) {
        order_Id = null
    }

    return { user_id, authTOKEN, order_Id }
}

export default useUserInf
