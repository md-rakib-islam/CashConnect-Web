
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
        var authTOKEN: any = {
            headers: {
                "Content-type": "application/json",
                Authorization: null
            },
        };
    }


    return { user_id, authTOKEN }
}

export default useUserInf
