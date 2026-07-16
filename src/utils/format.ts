import { phoneConfig } from "@/constants/phoneConfig"

export const getPhoneCode = () => {
  return Object.entries(phoneConfig).map(([key, value]) => ({
    countryCode: key,
    phoneCode: value.code,
  }));
};

export const getPhoneFormat = (countryCode: keyof typeof phoneConfig) => {    
  if(!countryCode) {
    console.log("Country code underfind");    
    return null;
  } 

  return ({
    format: phoneConfig[countryCode].format,
    regex: phoneConfig[countryCode].regex,
    placeholder: phoneConfig[countryCode].placeholder,
  })
}

export const formatPhone = (phoneNumber:string, countryCode: keyof typeof phoneConfig) => {
  if(!phoneNumber) return "";

  switch(countryCode) {
    case "VN": 
      return "(" + phoneConfig["VN"].code + ") " + phoneNumber.replace(/(\d{4})(\d{3})(\d{3,4})/, "$1 $2 $3")
    case "JP": 
      return "(" + phoneConfig["JP"].code + ") " + phoneNumber.replace(/(\d{2,3})(\d{4})(\d{4})/, "$1 $2 $3")
    case "US": 
      return "(" + phoneConfig["US"].code + ") " + phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
    default:
      return phoneNumber;
  }
}