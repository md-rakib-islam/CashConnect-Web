import { Check_Email, Check_Primary_Phone, Check_Secondary_Phone, Check_User_Name } from "@data/constants"
import axios from 'axios'

const useCheckValidation = async ({ username = "", email = "", primaryPhone = "", secondaryPhone = "", userId = 0 }) => {

    if (username) {
        var userNameCheckRes = await axios.get(`${Check_User_Name}?username=${username}${userId ? `&user=${userId}` : ""}`)
        var userNameExist: boolean = await userNameCheckRes.data.username_exists
    } else {
        var userNameExist = false
    }

    if (email) {
        var EmailCheckRes = await axios.get(`${Check_Email}?email=${email}${userId ? `&user=${userId}` : ""}`)
        var EmailExist: boolean = await EmailCheckRes.data.email_exists
    } else {
        var EmailExist = false
    }

    if (primaryPhone) {
        var PrimaryPhoneCheckRes = await axios.get(`${Check_Primary_Phone}?primary_phone=${primaryPhone}${userId ? `&user=${userId}` : ""}`)
        var PrimaryPhoneExist: boolean = await PrimaryPhoneCheckRes.data.primary_phone_exists
    } else {
        var PrimaryPhoneExist = false
    }

    if (secondaryPhone) {
        var SecondaryPhoneCheckRes = await axios.get(`${Check_Secondary_Phone}?secondary_phone=${secondaryPhone}${userId ? `&user=${userId}` : ""}`)
        var SecondaryPhoneExist: boolean = await SecondaryPhoneCheckRes.data.secondary_phone_exists
    } else {
        var SecondaryPhoneExist = false
    }

    const isValid = Boolean(!userNameExist && !EmailExist && !PrimaryPhoneExist && !SecondaryPhoneExist)
    console.log("isvalidation", userNameExist, EmailExist, PrimaryPhoneExist, SecondaryPhoneExist)

    return { isValid: isValid, userNameExist: userNameExist, emailExist: EmailExist, primaryPhoneExist: PrimaryPhoneExist, SecondaryPhoneExist: SecondaryPhoneExist }
}

export default useCheckValidation


