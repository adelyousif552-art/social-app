import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { Authcontext } from "../Context/Auth.context"
import { useFormik } from "formik"
import { toast } from "react-toastify"
import * as yup from 'yup'
import axios from "axios"

export default function useLogin() {
     const {setuserid,settoken}=useContext(Authcontext)
    const[loginerror,setloginerror]=useState(null)
    
    
 
  const navigate=useNavigate()
 
  const loginschema=yup.object({
    
    email:yup.string().required("email is required").email("email must be a valid email"),
   
    password:yup.string().required('password is requried').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    
  })
 async function handlesubmit(values){
    try {
       const options={
      url:'https://route-posts.routemisr.com/users/signin',
      method:'POST',
      data:values
     }
     const {data}=await axios.request(options)
     
     
     
     
     
     
     
     
    if(data.success){
      settoken(data.data.token)
      setuserid(data.data.user._id)
        localStorage.setItem('token',data.data.token)
        localStorage.setItem('userid',data.data.user._id)
      toast.success(data.message)
      setTimeout(()=>{
        navigate('/')


      },3000)
    }
    } catch (error) {
      
      
      setloginerror(error.response.data.message)
      
      
    }
   
   
    
    

  }
  const formik=useFormik(
   {
     initialValues:{
      
      email:"",
     
      password:"",
     

    },
   validationSchema:loginschema,
    onSubmit:handlesubmit
   }
  )
  
  return {formik,setloginerror,loginerror}
}
