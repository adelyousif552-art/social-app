import { useContext, useEffect, useState } from "react"
import { Authcontext } from "../../Context/Auth.context"
import Postcard from "../../components/Postcard/Postcard"
import axios from "axios"
import { useParams } from "react-router"

import Popup from "../../components/Popup/Popup"
import PostCardSkeleton from "../../components/Postcardskeleton/Postcardskeleton"


export default function Postdetails() {
  const [comments,setcomments]=useState(null)
  const {id}=useParams()
  const [post,setpost]=useState(null)
  const {popup}=useContext(Authcontext)
  
   async function getcomments(){
          const options={
              url:`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
              method:"GET",
              headers:{
                token
              }
              
  
          }
          const {data}=await axios.request(options)
          
          setcomments(data.data.comments)
         
          
          
          
          
          
      }
  
  const {token}=useContext(Authcontext)
  async function getpost(){
    try {
    const options={
      url:`https://route-posts.routemisr.com/posts/${id}`,
      method:'GET',
    headers:{
      token
    }
    }
    const {data}=await axios.request(options)
    setpost(data.data.post)
    
    
    
  } catch (error) {
    console.log('axios',error);
    
    
  }
  }
   
     
  
  useEffect(()=>{
    getpost()
    getcomments()
    
    
  },[])

  return <>
  <div className="post max-w-2xl mx-auto">
    {post?<Postcard postinfo={post} getpost={getpost} getposts={getpost} getcomments={getcomments} comments={comments} />:<PostCardSkeleton/>}
   
  </div>
  {popup?<Popup/>:''}
  
  </>
}
