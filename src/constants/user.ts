import type { UserType } from "@/types/user"

export const UserData:UserType = {
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: ""
    },
  },
  phone: {
    countryCode: "VN",
    value: ""
  },
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
}

export const UserRequireField = {
  name: {
    status: false,
    message: ''
  },
  username: {
    status: false,
    message: ''
  },
  email: {
    status: false,
    message: ''
  },
  phone: {
    status: false,
    message: ''
  },
}