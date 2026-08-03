import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Authcontext } from "../Context/Auth.context"


export default function usePosts() {
     const [posts,setposts]=useState(null)
    const{token}=useContext(Authcontext)
    async function getposts(){
        const options={
            url:'https://route-posts.routemisr.com/posts',
            method:"GET",
            headers:{
                token
            }

        }
        const {data}=await axios.request(options)
        
        setposts(data.data.posts)
        
        
    }
    useEffect(()=>{
        getposts()
    },[])
  return {posts,getposts}
}
