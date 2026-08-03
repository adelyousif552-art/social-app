import { faImage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Authcontext } from '../../Context/Auth.context'
import { useFormik } from 'formik'
import axios from 'axios'
import { toast } from 'react-toastify'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import * as yup from 'yup'

export default function Updpopup({getuserposts}) {
    const validation=yup.object({
        body:yup.string().required('caption is required'),
        image:yup.mixed().nullable().test('size','image size should be less than 5mb',(value)=>{
            
            if(!value){
                return true
            }
            return value.size<5*1024*1024

        }).test('type','not acceptable type',(value)=>{
             const acceptabletypes=['image/jpg','image/png','image/jpeg']   
            if(!value){
                return true
            }
            return acceptabletypes.includes(value.type)
            
        })
    })
    const {updatedpost,token,setupdpopup}=useContext(Authcontext)
    const [previewimage2,setpreviewimage2]=useState(updatedpost.image)
    async function handlesubmit(values){
        const formdata=new FormData()
        formdata.append('body',values.body)
        if(values.image){
            formdata.append('image',values.image)
        }
        try {
            const options={
                url:`https://route-posts.routemisr.com/posts/${updatedpost.id}`,
                method:'PUT',
                headers:{
                    token
                },
                data:formdata
            }
            const{data}= await axios.request(options)
            if(data.success){
                toast.success(data.message)
                setupdpopup(false)
                getuserposts()

            }
            
            
        } catch (error) {
            console.log(error);
            
            
        }
        
    }
    const formik=useFormik({
        initialValues:{
            body:updatedpost.body,
            image:null
        },
        validationSchema:validation,

        onSubmit:handlesubmit
    })
   
    
   
    
  return <>
  <div onClick={()=>{
    setupdpopup(false)
  }} className='bg-gray-600/20  fixed inset-0 flex items-center justify-center'>
   <div onClick={(e)=>{
    e.stopPropagation()
   }} className='bg-white p-10 shadow'>
     <form onSubmit={formik.handleSubmit}>
        <div>
            <input type="text" value={formik.values.body} onChange={formik.handleChange} onBlur={formik.handleBlur}  placeholder='edit your post' name='body' className='form-control' />
        </div>
        {formik.errors.body&&formik.touched.body?<p className='text-red-500'>{formik.errors.body}</p>:''}
        <div className='mt-5'>
            <label className='space-x-1 cursor-pointer border bg-gray-300/30 border-gray-500/30 p-1 rounded-xs' htmlFor="image2"><FontAwesomeIcon className='text-gray-400' icon={faImage}/>
        <span>upload new Photo</span>
        </label>
            <input onChange={(e)=>{
               const file=e.target.files[0]
                formik.setFieldValue('image',file)
                const url=URL.createObjectURL(file)
                setpreviewimage2(url)
                
                

            }} type="file" id='image2' name='image' className='hidden' />
        </div>
        {previewimage2?<>
        <div className="image relative w-1/2 mx-auto mt-5">
            <img src={previewimage2} alt='image' className='w-full'/>
            
                <div className='absolute cursor-pointer top-0 right-0 size-8 flex items-center rounded-full justify-center bg-blue-600'>
                    <button onClick={()=>{
                        setpreviewimage2(null)
                    }} className='cursor-pointer'><FontAwesomeIcon icon={faXmark} className='  text-white  '/></button>
                </div>
            
        </div>
        </>:''}
         {formik.errors.body&&formik.touched.body?<p className='text-red-500'>{formik.errors.body}</p>:''}
        <button className='btn bg-blue-500 cursor-pointer hover:-translate-y-2 transition-all duration-200 text-white w-full mt-5'>update</button>

    </form>

   </div>


  </div>
  
  
  </>
}
