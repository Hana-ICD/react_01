import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { updateUserA, getDetailA } from "@/services/usersApi"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPhoneCode, getPhoneFormat } from "@/utils/format"
import { validatesUser, validatesErrorsAfterSubmit } from "@/utils/user"
import PhoneInput from "@/components/PhoneInput";

function EditC({ id, user }) {  
  const [dataForm, setDataForm] = useState(user);
  const queryClient = useQueryClient();  
  const [error, setError] = useState({}); 
  
  const editMutation = useMutation({
    mutationFn: () => updateUserA(id, dataForm),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["users"]
      })
      alert(data?.message);
    },
    onError: (error) => {
      console.log("Error: ", error?.message);
      alert(error.response?.data?.message);
    }
  })

  const validateAllError = () => {        
    if(Object.keys(error).length === 0) return;
    if (dataForm) {          
      return validatesErrorsAfterSubmit(dataForm);
    }
    return null;
  }

  const editSubmit = async (e) => {
    e.preventDefault(); 

    if (JSON.stringify(user) === JSON.stringify(dataForm)) {
      alert("Not found changes to save");
      return; 
    }        

    if(validateAllError() && Object.keys(validateAllError()).length > 0) {
      alert("Let check errors before submit");
      return; 
    }
    else {
      editMutation.mutate(id, dataForm);   
    }
    // // await updateUser(id, dataForm);
    // await updateUserA(id, dataForm);
    
    // alert("Edit successful");
    // navigate("/users");    
  
    // editMutation.mutate(id, dataForm);    
  }  

  useEffect(() => {
    setDataForm(user);    
  }, [user]);  
  
  return (
    <form onSubmit={editSubmit}>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-auto mt-5">
          <label htmlFor="name" className="mb-5 inline-block">Name</label>
          <input type="text" value={dataForm?.name || ""} id="name" onChange={(e) => {
            setDataForm({...dataForm, name: e.target.value}); 
            setError(validatesUser("name", e.target.value));
          }} placeholder="Name" className="w-full" />
          {
            error?.name?.status ? (
              <p className="text-sm text-red-300">{error?.name?.message }</p>
            ) : 
            validateAllError() && (
              <p className="text-sm text-red-300">{validateAllError()["name"]?.message}</p>
            )
          }
        </div>
        <div className="col-auto mt-5">
          <label htmlFor="userName" className="mb-5 inline-block">userName</label>
          <input type="text" value={dataForm?.username || ""} id="userName" onChange={(e) => {
            setDataForm({...dataForm, username: e.target.value}); 
            setError(validatesUser("username", e.target.value));
          }} placeholder="userName" className="w-full" />
          {
            error?.username?.status ? (
              <p className="text-sm text-red-300">{error?.username?.message }</p>
            ) : 
            validateAllError() && (
              <p className="text-sm text-red-300">{validateAllError()["username"]?.message}</p>
            )
          }
        </div>
        <div className="col-auto mt-5">
          <label htmlFor="email" className="mb-5 inline-block">Email</label>
          <input type="email" value={dataForm?.email || ""} id="email" onChange={(e) => {
            setDataForm({...dataForm, email: e.target.value}); 
            setError(validatesUser("email", e.target.value));
          }} placeholder="Email" className="w-full" /> 
          {
            error?.email?.status ? (
              <p className="text-sm text-red-300">{error?.email?.message }</p>
            ) : 
            validateAllError() && (
              <p className="text-sm text-red-300">{validateAllError()["email"]?.message}</p>
            )
          }
        </div>
      </div>

      <p className="!mt-5">Address</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-auto mt-5">
          <label htmlFor="addressStreet" className="mb-5 inline-block">Street</label>
          <textarea type="text" value={ dataForm?.address?.street || "" } id="addressStreet" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, street: e.target.value
            }}); 
          }} placeholder="address street" className="w-full input" />
        </div>
        <div className="col-auto mt-5">
          <label htmlFor="addressSuite" className="mb-5 inline-block">Suite</label>
          <textarea type="text" value={ dataForm?.address?.suite || "" } id="addressSuite" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, suite: e.target.value
            }}); 
          }} placeholder="address suite" className="w-full input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-auto mt-5">
          <label htmlFor="addressCity" className="mb-5 inline-block">City</label>
          <textarea type="text" value={ dataForm?.address?.city || "" } id="addressCity" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, city: e.target.value
            }}); 
          }} placeholder="address city" className="w-full input" />
        </div>
        <div className="col-auto mt-5">
          <label htmlFor="addressCode" className="mb-5 inline-block">Zipcode</label>
          <textarea type="text" value={ dataForm?.address?.zipcode || "" } id="addressCode" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, zipcode: e.target.value
            }}); 
          }} placeholder="address" className="w-full input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-auto mt-5">
          <label htmlFor="addressGeoLat" className="mb-5 inline-block">Geo lat</label>
          <input type="text" value={ dataForm?.address?.geo?.lat || "" } id="addressGeoLat" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, geo: {
                ...dataForm.address?.geo, lat: e.target.value
              }
            }}); 
          }} placeholder="Geo lat" className="w-full" />
        </div>
        <div className="col-auto mt-5">
          <label htmlFor="addressGeoLng" className="mb-5 inline-block">Geo lng</label>
          <input type="text" value={ dataForm?.address?.geo?.lng || "" } id="addressGeoLng" onChange={(e) => {
            setDataForm({...dataForm, address: {
              ...dataForm.address, geo: {
                ...dataForm.address?.geo, lng: e.target.value
              }
            }}); 
          }} placeholder="Geo lng" className="w-full" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {
          dataForm?.phone?.countryCode && (
            <div className="col-auto mt-5">
              {/* Phone */}
              <label htmlFor="phone" className="mb-5 inline-block">Phone</label>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-auto">
                  <select className="input w-full" value={dataForm?.phone.countryCode} 
                    onChange={
                      (e) => {
                        setDataForm(prev => ({
                          ...prev, phone: {
                            ...prev.phone, countryCode: e.target.value
                          }
                        }))                        
                      }
                    }>
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
                    value={dataForm?.phone.value || ""}
                    format={getPhoneFormat(dataForm?.phone.countryCode)?.format}
                    placeholder={getPhoneFormat(dataForm?.phone?.countryCode)?.placeholder}
                    onchange={
                      (values) => {
                        setDataForm(prev => ({
                          ...prev,
                          phone: {
                            ...prev.phone,
                            value: values.value
                          }
                        }));
                        setError(validatesUser("phone", values.value, dataForm?.phone.countryCode));
                      }
                    }
                  />
                  {
                    error?.phone?.status ? (
                      <p className="text-sm text-red-300">{error.phone.message }</p>
                    ) : 
                    validateAllError() && (
                      <p className="text-sm text-red-300">{validateAllError()["phone"]?.message}</p>
                    )
                  }
                </div>
              </div>
            </div>
          )
        }

        <div className="col-auto mt-5">
          {/* Website */}
          <label htmlFor="website" className="mb-5 inline-block">Website</label>
          <input type="text" value={dataForm?.website || ""} id="website" onChange={(e) => {
            setDataForm({...dataForm, website: e.target.value}); 
          }} placeholder="Website" className="w-full" />
        </div>
      </div>

      <p className="!mt-5">Company</p>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-auto mt-5">
          {/* Company */}
          <textarea type="text" value={dataForm?.company?.name || "" } id="companyName" onChange={(e) => {
            setDataForm({
              ...dataForm, company: {
                ...dataForm.company, name: e.target.value
              }
            }); 
          }} placeholder="Company Name" className="w-full input" />
        </div>
        <div className="col-auto mt-5">
          <textarea type="text" value={dataForm?.company?.catchPhrase || ""} id="companyCatchPhrase" onChange={(e) => {
            setDataForm({...dataForm, company: {
              ...dataForm.company, catchPhrase: e.target.value
            }}); 
            }} placeholder="Company catchPhrase" className="w-full input" />
        </div>
        <div className="col-auto mt-5">
          <textarea type="text" value={dataForm?.company?.bs || ""} id="companyBs" onChange={(e) => 
          { setDataForm({...dataForm, company: {...dataForm.company, bs: e.target.value }}); }} 
          placeholder="Company Bs" className="w-full input" />
        </div>
      </div>

      <button type="submit" className="btn !mt-5 inline-block">Save edit</button>

    </form>
  )
}

export default EditC;