import { UserRequireField } from "@/constants/user"
import { getPhoneFormat } from "@/utils/format"
import { phoneConfig } from "@/constants/phoneConfig"

export const validateRequire = (field:string, value:any) => {
  if(!value) {        
    return {
      status: true,
      message: `The ${field} is require.`
    }
  }
  return {
    status: false,
    message: ""
  }
}

export const validateEmail = (value:string) => {
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return {
      status: true,
      message: `The Email is invalid.`
    }  
  }
  return {
    status: false,
    message: ""
  }
}

export const validatePhone = (field:string, value:string, code?:keyof typeof phoneConfig) => {
  const requiredError = validateRequire(field, value);

  if(requiredError.status) {
    return requiredError;
  }

  if(!getPhoneFormat(code).regex.test(value)) {
   return {
      status: true,
      message: `The ${field} number is invalid.`
    }  
  }
  return {
    status: false,
    message: ""
  }
}

export const validatesUser = (field:string, value:(any | string), code?:keyof typeof phoneConfig) => {  
    
  // const newError = {...UserRequireField};
  const newError = {};

  if(field === 'email') {
    newError["email"] = validateEmail(value as string);
  }
  else if(field === 'phone') {
    if(typeof value === "string") {
      newError["phone"] = validatePhone("phone", value, code);
    }
    else {
      newError["phone"] = validatePhone("phone", value.value, code);
    }
  }
  else {
    newError[field] = validateRequire(field, value);
  }
  
  return newError;
}

export const validatesErrorsAfterSubmit = (
  fields:string[]
) => {  
  let errors = {};
  let result = {}  

  Object.keys(UserRequireField).forEach((key)=> {
    const fieldError = validatesUser(key, fields[key], fields[key]?.countryCode);    
    errors = {
      ...errors,
      ...fieldError
    }
  })
  Object.entries(errors).map(
    ([key, value]) => {
      if(value["status"]) result[key] = value;
    }
  )  
  
  return result;
}