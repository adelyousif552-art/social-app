import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../Context/Auth.context";
import Postcard from "../../components/Postcard/Postcard";
import Navbar from "../../components/Navbar/Navbar";
import PostCardSkeleton from "../../components/Postcardskeleton/Postcardskeleton";
import Popup from '../../components/Popup/Popup'

export default function Bookmarks({navbar=true,getposts}) {
  const {popup}=useContext(Authcontext)
    const [comments,setcomments]=useState(null)
    const [bookmarks,setbookmarks]=useState(null)
    const {token}=useContext(Authcontext)
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
    async function getbookmarks(){
        const options={
            url:'https://route-posts.routemisr.com/users/bookmarks',
            method:"GET",
            headers:{
                token
            }
        }
        const {data}=await axios.request(options)
        setbookmarks(data.data.bookmarks)
       
        
    }
    useEffect(()=>{
        getbookmarks()
    },[])
  return <>
 {navbar? <Navbar/>:''}
  <div className="max-w-2xl mx-auto">
    {bookmarks?bookmarks.map((postinfo)=>{
    return <Postcard  getposts={getbookmarks} postinfo={postinfo} key={postinfo.id}/>

  }):<PostCardSkeleton/>}
  </div>
{popup?<Popup getposts={getposts}/>:''}
  
  </>
}
