import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../Context/Auth.context";
import Postcard from "../../components/Postcard/Postcard";
import Navbar from "../../components/Navbar/Navbar";
import PostCardSkeleton from "../../components/Postcardskeleton/Postcardskeleton";


export default function Bookmarks({navbar=true}) {
    const [bookmarks,setbookmarks]=useState(null)
    const {token}=useContext(Authcontext)
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
        console.log(data);
        
    }
    useEffect(()=>{
        getbookmarks()
    },[])
  return <>
 {navbar? <Navbar/>:''}
  <div className="max-w-2xl mx-auto">
    {bookmarks?bookmarks.map((postinfo)=>{
    return <Postcard postinfo={postinfo} key={postinfo.id}/>

  }):<PostCardSkeleton/>}
  </div>
  
  </>
}
