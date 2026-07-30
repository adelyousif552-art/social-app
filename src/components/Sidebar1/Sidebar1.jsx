import React, { useContext, useEffect, useState } from 'react'
import boy from '../../assets/images/boy.png'

import { Authcontext } from '../../Context/Auth.context'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Sidebar1Skeleton from '../sidebar1skeleton/Sidebarskeleton'


export default function Sidebar1({getposts,refreshsidebar}) {
    const[previewimage,setpreviewimage]=useState(null)
    const {getuserprofile,profile}=useContext(Authcontext)
    const validationschema=yup.object({
        photo:yup.mixed().test('size','max size is 5mb',(file)=>{
           
            return file.size<= 5*1024*1024

        }).test('type','not acceptable type',(file)=>{
           
            const acceptabletypes=['image/jpg','image/png','image/jpeg']
            return acceptabletypes.includes(file.type)
        })
    })
      const formik=useFormik({
            initialValues:{
                photo:''
            },
            validationSchema:validationschema,
            onSubmit:handlesubmit
        })
    
    const{userid}=useContext(Authcontext)
    const [posts,setposts]=useState(null)
    const {token}=useContext(Authcontext)
    const [myprofile,setmyprofile]=useState(null)
    async function getuserposts(){
    const options={
      url:`https://route-posts.routemisr.com/users/${userid}/posts`,
      method:'GET',
      headers:{
        token
      }
    }
    const{data}=await axios.request(options)
    setposts(data.data.posts)
    console.log("userposts",data);
    
  }
  async function handlesubmit(values){
    try {
        const formdata=new FormData()
        formdata.append('photo',values.photo)
        const options={
            url:'https://route-posts.routemisr.com/users/upload-photo',
            method:"PUT",
            headers:{
                token
            },
            data:formdata
        }

        const {data}=await axios.request(options)
        if(data.success){
            getuserprofile(userid)
            getposts()
            toast.success(data.message)
            setpreviewimage(null)
        }
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    }
    
    
  }
    
     useEffect(()=>{
        getuserprofile(userid)
        
        getuserposts()
     },[refreshsidebar])
     console.log("Sidebar userid =", userid);
  return <>
  {profile?<section className="firsts  max-w-2xl mx-auto sticky top-0  ">
    <div className="sidebar1 bg-linear-to-b  from-blue-500 from-25% to-white to-25% rounded-2xl shadow p-5 mt-10 h-fit">
<div className="flex justify-between  items-center">
    <div className="photo">
    <img className='size-20 border border-black rounded-full' src={previewimage?previewimage:profile?.user.photo} alt={profile?.user.name}/>
    <div className="userinfo">
    <h1>{profile?.user.name}</h1>
    <h6 className='text-sm text-gray-600/90'>
        @{profile?.user.username}
    </h6>
    
</div>
</div>
<form className='' onSubmit={formik.handleSubmit}>
    <div className='mt-10'>
    <label htmlFor='upphoto' className='btn shadow  font-bold text-sm '> change profile picture</label>
    <input name='upphoto' onChange={(e)=>{
        const file=e.target.files[0]
        if(file){
            formik.setFieldValue('photo',file)
            const url=URL.createObjectURL(file)
    
        setpreviewimage(url)
        }
        
    }} onBlur={formik.handleBlur} type="file" className='hidden ' id='upphoto' />
    
</div>
{previewimage?<button type='submit' className='btn bg-linear-to-r my-1  from-blue-600 text-white  to-blue-500 shadow text-sm font-bold'>update profile picture</button>:''}

</form>
</div>

<div>
    <ul className='flex items-center gap-3 justify-between mt-10'>
        <li className='text-center'>
            <h6 className='font-bold'>{posts?.length}</h6>
            <span className='text-gray-600/90'>Posts</span>
        </li>
         <li className='text-center'>
            <h6 className='font-bold'>{profile?.user.followers.length}</h6>
            <span className='text-gray-600/90'>{profile?.user.followers.length>1?"Followers":'Follower'}</span>
        </li>
         <li className='text-center'>
            <h6 className='font-bold'>{profile?.user.following.length}</h6>
            <span className='text-gray-600/90'>Following</span>
        </li>
    </ul>
</div>
  </div>
  
  </section>:<Sidebar1Skeleton/>}
  
  
  
  </>
}
