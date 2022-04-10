import { Check_Email, Check_Email_When_Update, Check_Primary_Phone, Check_Primary_Phone_When_Update, Check_Secondary_Phone, Check_Secondary_Phone_When_Update, Check_User_Name, Check_User_Name_When_Update } from "@data/constants"
import axios from 'axios'

const checkValidation = async ({  email = "", primaryPhone = "", secondaryPhone = "", userId = 0 }) => {

    // if (username && userId) {
    //     var userNameCheckRes = await axios.get(`${Check_User_Name_When_Update}?username=${username}&user=${userId}`)
    //     var userNameExist: boolean = await userNameCheckRes.data.username_exists
    // }
    // // else if (username) {
    // //     var userNameCheckRes = await axios.get(`${Check_User_Name}?username=${username}}`)
    // //     var userNameExist: boolean = await userNameCheckRes.data.username_exists
    // // }
    // else {
    //     var userNameExist = false
    // }

    if (email && userId) {
        var EmailCheckRes = await axios.get(`${Check_Email_When_Update}?email=${email}&user=${userId}`)
        var EmailExist: boolean = await EmailCheckRes.data.email_exists
    }
    else if (email) {
        var EmailCheckRes = await axios.get(`${Check_Email}?email=${email}`)
        var EmailExist: boolean = await EmailCheckRes.data.email_exists
    }
    else {
        var EmailExist = false
    }

    if (primaryPhone && userId) {
        var PrimaryPhoneCheckRes = await axios.get(`${Check_Primary_Phone_When_Update}?primary_phone=${primaryPhone}&user=${userId}`)
        var PrimaryPhoneExist: boolean = await PrimaryPhoneCheckRes.data.primary_phone_exists
    }
    else if (primaryPhone) {
        var PrimaryPhoneCheckRes = await axios.get(`${Check_Primary_Phone}?primary_phone=${primaryPhone}`)
        var PrimaryPhoneExist: boolean = await PrimaryPhoneCheckRes.data.primary_phone_exists
    }
    else {
        var PrimaryPhoneExist = false
    }

    if (secondaryPhone && userId) {
        var SecondaryPhoneCheckRes = await axios.get(`${Check_Secondary_Phone_When_Update}?secondary_phone=${secondaryPhone}&user=${userId}`)
        var SecondaryPhoneExist: boolean = await SecondaryPhoneCheckRes.data.secondary_phone_exists
    }
    else if (secondaryPhone) {
        var SecondaryPhoneCheckRes = await axios.get(`${Check_Secondary_Phone}?secondary_phone=${secondaryPhone}}`)
        var SecondaryPhoneExist: boolean = await SecondaryPhoneCheckRes.data.secondary_phone_exists
    }
    else {
        var SecondaryPhoneExist = false
    }

    const isValid = Boolean( !EmailExist && !PrimaryPhoneExist && !SecondaryPhoneExist)
    console.log("isValid", isValid)

    return { isValid: isValid,  emailExist: EmailExist, primaryPhoneExist: PrimaryPhoneExist, SecondaryPhoneExist: SecondaryPhoneExist }
}

export default checkValidation


