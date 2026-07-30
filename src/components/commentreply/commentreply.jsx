import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Authcontext } from '../../Context/Auth.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faImage, faPaperPlane } from '@fortawesome/free-regular-svg-icons'

export default function Commentreply({replyopened,reply,formik,postid,previewimage,setpreviewimage,showreplies,replycomments,setshowreplies,image,boy}) {
    
    
    const{token}=useContext(Authcontext)
   
    
  return <>
  {replyopened? <form onSubmit={formik.handleSubmit}>
               <div className="flex items-center gap-2">
                 <div className="profileimage">
                    <img src={boy} className="size-12 rounded-full" alt="user" />
                </div>
                <div className="commentinput grow">
                    <input type="text"
                     id="comment"
                      placeholder="write a comment"
                       className="form-control"
                       name="content"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.content}
                       />
                       {formik.errors.content&&formik.touched.content?<p className="text-red-500">{formik.errors.content}</p>:''}
                </div>
                <div className="file">
                    <label className="size-8 rounded-full flex items-center justify-center border border-gray-400/50 cursor-pointer hover:bg-gray-400/50 transition-colors duration-200" htmlFor={postid}><FontAwesomeIcon icon={faImage}/></label>
                    <input type="file"
                     id={postid}
                      className="hidden"
                      name="image"
                      onChange={(e)=>{
                        const file=e.target.files[0]
                        formik.setFieldValue('image',file)
                        setpreviewimage(URL.createObjectURL(file))
                        console.log(file);
                        console.log(URL.createObjectURL(file));
                        console.log(previewimage);
                        
                        
                        
                      }}
                      onBlur={formik.handleBlur}
                       />
                       
                </div>
                <div className="sendbutton">
                    <button className="size-8 rounded-full flex items-center justify-center border border-gray-400/50 cursor-pointer hover:bg-gray-400/50 transition-colors duration-200 " type="submit"><FontAwesomeIcon className="text-sm" icon={faPaperPlane}/></button>
                </div>
                {formik.errors.image&&formik.touched.image?<p className="text-red-500">{formik.errors.image}</p>:''}
               </div>
               {console.log("last",previewimage) }
             {previewimage? <div className="previewimage relative bg-gray-300/25 border border-gray-400/50 max-w-1/6 p-3 my-2">
                <img className="w-full" src={previewimage} alt="" />
                <button onClick={()=>{
                    setpreviewimage(null)
                    formik.setFieldValue('image',null)
                }} className="absolute bg-blue-500 size-7 flex items-center justify-center text-xs cursor-pointer rounded-full text-white right-2 top-1/2 -translate-y-1/2"><FontAwesomeIcon className="" icon={faXmark}/></button>
               </div>:''}
            </form>:''}
           {reply? <>
           <button onClick={()=>{
            setshowreplies(!showreplies)

           }} className="font-bold cursor-pointer mx-20">Show replies (+{reply})</button>

           {showreplies?replycomments.map((replycomment)=>{
            return <div className="flex  gap-2 mx-20 ">
             <div className="image ">
                 <img className="size-12 rounded-full " src={replycomment.commentCreator.photo} alt={replycomment.commentCreator.name} />
            </div>
            <div >
                <div className="commenttext  max-w-xl bg-gray-400/20 p-3 rounded-xl">
                    <p>{replycomment.content}</p>

                </div>
                {image?<div>
                    <img className="size-20" src={image} alt="user" />

                </div>:''}
                 <div className="space-x-3">
            <span>{new Date(replycomment.createdAt).toDateString()}</span>
            <button className="cursor-pointer">Like</button>
            <button className="cursor-pointer">Reply</button>
           </div>
                
            </div>
           
           </div>
           })
           




           :''}
           
           </>:''}
  
  </>
}
