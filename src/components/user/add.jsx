import { useMemo, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserA } from "@/services/usersApi"
import {  useNavigate } from "react-router-dom"
import { UserData, UserRequireField } from "@/constants/user"
// import PhoneInput from "react-phone-number-input"
// import "react-phone-number-input/style.css"
import { getPhoneCode, getPhoneFormat } from "@/utils/format"

import PhoneInput from "@/components/PhoneInput";

export default function AddC({users}) {      
  
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const [dataForm, setDataForm] = useState({...UserData});

  const [err, setErr] = useState(
    {
      ...UserRequireField
    }
  )

  const addUserMultation = useMutation({
    mutationFn: addUserA,
    onSuccess: (data) => {      
      queryClient.invalidateQueries({
        queryKey: ["users"]
      }); 
      alert(data?.message);
      navigate("/users", {
        state: {
          highlightId: data["user"]._id
        }
      }); 
    },
    onError: (error) => {
      console.log(
        "Error: ", error.response?.data?.message
      );
      alert(error.response?.data?.message);
    }
  })  

  const validate = () => {
    const newErr = {}

    if(!dataForm?.name) {
      newErr.name = {
        status: true
      }
    }
    if(!dataForm?.username) {
      newErr.username = {
        status: true
      }
    }  
    
    if(!dataForm.phone.value) {
      newErr.phone = {
        status: true
      }   
    }
    else if(!getPhoneFormat(dataForm.phone.countryCode).regex.test(dataForm.phone.value)) {
      newErr.phone = {
        status: true,
        message: "The Phone number format is invalid"
      }
    }
    
    if(!dataForm?.email) {
      newErr.email = {
        status: true
      }
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataForm.email)) {
      newErr.email = {
        status: true,
        message: 'The Email is invalid'
      }
    }

    setErr(newErr);

    return Object.keys(newErr).length === 0; // Each submit newErr = {} => if error => { name: true, ..vv..} => return false, if okay => newErr = {} => return true
  }

  const [error, setError] = useState({})

  const isSubmitting = useRef(false);

  const addUserSubmit = async (event) => {
    event.preventDefault();       
    
    if(!validate()) {
      return;
    } 

    if(isSubmitting.current) {
      return
    }

    const existedUser = users.some(
      (user) => user.email === dataForm.email
    );   

    if(existedUser) {
      alert("User existed")
      return;
    }      
    
    isSubmitting.current = true;

    addUserMultation.mutate(dataForm);

    isSubmitting.current = false;
  
    // const newUsers = await addUser(dataForm);    
    // const newUsers = await addUserA(dataForm);    
    // setUsers((prev) => [...prev, newUsers]);
  }

  return (
    <form onSubmit={addUserSubmit}>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-auto mt-5">
          <label htmlFor="name" className="mb-5 inline-block">Name</label>
          <input type="text" value={dataForm?.name} id="name" onChange={(e) => {
            setDataForm({...dataForm, name: e.target.value}); 
            !e.target.value ? setErr({...err, name: { ...err.name, status: true }}) : setErr({...err, name: { ...err.name, status: false }})
          }} placeholder="Name" className="w-full" />
          {
            err?.name?.status && (
              <p className="text-sm text-red-300">The Name field is require</p>
            ) 
          }          
        </div>

        <div className="col-auto mt-5">
          <label htmlFor="userName" className="mb-5 inline-block">userName</label>
          <input type="text" value={dataForm?.username} id="userName" onChange={(e) => {
            setDataForm({...dataForm, username: e.target.value}); 
            !e.target.value ? setErr({...err, username: { ...err.username, status: true }}) : setErr({...err, username: { ...err.username, status: false }})
          }} placeholder="userName" className="w-full" />
          {
            err?.username?.status && (
              <p className="text-sm text-red-300">The Username field is require</p>
            )
          }          
        </div>

        <div className="col-auto mt-5">
          <label htmlFor="email" className="mb-5 inline-block">Email</label>
          <input type="email" value={dataForm?.email} id="email" onChange={(e) => {
            setDataForm({...dataForm, email: e.target.value}); 
            !e.target.value ? setErr({...err, email: { ...err.email, status: true }}) : setErr({...err, email: { ...err.email, status: false }})
          }} placeholder="Email" className="w-full" />
          {
            err?.email?.status && (
              <p className="text-sm text-red-300">{ err?.email?.message ? err.email.message : 'The Email field is require'}</p>
            )
          }   
        </div>
      </div>

      <p className="!mt-5">Address</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-auto mt-5">
          <label htmlFor="addressStreet" className="mb-5 inline-block">Street</label>
          <textarea type="text" value={ dataForm?.address?.street } id="addressStreet" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, street: e.target.value
            }}); 
          }} placeholder="address street" className="w-full input" />
        </div>
        <div className="col-auto mt-5">
          <label htmlFor="addressSuite" className="mb-5 inline-block">Suite</label>
          <textarea type="text" value={ dataForm?.address?.suite } id="addressSuite" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, suite: e.target.value
            }}); 
          }} placeholder="address suite" className="w-full input" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-auto mt-5">
          <label htmlFor="addressCity" className="mb-5 inline-block">City</label>
          <textarea type="text" value={ dataForm?.address?.city } id="addressCity" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, city: e.target.value
            }}); 
          }} placeholder="address city" className="w-full input" />
        </div>
        <div className="col-auto mt-5">
          <label htmlFor="addressCode" className="mb-5 inline-block">Zipcode</label>
          <textarea type="text" value={ dataForm?.address?.zipcode } id="addressCode" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, zipcode: e.target.value
            }}); 
          }} placeholder="address" className="w-full input" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-auto mt-5">
          <label htmlFor="addressGeoLat" className="mb-5 inline-block">Geo lat</label>
          <input type="text" value={ dataForm?.address?.geo?.lat } id="addressGeoLat" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, geo: {
                ...dataForm.address?.geo, lat: e.target.value
              }
            }}); 
          }} placeholder="Geo lat" className="w-full" />
        </div>
        <div className="col-auto mt-5">
          <label htmlFor="addressGeoLng" className="mb-5 inline-block">Geo lng</label>
          <input type="text" value={ dataForm?.address?.geo?.lng } id="addressGeoLng" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, geo: {
                ...dataForm.address?.geo, lng: e.target.value
              }
            }}); 
          }} placeholder="Geo lng" className="w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-auto mt-5">
          {/* Phone */}
          <label htmlFor="phone" className="mb-5 inline-block">Phone</label>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-auto">
              <select className="input w-full" value={dataForm.phone.countryCode} onChange={(e) => {
                setDataForm({...dataForm, phone: {
                    ...dataForm.phone, countryCode: e.target.value
                  }})
                }}>
                {
                  getPhoneCode().map((item, key) => (
                    <option key={key} value={item.countryCode}>{item.countryCode} ({item.phoneCode})</option>
                  ))
                }
              </select>
            </div>

            <div className="col-span-2"> 
              <PhoneInput
                className="w-full"
                value={dataForm.phone.value}
                format={getPhoneFormat(dataForm.phone.countryCode)?.format}
                placeholder={getPhoneFormat(dataForm.phone.countryCode)?.placeholder}
                onchange={
                  (values) => {
                    setDataForm(prev => ({
                      ...prev,
                      phone: {
                        ...prev.phone,
                        value: values.value
                      }
                    }))
                    setErr(prev => (
                      {
                        ...prev, 
                        phone: {
                          ...prev.phone, status: !values.value
                        }
                      }
                    ))
                  }
                }
              />
              {
                err?.phone?.status && (
                  <p className="text-sm text-red-300">{ err?.phone?.message ? err.phone.message : 'The Phone field is require'}</p>
                )
              }  

            </div>
            
          </div>       
        </div>

        <div className="col-auto mt-5">
          {/* Website */}
          <label htmlFor="website" className="mb-5 inline-block">Website</label>
          <input type="text" value={dataForm?.website} id="website" onChange={(e) => {
            setDataForm({...dataForm, website: e.target.value}); 
          }} placeholder="Website" className="w-full" />
        </div>
      </div>

      <p className="!mt-5">Company</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-auto mt-5">
          {/* Company */}
          <textarea type="text" value={dataForm?.company?.name} id="companyName" onChange={(e) => {
            setDataForm({
              ...dataForm, company: {
                ...dataForm.company, name: e.target.value
              }
            }); 
          }} placeholder="Company Name" className="w-full input" />
        </div>
        <div className="col-auto mt-5">
          <textarea type="text" value={dataForm?.company?.catchPhrase} id="companyCatchPhrase" onChange={(e) => {
            setDataForm({...dataForm, company: {
              ...dataForm.company, catchPhrase: e.target.value
            }}); 
            }} placeholder="Company catchPhrase" className="w-full input" />
        </div>
        <div className="col-auto mt-5">
          <textarea type="text" value={dataForm?.company?.bs} id="companyBs" onChange={(e) => 
          { setDataForm({...dataForm, company: {...dataForm.company, bs: e.target.value }});}} 
          placeholder="Company Bs" className="w-full input" />
        </div>
      </div>

      <button type="submit" className="btn !mt-5 inline-block">Add</button>

    </form>
  )
}
