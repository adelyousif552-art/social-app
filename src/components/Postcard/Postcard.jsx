import { faBookmark, faComment, faImage, faPenToSquare, faThumbsUp as thumb } from "@fortawesome/free-regular-svg-icons";
import { faCommentSlash, faEllipsisVertical, faHeart, faPaperPlane, faShare, faThumbsUp, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Commentcard from "../Commentcard/Commentcard";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../Context/Auth.context";
import axios from "axios";
import boy from '../../assets/images/boy.png'
import { useFormik } from "formik";
import * as yup from'yup'
import { toast } from "react-toastify";




export default function Postcard({postinfo,getcomments,showallcomments,comments,getposts,setrefreshsidebar}) {
   const {setpopup,setsharedpost,setupdpopup,setupdatedpost,getmyprofile}=useContext(Authcontext)

    
   

    
    
    
    const [openlist,setopenlist]=useState(false)
    const[previewimage,setpreviewimage]=useState(null)
    
    
    async function handlesubmit(values){
      try {
          const formdata=new FormData()
        formdata.append('content',values.content)
       if(values.image){
         formdata.append('image',values.image)
       }
        const options={
            url:`https://route-posts.routemisr.com/posts/${postinfo.id}/comments`,
            method:'POST',
            headers:{
                token
            },
            data:formdata
        }
        const {data}=await axios.request(options)
        
        
        if(data.success){
            
        formik.resetForm()
        getposts()
        if(comments){
            getcomments()
        }
        setpreviewimage(null)
        
        toast.success('comment created successfully')
        }
      } catch (error) {
        toast.error("something went wrong")
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
    
   
    async function putlikes(){
        try {
            const options={
                url:`https://route-posts.routemisr.com/posts/${postinfo.id}/like`,
                method:"PUT",
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
    async function bookmarks(){
        const options={
            url:`https://route-posts.routemisr.com/posts/${postinfo.id}/bookmark`,
            method:'PUT',
            headers:{
                token
            }
        }
        const {data}=await axios.request(options)
        getmyprofile()
        
        
       
        

        
    }
    const [postbookmarked,setpostbookmarked]=useState(postinfo.bookmarked)
   
   
    const {token,userid}=useContext(Authcontext)
     async function deletepost(){
    const options={
url:`https://route-posts.routemisr.com/posts/${postinfo._id}`,
method:"DELETE",
headers:{
    token
}
    }
    const {data}=await axios.request(options)
    if(data.success){
        toast.success(data.message)
        getposts()
        setrefreshsidebar(true)
    }
    
    
 }
 
 
  
  
 
    
    
    
   
    
    const {image,sharesCount,createdAt,user,body,commentsCount,topComment,likes}=postinfo
    const like=likes.includes(userid)
    
    
    
   

   
    
    
    
  return <>
  <div className="postcard bg-white shadow-2xl p-3 mt-2 space-y-3">
    <header className="flex justify-between items-center">
       <div className="flex items-center gap-2">
         <Link to={`/${postinfo.user._id}/profile`} className="image cursor-pointer">
            <img className="size-12 rounded-full " src={user.photo} alt={user.name} />

        </Link>
        <div>
            <h6 className="font-semibold">{user.name}</h6>
            <time className="text-sm text-gray-600/80"><Link to={`/post/${postinfo.id}`}>{new Date(createdAt).toDateString()}</Link></time>
        </div>
       </div>
      <div className="relative">
         <button onClick={()=>{
            setopenlist(!openlist)
         }} className="cursor-pointer">
        <FontAwesomeIcon icon={faEllipsisVertical} />
       </button>
      {openlist? <div className="bg-white min-w-40 absolute right-0 shadow-xl py-2 rounded-xl">
        <ul className="space-y-3 *:cursor-pointer  *:hover:bg-blue-500 *:hover:text-white *:transition-all *:duration-200 *:p-2">
            <li className={`${postbookmarked?'bg-blue-500 text-white':''}`}>
               <button   onClick={()=>{
                
                bookmarks()
                setpostbookmarked(!postbookmarked)
                setopenlist(false)
               }} className={`flex w-full cursor-pointer items-center  `} >
                 <FontAwesomeIcon icon={faBookmark} />
                <span>Bookmark</span>
               </button>
            </li>
            {postinfo.user._id==userid?<> <li>
               <button onClick={()=>{
                setupdpopup(true)
                setupdatedpost(postinfo)
                setopenlist(false)
               }} className=" w-full flex items-center cursor-pointer"> <FontAwesomeIcon icon={faPenToSquare} />
                <span>Edit Post</span></button>
            </li>
             <li>
                <button onClick={()=>{
                    deletepost()
                    setopenlist(false)

                }} className="flex w-full items-center cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} />
                <span>Delete Post</span>
                </button>
            </li></>:''}
        </ul>

       </div>:''}
      </div>
      
    </header>
    {postinfo.sharedPost?<div className="p-2"><p>{postinfo.body}</p></div>:''}
    {postinfo.sharedPost?<>
     <header className="flex justify-between items-center">
       <div className="flex items-center gap-2">
         <Link to={`/${postinfo.sharedPost.user._id}/profile`} className="image cursor-pointer">
            <img className="size-12 rounded-full " src={postinfo.sharedPost.user.photo} alt={postinfo.sharedPost.user.name} />

        </Link>
        <div>
            <h6 className="font-semibold">{postinfo.sharedPost.user.name}</h6>
            <time className="text-sm text-gray-600/80"><Link to={`/post/${postinfo.sharedPost.id}`}>{new Date(postinfo.sharedPost.createdAt).toDateString()}</Link></time>
        </div>
       </div>
      
    </header>
    <div className="postinfo space-y-5">
        <p>{postinfo.sharedPost.body}</p>
        {postinfo.sharedPost.image?<div className="image -mx-3">
            <img className="w-full " src={postinfo.sharedPost.image} alt="" />
        </div>:''}
        <div className="reactions flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <div className="icons *:hover:scale-110 *:transition-transform *:duration-200 *:p-2 *:rounded-full *:text-white space-x-2 ">
                <FontAwesomeIcon className="bg-blue-500" icon={faThumbsUp}/>
                <FontAwesomeIcon className="bg-red-500" icon={faHeart}/>
                
            </div>
            <span className="text-sm text-gray-600/80">{likes.length}</span>
            </div>
           <span className="text-sm text-gray-600/80">{commentsCount} Comments</span>
        </div>
        <div className="reactionbuttons *:cursor-pointer *:hover:bg-gray-100 *:transition-colors *:duration-200 flex *:grow *:p-3">
            <button onClick={putlikes} className={`border-y ${like?'text-blue-600 font-semibold':''}  transition-colors duration-400  border-gray-500/70 `}>
                <FontAwesomeIcon className={``} icon={faThumbsUp}/>
                <span>Like</span>
            </button>
             <label htmlFor={`${postinfo.id}comment`} className="border-y text-center border-gray-500/70">
                <FontAwesomeIcon icon={faComment} />
                <span>Comment</span>
            </label>
             <button onClick={()=>{
                setpopup(true)
                setsharedpost(postinfo)
                
             }} className="border-y border-gray-500/70">
                <FontAwesomeIcon icon={faShare} />
                <span>Share</span>
            </button>
        </div>
        <div className="comments space-y-4">
            <form onSubmit={formik.handleSubmit}>
               <div className="flex items-center gap-2">
                 <div className="profileimage">
                    <img src={boy} className="size-12 rounded-full" alt="user" />
                </div>
                <div className="commentinput grow">
                    <input type="text"
                     id={`${postinfo.id}comment`}
                      placeholder="write a comment"
                       className="form-control"
                       name="content"
                       onChange={formik.handleChange}
                       
                       value={formik.values.content}
                       />
                       {formik.errors.content?<p className="text-red-500">{formik.errors.content}</p>:''}
                </div>
                <div className="file">
                    <label className="size-8 rounded-full flex items-center justify-center border border-gray-400/50 cursor-pointer hover:bg-gray-400/50 transition-colors duration-200" htmlFor={postinfo.id}><FontAwesomeIcon icon={faImage}/></label>
                    <input type="file"
                     id={postinfo.id}
                      className="hidden"
                      name="image"
                      onChange={(e)=>{
                        const file=e.target.files[0]
                        formik.setFieldValue('image',file)
                        setpreviewimage(URL.createObjectURL(file))
                       
                        
                        
                        
                      }}
                      onBlur={formik.handleBlur}
                       />
                       
                </div>
                <div className="sendbutton">
                    <button className="size-8 rounded-full flex items-center justify-center border border-gray-400/50 cursor-pointer hover:bg-gray-400/50 transition-colors duration-200 " type="submit"><FontAwesomeIcon className="text-sm" icon={faPaperPlane}/></button>
                </div>
                {formik.errors.image&&formik.touched.image?<p className="text-red-500">{formik.errors.image}</p>:''}
               </div>
               
             {previewimage? <div className="previewimage relative bg-gray-300/25 border border-gray-400/50 max-w-1/6 p-3 my-2">
                <img className="w-full" src={previewimage} alt="" />
                <button onClick={()=>{
                    setpreviewimage(null)
                    formik.setFieldValue('image',null)
                }} className="absolute bg-blue-500 size-7 flex items-center justify-center text-xs cursor-pointer rounded-full text-white right-2 top-1/2 -translate-y-1/2"><FontAwesomeIcon className="" icon={faXmark}/></button>
               </div>:''}
            </form>
           {comments?comments.map((comment)=>{
            return <Commentcard key={comment._id} getposts={getposts} postid={postinfo.id} reply={comment.repliesCount} topcomment={comment}/>
           }):showallcomments?commentsCount?<><Commentcard postid={postinfo.id} getposts={getposts} topcomment={topComment}/><Link to={`/post/${postinfo.id}`} className="w-full text-center bg-linear-to-r from-blue-400 to-blue-700 text-white py-2 rounded-xl cursor-pointer">show all comments</Link></>:<p className="text-center">no comments yet</p>:commentsCount?<><Commentcard postid={postinfo.id} getposts={getposts} topcomment={topComment}/></>:<p className="text-center">no comments yet</p>
           }
           
           
        </div>
    </div></>:<div className="postinfo space-y-5">
        <p>{body}</p>
        {image?<div className="image -mx-3">
            <img className="w-full h-120 object-cover object-center" src={image} alt="" />
        </div>:''}
        <div className="reactions flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <div className="icons *:hover:scale-110 *:transition-transform *:duration-200 *:p-2 *:rounded-full *:text-white space-x-2 ">
                <FontAwesomeIcon className="bg-blue-500" icon={faThumbsUp}/>
                <FontAwesomeIcon className="bg-red-500" icon={faHeart}/>
                
            </div>
            <span className="text-sm text-gray-600/80">{likes.length}</span>
            </div>
           <span className="text-sm text-gray-600/80">{commentsCount} Comments</span>
        </div>
        <div className="reactionbuttons *:cursor-pointer *:hover:bg-gray-100 *:transition-colors *:duration-200 flex *:grow *:p-3">
            <button onClick={putlikes} className={`border-y ${like?'text-blue-600 font-semibold':''}  transition-colors duration-400  border-gray-500/70 `}>
                <FontAwesomeIcon className={``} icon={faThumbsUp}/>
                <span>Like</span>
            </button>
             <label htmlFor={`${postinfo.id}comment`} className="border-y text-center border-gray-500/70">
                <FontAwesomeIcon icon={faComment} />
                <span>Comment</span>
            </label>
             <button onClick={()=>{
                setpopup(true)
                setsharedpost(postinfo)
                
             }} className="border-y border-gray-500/70">
                <FontAwesomeIcon icon={faShare} />
                <span>Share</span>
            </button>
        </div>
        <div className="comments space-y-4">
            <form onSubmit={formik.handleSubmit}>
               <div className="flex items-center gap-2">
                 <div className="profileimage">
                    <img src={boy} className="size-12 rounded-full" alt="user" />
                </div>
                <div className="commentinput grow">
                    <input type="text"
                     id={`${postinfo.id}comment`}
                      placeholder="write a comment"
                       className="form-control"
                       name="content"
                       onChange={formik.handleChange}
                       
                       value={formik.values.content}
                       />
                       {formik.errors.content?<p className="text-red-500">{formik.errors.content}</p>:''}
                </div>
                <div className="file">
                    <label className="size-8 rounded-full flex items-center justify-center border border-gray-400/50 cursor-pointer hover:bg-gray-400/50 transition-colors duration-200" htmlFor={postinfo.id}><FontAwesomeIcon icon={faImage}/></label>
                    <input type="file"
                     id={postinfo.id}
                      className="hidden"
                      name="image"
                      onChange={(e)=>{
                        const file=e.target.files[0]
                        formik.setFieldValue('image',file)
                        setpreviewimage(URL.createObjectURL(file))
                       
                        
                        
                        
                      }}
                      onBlur={formik.handleBlur}
                       />
                       
                </div>
                <div className="sendbutton">
                    <button className="size-8 rounded-full flex items-center justify-center border border-gray-400/50 cursor-pointer hover:bg-gray-400/50 transition-colors duration-200 " type="submit"><FontAwesomeIcon className="text-sm" icon={faPaperPlane}/></button>
                </div>
                {formik.errors.image&&formik.touched.image?<p className="text-red-500">{formik.errors.image}</p>:''}
               </div>
               
             {previewimage? <div className="previewimage relative bg-gray-300/25 border border-gray-400/50 max-w-1/6 p-3 my-2">
                <img className="w-full" src={previewimage} alt="" />
                <button onClick={()=>{
                    setpreviewimage(null)
                    formik.setFieldValue('image',null)
                }} className="absolute bg-blue-500 size-7 flex items-center justify-center text-xs cursor-pointer rounded-full text-white right-2 top-1/2 -translate-y-1/2"><FontAwesomeIcon className="" icon={faXmark}/></button>
               </div>:''}
            </form>
           {comments?comments.map((comment)=>{
            return <Commentcard key={comment._id} postid={postinfo.id} getposts={getcomments} reply={comment.repliesCount} topcomment={comment}/>
           }):showallcomments?commentsCount?<><Commentcard postid={postinfo.id} getposts={getposts} topcomment={topComment}/><Link to={`/post/${postinfo.id}`} className="w-full text-center bg-linear-to-r from-blue-400 to-blue-700 text-white py-2 rounded-xl cursor-pointer">show all comments</Link></>:<p className="text-center">no comments yet</p>:commentsCount?<><Commentcard postid={postinfo.id} getposts={getposts} topcomment={topComment}/></>:<p className="text-center">no comments yet</p>
           }
           
           
        </div>
    </div>}
   
  </div>
  
   
  
  </>
}
