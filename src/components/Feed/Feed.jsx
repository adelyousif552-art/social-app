import { useContext, useEffect, useState } from "react";
import Postcard from "../Postcard/Postcard";
import { Authcontext } from "../../Context/Auth.context";
import axios from "axios";
import usePosts from "../../Hooks/usePosts";
import PostCardSkeleton from "../Postcardskeleton/Postcardskeleton";



export default function Feed({posts,getposts,setrefreshsidebar}) {
    const [list,setlist]=useState(false)
    console.log("posts",posts);
    
  
  return <>
  <div className="feed  max-w-2xl my-4 mx-auto">
    <header>
        <h3>Latest Posts</h3>
    </header>
    <div className="allposts space-y-7">
{posts?posts.map((post)=>{
return <Postcard setrefreshsidebar={setrefreshsidebar} list={list} setlist={setlist} key={post.id} postinfo={post} getposts={getposts} showallcomments={true}/>
}):<PostCardSkeleton/>}
    </div>
  </div>
  
  
  </>
}
