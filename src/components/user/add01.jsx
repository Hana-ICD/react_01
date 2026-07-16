import { useForm, Controller, useWatch } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { phoneConfig } from "@/constants/phoneConfig"
import CountrySelect from "@/components/form/countrySelect"
import PhoneInput from "@/components/form/phoneInput"
import { useEffect } from "react"

const schema = z.object({

  name: z.string().trim().min(1, "Name is required").max(3, "Name too long"),
  email: z.string().trim().email("Email invalied"),
  countryCode: z.enum(["JP", "VN", "US"]),
  phone: z.string(),
  password: z.string().min(3, "Minimum 3 characters").max(9, "Maximum 9 characters"),
  confirmPassword: z.string(),

}).superRefine((data, ctx) => {

  // phone
  const regex = phoneConfig[data.countryCode].regex;
  
  console.log(regex, 'regex');
  
  if(!regex.test(data.phone)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phone"],
      message: "Phone format invalid"
    })    
  }

  // confirm password
  if(data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmPassword"],
      message: "Password not match"
    })
  }  
  console.log("22222222");
})

const Add01 = () => {
  const {
    control,
    register, 
    handleSubmit,
    watch,
    reset,
    trigger,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "VN",
      phone: "",
    }
  }); 

  console.log(errors, 'errors');  
  
  // const country = watch("countryCode")
  // console.log(getValues(), 'get values list');

  const triggerForm = {}

  function TriggerAddForm(name) {
    triggerForm[name] = useWatch({
      control,
      name: name
    })
  }
 
  TriggerAddForm("name");
  TriggerAddForm("countryCode");
  TriggerAddForm("phone");
  TriggerAddForm("email");
  TriggerAddForm("password");
  TriggerAddForm("confirmPassword");

  const onSubmit = (data) => {
    console.log(data, "data");
  }

  useEffect(() => {
    if(triggerForm.phone) trigger("phone");    
    if(triggerForm.name) trigger("name");    
    if(triggerForm.email) trigger("email");    
    if(triggerForm.password) trigger("password");    
    if(triggerForm.confirmPassword) trigger("confirmPassword");    
  }, [triggerForm.phone, triggerForm.countryCode, triggerForm.name, triggerForm.email, triggerForm.password, triggerForm.confirmPassword, trigger])

  useEffect(() => {
    console.log(errors, 'errors useEffect');
    
  }, [errors])
  
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="">Name</label>
        <input className="input" 
          {
            ...register("name")
          }
        />
        {
          errors.name && (
            <p className="text-sm text-red-300">{errors.name.message}</p>
          )
        }
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input className="input" 
          {...register("email")}
        />
        {
          errors.email && (
            <p className="text-sm text-red-300">{errors.email.message}</p>
          )
        }        
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input className="input" type="password" 
          {...register("password")}
        />
        {
          errors.password && (
            <p className="text-sm text-red-300">{errors.password.message}</p>
          )
        }        
      </div>
      <div>
        <label htmlFor="">Confirm Password</label>
        <input className="input" type="password" 
          {...register("confirmPassword")}
        />
        {
          errors.confirmPassword && (
            <p className="text-sm text-red-300">{errors.confirmPassword.message}</p>
          )
        }        
      </div>
      {/* <div>
        <label htmlFor="">Country</label>
        <select
          {...register("countryCode")}
        >
          <option value="JP">JP</option>
          <option value="VN">VN</option>
          <option value="US">US</option>
        </select>

        <input {...register("phone")} />
      </div> */}
      <div>
        <p>Controller - Country code</p>
        <Controller
          control={control}
          name="countryCode"
          render={({ field }) => (
            <CountrySelect
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              value={field.value}
              onChange={field.onChange}
            />
          )}
        /> 
        {
          errors.phone && (
            <p className="text-sm text-red-300">{errors.phone.message}</p>
          )
        }
      </div>

      <button className="btn">Add</button>
      <button type="button" onClick={() => reset()} className="btn">Reset</button>
    </form>
    <h3>

      Watch()

      </h3>

      <pre>
        { 
          JSON.stringify(

          watch(),

          null, 2 ) 
        }
      </pre>
    </>
  )
}
export default Add01;