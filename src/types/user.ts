import React from "react";

export interface UserAddpressGeo {
  lat: string;
  lng: string;
}

export interface UserAddpress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserAddpressGeo;
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserType {
  name: string;
  username?: string;
  email: string;
  address?: UserAddpress;
  phone?: {
    countryCode: string,
    value: string
  };
  website?: string;
  company?: UserCompany;
}