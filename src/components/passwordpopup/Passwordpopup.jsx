import axios from "axios"
import { useFormik } from "formik"
import { useContext } from "react"
import * as yup from 'yup'
import { Authcontext } from "../../Context/Auth.context"
import { toast } from "react-toastify"


export default function Passwordpopup({passwordpopup}) {
    const validation=yup.object({
        password:yup.string().required('old password is required'),
        newPassword:yup.string().required('password is requried').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character')
    })
    const {token}=useContext(Authcontext)
    async function handlesubmit(values){
        try {
            const options={
                url:'https://route-posts.routemisr.com/users/change-password',
                method:'PATCH',
                headers:{
                    "Content-Type":"application/json",
                    token
                },
                data:values

            }
            const {data}=await axios.request(options)
            console.log("passdata",data);
            if(data.success){
                toast.success(data.message)
                formik.resetForm()
                passwordpopup(false)
            }
            
        } catch (error) {
           toast.error(error.response.data.message)
           
            
            
        }
    }
    const formik=useFormik({
        initialValues:{
            password:'',
            newPassword:''
        },
        validationSchema:validation,
        onSubmit:handlesubmit
    })
  return <>
  
  <div onClick={()=>{
    passwordpopup(false)
  }} className="overlay fixed inset-0 z-50 bg-gray-500/50 flex items-center justify-center">
    <div onClick={(e)=>{
        e.stopPropagation()

    }} className="passpopup bg-white p-5 rounded-xl ">
    <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="oldpass">
            <label htmlFor="oldpass">old password</label>
            <input className="form-control" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="oldpass" type="password" placeholder="old password" name="password"/>
        </div>
        <div className="newpass">
            <label htmlFor="newpass">new password</label>
            <input className="form-control" id="newpass" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" placeholder="new password" name="newPassword"/>
        </div>
        <button className="btn w-full bg-blue-500 text-white">change password</button>
    </form>
  </div>
  </div>
  
  
  </>
}
