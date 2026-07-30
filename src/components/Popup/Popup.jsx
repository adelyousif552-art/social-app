import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight, faArrowUpFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Authcontext } from "../../Context/Auth.context";
import { useFormik } from "formik";
import axios from "axios";
import* as yup from'yup'
import { toast } from "react-toastify";

export default function Popup({getposts}) {
    const {sharedpost}=useContext(Authcontext)
    const validation=yup.object({
        body:yup.string().required("required")
    })
    
    
    const [inputform,setinputform]=useState(false)
    async function handlesubmit(values){
       try {
         const options={
            url:`https://route-posts.routemisr.com/posts/${sharedpost._id}/share`,
            method:'POST',
            headers:{
                token,
                "Content-Type":"application/json"

            },
            data:values
            

        }
        const{data}=await axios.request(options)
        if(data.success){
            setpopup(false)
            toast.success(data.message)
            getposts()
        }
        
       } catch (error) {
        console.log(error.response.data);
        
        
       }
        
    }
    const formik=useFormik({
        initialValues:{
            body:''
        },
        validationSchema:validation,
        onSubmit:handlesubmit
    })
    
   
    const{setpopup,token}=useContext(Authcontext)
  return <>
  <div className="popup ">
        <div className="layer z-50 flex justify-center items-center fixed inset-0   bg-gray-600/20 ">
            <div className="box space-y-10 bg-white rounded-2xl max-w-2xl w-full p-10">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl">Share Post</h1>
                <button className="cursor-pointer" onClick={()=>{
                    setpopup(false)
                }}><FontAwesomeIcon icon={faXmark}/></button>
              </div>
                <form onSubmit={formik.handleSubmit}>
                    
                  <div className="bg-blue-600 p-5   rounded-lg">
                    <button onClick={()=>{
                        setinputform(!inputform)
                    }} type="button" className="flex cursor-pointer w-full items-center justify-between space-x-2">
                      <div className="flex items-center space-x-3">
                          <div className="size-10 rounded-lg flex  items-center justify-center bg-blue-500">
                        <FontAwesomeIcon className=" text-white " icon={faArrowUpFromBracket}/>
                    </div>
                    <h4 className="text-white text-xl">Share Post</h4>
                      </div>
                    <FontAwesomeIcon className="text-white" icon={faArrowRight}/>
                    </button>
                    </div>

                  
                  
                
                {inputform? <div className="">
                     <input onBlur={formik.handleBlur} type="text" className="form-control mt-5" placeholder="write something here" name="body" onChange={formik.handleChange} value={formik.values.body} />
                     {formik.errors.body&&formik.touched.body?<p className="text-red-500">{formik.errors.body}</p>:''}
                    <button type="submit" className="btn mt-5 w-full bg-blue-500 cursor-pointer text-white ">submit</button>
                   </div>:''}
                
                  
                </form>
                
                

            </div>
        </div>
    </div>
  
  
  </>
}
