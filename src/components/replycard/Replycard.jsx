import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-regular-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { Authcontext } from "../../Context/Auth.context"

export default function Replycard({reply,postid,getreply}) {

    const {token,userid}=useContext(Authcontext)
    const [editopened,seteditopened]=useState(false)
    const {commentCreator,content,createdAt,likes,image,_id}=reply
    const [previewimage2,setpreviewimage2]=useState(image)
    const likecommentt=likes.includes(userid)

    async function likereply(){
        try {
            const options={
                url:`https://route-posts.routemisr.com/posts/${postid}/comments/${_id}/like`,
                method:'PUT',
                headers:{
                    token
                }
            }
            const {data}=await axios.request(options)
            getreply()
        } catch (error) {
            console.log(error);
        }
    }

    async function deletereply(){
        try {
            const options={
                url:`https://route-posts.routemisr.com/posts/${postid}/comments/${_id}`,
                method:'DELETE',
                headers:{
                    token
                }
            }
            const {data}=await axios.request(options)
            if(data.success){
                toast.success(data.message)
                getreply()
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handlesubmitedit(values){
        try {
            const formdata=new FormData()
            formdata.append('content',values.content)
            if(values.image){
                formdata.append('image',values.image)
            }
            const options={
                url:`https://route-posts.routemisr.com/posts/${postid}/comments/${_id}`,
                method:"PUT",
                headers:{
                    token
                },
                data:formdata
            }
            const {data}=await axios.request(options)
            if(data.success){
                toast.success(data.message)
                seteditopened(false)
                getreply()
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

    const iscommentowner=commentCreator._id===userid

  return <>
  <div className="flex gap-2 mx-20 ">
     <div className="image ">
         <img className="size-12 rounded-full " src={commentCreator.photo} alt={commentCreator.name} />
    </div>
    <div >
        {editopened?<form onSubmit={editformik.handleSubmit}>
            <div className="flex items-center space-x-2 justify-between">
                <div className="flex items-center space-x-2">
                    <input className="form-control" type="text" name="content" value={editformik.values.content} onChange={editformik.handleChange} onBlur={editformik.handleBlur} />
                    <label htmlFor={`replyedit-${_id}`} className="cursor-pointer"><FontAwesomeIcon icon={faImage}/></label>
                    <input type="file" id={`replyedit-${_id}`} className="hidden" onChange={(e)=>{
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
    <button onClick={likereply} className={`cursor-pointer ${likecommentt?'text-blue-600':''}`}>{likecommentt?'liked':'like'}</button>
    {iscommentowner?<button onClick={()=>{
        seteditopened(!editopened)
    }} className="cursor-pointer">Edit</button>:''}
    {iscommentowner?<button onClick={deletereply} className="cursor-pointer">Delete</button>:''}
   </div>
    </div>
   </div>
  </>
}
