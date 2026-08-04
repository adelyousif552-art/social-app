import axios from "axios"
import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import * as yup from'yup'
import boy from '../../assets/images/boy.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { Authcontext } from "../../Context/Auth.context"
import Commentreply from "../commentreply/commentreply"


export default function Commentcard({topcomment,reply,postid,getposts}) {
   
    
    const {userid}=useContext(Authcontext)
 
    const [editopened,seteditopened]=useState(false)
    
    
    const [replycomments,setreplycomments]=useState([])
     async function getreply(){
              try {
                  const options ={
                      url:`https://route-posts.routemisr.com/posts/${postid}/comments/${topcomment._id}/replies?page=1&limit=10`,
                      method:"GET",
                      headers:{
                          token
                      }
                  }
                  const {data}=await axios.request(options)
                  console.log("replycomments",data);
                  setreplycomments(data.data.replies)
                  
                  
                  
              } catch (error) {
                  console.log(error);
                  
              }
          }
    const[showreplies,setshowreplies]=useState(false)
    const {token}=useContext(Authcontext)
     async function handlesubmit(values){
      try {
          const formdata=new FormData()
        formdata.append('content',values.content)
       if(values.image){
         formdata.append('image',values.image)
       }
        const options={
            url:`https://route-posts.routemisr.com/posts/${postid}/comments/${topcomment._id}/replies`,
            method:'POST',
            headers:{
                token
            },
            data:formdata
        }
        const {data}=await axios.request(options)
        
        
        
        if(data.success){
            
        formik.resetForm()
        getreply()
        setreplyopened(!replyopened)
        
        
        toast.success('reply created successfully')
        }
      } catch (error) {
        toast.error("something went wrong")
        console.log(error);
        
      }
        
        
    }
    const validation=yup.object({
        content:yup.string().required('comment required'),
        image:yup.mixed().nullable().test('size','max size 5mb',(file)=>{
            if(!file){
                return true;
            }
            return file.size<=5*1024*1024

        }).test("type",'not supported type',(file)=>{
            if(!file){
                return true;
            }
            const acceptabletypes=['image/jpg','image/png','image/jpeg']
            return acceptabletypes.includes(file.type)

        })
    })
    const likecommentt=topcomment.likes.includes(userid)
    const formik=useFormik({
        initialValues:{
            content:'',
            image:null
        },
        validationSchema:validation,


        onSubmit:handlesubmit
    })
    const [replyopened,setreplyopened]=useState(false)
    const[previewimage,setpreviewimage]=useState(null)
   
    const {commentCreator,content,createdAt,likes,image}=topcomment
    const [previewimage2,setpreviewimage2]=useState(image)
    useEffect(()=>{
        getreply()
    },[])
      async function handlesubmitedit(values){
        try {
            const formdata=new FormData()
            formdata.append('content',values.content)
            if(values.image){
                formdata.append('image',values.image)
            }
            const options={
                url:`https://route-posts.routemisr.com/posts/${postid}/comments/${topcomment._id}`,
                method:"PUT",
                headers:{
                    token
                },
                data:formdata
            }
            const {data}=await axios.request(options)
            console.log(data);
            if(data.success){
                toast.success(data.message)
                seteditopened(false)
              
                getposts()
              if(values.image){
                 const url=URL.createObjectURL(values.image)
              
                
                setpreviewimage2(url)
              }else{
                setpreviewimage2(null)
              }
              
            }
            
            
        } catch (error) {
            console.log("axios error",error);
            
        }
        
    }
    const editformik=useFormik({
        initialValues:{
            content:content,
            image:null

        },
        onSubmit:handlesubmitedit
    })
    async function deletecomment(){
        try {
            const options={
                url:`https://route-posts.routemisr.com/posts/${postid}/comments/${topcomment._id}`,
                method:'DELETE',
                headers:{
                    token
                }
            }
            const {data}=await axios.request(options)
            if(data.success){
                toast.success(data.message)
                getposts()
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    async function likecomment(){
        try {
            const options={
                url:`https://route-posts.routemisr.com/posts/${postid}/comments/${topcomment._id}/like`,
                method:'PUT',
                headers:{
                    token
                }
            }
            const {data}=await axios.request(options)
            getposts()
            
        } catch (error) {
            console.log(error);
            
        }
    }

    
  return <>
  
  <div className="flex  gap-2 ">
             <div className="image ">
                 <img className="size-12 rounded-full " src={commentCreator.photo} alt={commentCreator.name} />
            </div>
            <div >
                {editopened?<form onSubmit={editformik.handleSubmit}>
                    <div className="flex items-center space-x-2 justify-between">
                        <div className="flex items-center space-x-2">
                            <input className="form-control" type="text" name="content" value={editformik.values.content} onChange={editformik.handleChange} onBlur={editformik.handleBlur} />
                            <label htmlFor="comedit" className="cursor-pointer"><FontAwesomeIcon icon={faImage}/></label>
                            <input type="file" id="comedit" className="hidden" onChange={(e)=>{
                               const file2= e.target.files[0]
                               editformik.setFieldValue('image',file2)
                               const url=URL.createObjectURL(file2)
                               setpreviewimage2(url)
                            }} />
                        </div>
                        <button type="submit" className="btn border border-blue-500">save</button>
                        <button type="button" onClick={()=>{
                            seteditopened(false)

                        }} className="btn border border-red-500">cancel</button>
                    </div>
                    {previewimage2?<div className="relative size-20">
                        <img className="w-full" src={previewimage2} alt="user" />
                        <div onClick={()=>{
                            setpreviewimage2(null)
                            editformik.setFieldValue('image',null)
                        }} className="size-7 absolute top-0 -right-3 flex items-center justify-center bg-red-500 rounded-full">
                            <FontAwesomeIcon icon={faXmark} className="text-white cursor-pointer"/>
                        </div>

                    </div>:''}

                </form>:<div className="commenttext  max-w-xl bg-gray-400/20 p-3 rounded-xl">
                    <p>{content}</p>

                </div>}
                {image&&!editopened?<div>
                    <img className="size-20" src={image} alt="user" />

                </div>:''}
                 <div className="space-x-3">
            <span>{new Date(createdAt).toDateString()}</span>
            <button onClick={likecomment} className={`cursor-pointer ${likecommentt?'text-blue-600':''}`}>{likecommentt?'liked':'like'}</button>
            <button onClick={()=>{
                setreplyopened(!replyopened)
            }} className="cursor-pointer">Reply</button>
            <button onClick={()=>{
                seteditopened(!editopened)
            }} className="cursor-pointer">Edit</button>
            <button onClick={deletecomment} className="cursor-pointer">Delete</button>
           </div>
                
            </div>
           
           </div>
           <Commentreply commentid={topcomment._id} getreply={getreply} reply={replycomments.length}  image={image} setshowreplies={setshowreplies} boy={boy} showreplies={showreplies} replyopened={replyopened} formik={formik} postid={postid} previewimage={previewimage} setpreviewimage={setpreviewimage} replycomments={replycomments}/>
          
  </>
}
