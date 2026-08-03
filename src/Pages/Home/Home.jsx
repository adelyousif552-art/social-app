import { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Authcontext } from "../../Context/Auth.context";
import Feed from "../../components/Feed/Feed";
import Postupload from "../../components/postupload/Postupload";
import usePosts from "../../Hooks/usePosts";
import Sidebar1 from "../../components/Sidebar1/Sidebar1";
import Sidebar2 from "../../components/Sidebar2/Sidebar2";

import Popup from "../../components/Popup/Popup";
import Updpopup from "../../components/updatepostpopup/Updpopup";


export default function Home() {
  const {popup,sharedpost,updpopup}=useContext(Authcontext)
  
  
  const {posts,getposts}=usePosts()
  const [refreshsidebar,setrefreshsidebar]=useState(false)
  
  const{token}=useContext(Authcontext)
  
  return <>
   <Navbar/>
  <div className="grid lg:grid-cols-4   gap-5 ">
    <div>
      <Sidebar1 refreshsidebar={refreshsidebar} getposts={getposts}/>
    </div>
    <div className="lg:col-span-2">
   
  <Postupload getposts={getposts}/>
  <Feed setrefreshsidebar={setrefreshsidebar} posts={posts} getposts={getposts}/>
  </div>
  <div className="hidden lg:block">
    <Sidebar2/>
  </div>
  </div>
   {popup?<Popup getposts={getposts} />:''}
   {updpopup?<Updpopup getuserposts={getposts}/>:''}
  
  </>
}
