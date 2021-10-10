import { country_codes } from "@data/country_code";

const RemoveCountryCodeFromPgoneNo = (phoneNoPrimary: string = "", phoneNoSecondary?: string) => {

    var phoneNoPrimary_except_code = phoneNoPrimary
    var phoneNoSecondary_except_code = phoneNoSecondary

    country_codes.map((data) => {
      const code = `${"\\"}${data.value}`
      var countryCode = new RegExp(code);

      const matchedCode_for_primary_phone = phoneNoPrimary?.match(countryCode)

      if (matchedCode_for_primary_phone) {
          phoneNoPrimary_except_code = phoneNoPrimary?.replace(matchedCode_for_primary_phone, "")
      }

      if(phoneNoSecondary){
        const matchedCode_for_secondary_phone = phoneNoSecondary?.match(countryCode)
        if (matchedCode_for_secondary_phone) {
          phoneNoSecondary_except_code = phoneNoSecondary?.replace(matchedCode_for_secondary_phone, "")
        }
      }
    })

      return [phoneNoPrimary_except_code , phoneNoSecondary_except_code]
  }

  export default RemoveCountryCodeFromPgoneNo