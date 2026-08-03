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


export default function Commentcard({topcomment,reply,postid}) {
    
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
    useEffect(()=>{
        getreply()
    },[])

    
  return <>
  
  <div className="flex  gap-2 ">
             <div className="image ">
                 <img className="size-12 rounded-full " src={commentCreator.photo} alt={commentCreator.name} />
            </div>
            <div >
                <div className="commenttext  max-w-xl bg-gray-400/20 p-3 rounded-xl">
                    <p>{content}</p>

                </div>
                {image?<div>
                    <img className="size-20" src={image} alt="user" />

                </div>:''}
                 <div className="space-x-3">
            <span>{new Date(createdAt).toDateString()}</span>
            <button className="cursor-pointer">Like</button>
            <button onClick={()=>{
                setreplyopened(!replyopened)
            }} className="cursor-pointer">Reply</button>
           </div>
                
            </div>
           
           </div>
           <Commentreply reply={replycomments.length}  image={image} setshowreplies={setshowreplies} boy={boy} showreplies={showreplies} replyopened={replyopened} formik={formik} postid={postid} previewimage={previewimage} setpreviewimage={setpreviewimage} replycomments={replycomments}/>
          
  </>
}
