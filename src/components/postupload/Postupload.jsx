
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import boy from '../../assets/images/boy.png'
import Formfield from '../UI/formfield/Formfield'
import { faImage, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useContext, useState } from 'react'
import { Authcontext } from '../../Context/Auth.context'
import axios from 'axios'
export default function Postupload({getposts}) {
    const{profile}=useContext(Authcontext)
    const [previewimage,setpreviewimage]=useState(null)
    const {token}=useContext(Authcontext)
    const validation=yup.object({
        body:yup.string().required('caption is required').min(3,'min characters 3').max(500,'max characters 500'),
        image:yup.mixed().nullable().test('size','max size is 5mb',(file)=>{
            if(!file){
                return true
            }
            return file.size<= 5*1024*1024

        }).test('type','not acceptable type',(file)=>{
            if(!file){
                return true
            }
            const acceptabletypes=['image/jpg','image/png','image/jpeg']
            return acceptabletypes.includes(file.type)
        })
    })
    async function handlesubmit(values){
        const formdata=new FormData()
        formdata.append('body',values.body)
        if(values.image){
            formdata.append('image',values.image)
        }
        try {
            const options={
                url:'https://route-posts.routemisr.com/posts',
                method:"POST",
                headers:{
                    token
                },
                data:formdata
            }
            const{data}=await axios.request(options)
            getposts()
            formik.resetForm()
            
        } catch (error) {
            console.log(error);
            
        }
        
    }
    const formik=useFormik({
        initialValues:{
            body:'',
            image:null
        },
        validationSchema:validation,
        onSubmit:handlesubmit
    })
  return <>
  <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto bg-white p-4 mt-10">
    <div className='flex items-center gap-2'>
        <div className="icon">
            <img src={profile?.user.photo} alt={profile?.user.name} className='size-12 rounded-full' />
        </div>
        <div>
            <h2 className='font-semibold'>Create a Post</h2>
            <p className='text-sm text-gray-500/80'>Share your thoughts with the world</p>
        </div>

    </div>
    <div>
        <Formfield elementtype={'textarea'} placeholder={"what's in your mind"} name={'body'} touched={formik.touched.body} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.body} error={formik.errors.body}/>
    </div>
   {previewimage?<> <div className="image relative">
        <img src={previewimage} className='w-full' alt="photo" />
        <button onClick={()=>{
            setpreviewimage(null)
            formik.setFieldValue('image',null)
        }} className='absolute top-3 right-5 size-7 cursor-pointer hover:bg-red-800 transition-colors duration-200  bg-red-500 rounded-full'><FontAwesomeIcon className='   text-white  ' icon={faXmark}/></button>
    </div></>:''}
    <div className='flex items-center justify-between'>
       <div>
         <label className='space-x-1 cursor-pointer border border-gray-500/30 p-1 rounded-xs' htmlFor="image"><FontAwesomeIcon className='text-gray-400' icon={faImage}/>
        <span>Photo</span>
        </label>
        <input 
        type="file"
         className='hidden'
          id='image'
          name='image'
          onChange={(e)=>{
            const file=e.target.files[0]
            formik.setFieldValue('image',file)
            const url=URL.createObjectURL(file)
            setpreviewimage(url)
          }}
          onBlur={formik.handleBlur}
         
          
          
        
        
        />
        {formik.errors.image&&formik.touched.image?<p className='text-red-500'>{formik.errors.image}</p>:''}
       </div>
       <button className='btn space-x-1 bg-linear-to-r from-blue-600 to-blue-400 text-white'>
        <span>Post</span>
        <FontAwesomeIcon icon={faPaperPlane}/>
       </button>
    </div>

  </form>
  
  
  </>
}
