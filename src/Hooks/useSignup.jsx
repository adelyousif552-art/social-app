import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as yup from'yup'


export default function useSignup() {
    
  const navigate=useNavigate()
 
  const signupschema=yup.object({
    name:yup.string().required("name is required").min(3,"name must be at least 3 characters").max(20,"name must be at most 20 characters"),
    username:yup.string().required("username is required").min(3,"username must be at least 3 characters").max(20,"username must be at most 20 characters"),
    email:yup.string().required("email is required").email("email must be a valid email"),
    dateOfBirth:yup.date().max(new Date(),"date of birth cannot be in the future").test("age","you are less than 18",function(value){
      if(!value){
        return false;
      }
      const today=new Date()
      const birth=new Date(value)
      let age=today.getFullYear()-birth.getFullYear()
      const monthdiff=today.getMonth()-birth.getMonth()
      if(monthdiff<0||(monthdiff===0&&today.getDate()<birth.getDate())){
        age--
      }
      return age>=18
    }).required("date of birth is required"),
    gender:yup.string().required("gender is required").oneOf(['male','female'],'select a valid gender'),
    password:yup.string().required('password is requried').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    rePassword:yup.string().required('confirm password is required').oneOf([yup.ref('password'),'must match password'])

  })
 async function handlesubmit(values){
    try {
       const options={
      url:'https://route-posts.routemisr.com/users/signup',
      method:'POST',
      data:values
     }
     const {data}=await axios.request(options)
     
     
    if(data.success){
      toast.success(data.message)
      setTimeout(()=>{
        navigate('/login')


      },3000)
    }
    } catch (error) {
      
      
      toast.error(error.response.data.message)
      
      
    }
   
    
    

  }
  const formik=useFormik(
   {
     initialValues:{
      name:"",
      username:"",
      email:"",
      dateOfBirth:"",
      gender:"",
      password:"",
      rePassword:""

    },
   validationSchema:signupschema,
    onSubmit:handlesubmit
   }
  )
  
  
  
  return {formik,navigate}
}
