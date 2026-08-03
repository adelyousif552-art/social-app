import axios, { Axios } from "axios";
import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../Context/Auth.context";
import Navbar from "../../components/Navbar/Navbar";
import Postcard from "../../components/Postcard/Postcard";
import PostCardSkeleton from "../../components/Postcardskeleton/Postcardskeleton";
import Bookmarks from "../Bookmarks/Bookmarks";
import cover from '../../assets/images/y.jpg'
import { useParams } from "react-router";
import Updpopup from "../../components/updatepostpopup/Updpopup";




export default function Profile() {
  const [openfollowers,setopenfollowers]=useState(false)
  const [follow,setfollow]=useState(false)
  const {id}=useParams()
  const [following,setfollowing]=useState(false)
  const [comments,setcomments]=useState(null)
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
  async function followuser(usid){
    const options={
      url:`https://route-posts.routemisr.com/users/${usid}/follow`,
      method:"PUT",
      headers:{
        token
      }
    }
    const{data}=await axios.request(options)
    await getuserprofile(id)
    await getmyprofile()
   
    

   
    
  }
   async function getuserprofile(id){
        const options={
            url:`https://route-posts.routemisr.com/users/${id}/profile`,
            method:"GET",
            headers:{
                token
            }
        }
        const {data}=await axios.request(options)
        setuserprofile(data.data)
        setfollow(data.data.isFollowing)
        
       
        
    }
  
  
  const {userid,setupdpopup,updpopup,popup}=useContext(Authcontext)
  const [posts,setposts]=useState(null)
  const [openposts,setopenposts]=useState(true)
  const [bookmarks,setbookmarks]=useState(false)
  const [openfollowing,setopenfollowing]=useState(false)

  const [myprofile,setmyprofile]=useState(null)
  const [userprofile,setuserprofile]=useState(null)
  const {token}=useContext(Authcontext)
  async function getuserposts(){
    const options={
      url:`https://route-posts.routemisr.com/users/${id}/posts`,
      method:'GET',
      headers:{
        token
      }
    }
    const{data}=await axios.request(options)
    setposts(data.data.posts)
    
    
  }
  async function getmyprofile(){
      const options={
          url:'https://route-posts.routemisr.com/users/profile-data',
          method:"GET",
          headers:{
              token
          }
      }
      const {data}=await axios.request(options)
      setmyprofile(data.data)
      console.log("myprofile",data);
      
     }
     useEffect(()=>{
      getmyprofile()
      
       
        getuserprofile(id)
       
        
        
      
      getuserposts()
     
     },[id])
     const profile=id===userid?myprofile:userprofile
  return <>
  <Navbar/>
  
  <div className="bg-white rounded-xl p-5 shadow max-w-2xl mx-auto mt-10">
    <div className="coverphoto rounded-2xl  ">
      <img className="w-full h-60 rounded-2xl" src={cover} alt="" />
    </div>
   <div className="flex items-center justify-between">
    <div className="user flex items-center gap-2  ">
     <div className="userimage">

      <img className="size-20 rounded-full" src={profile?.user.photo} alt={profile?.user.name} />
    </div>
    <div>
      <h1 >{profile?.user.name}</h1>
      <span className="text-gray-600/80">@{profile?.user.username}</span>
    </div>
   </div>
   {id===userid?'':<button onClick={()=>{
    followuser(profile?.user._id)
   }} className="btn bg-linear-to-r hover:-translate-y-1 transition-transform duration-400 from-blue-600 to-blue-500 text-white">{follow?'unFollow':'Follow'}</button>}
   </div>
   
   <div className="p-5">
    <ul className="flex  items-center gap-3 mt-5 ">
      <li>{posts?.length} <span className="text-gray-800/80">{posts?.length>1?'Posts':'Post'}</span></li>
      <li>{profile?.user.followersCount} <span className="text-gray-800/80">{profile?.user.followersCount>1?'followers':'follower'}</span></li>
      <li>{profile?.user.followingCount} <span className="text-gray-800/80">Following</span></li>
    </ul>
    <ul className="flex xl:flex-row flex-col *:cursor-pointer items-center text-gray-800/80 gap-10 mt-10">
      <li className={`${openposts?'border-b-5 border-blue-500':''} relative before:absolute before:-bottom-1 before:bg-blue-500 before:w-0 before:h-1 hover:before:w-full before:transition-all before:duration-200 `} onClick={()=>{
        setopenposts(true)
        setbookmarks(false)
        setopenfollowers(false)
        setopenfollowing(false)
      }}>Posts</li>
      {profile?.user.bookmarksCount?<li className={`${bookmarks?'border-b-5 border-blue-500':''} relative before:absolute before:-bottom-1 before:bg-blue-500 before:w-0 before:h-1 hover:before:w-full before:transition-all before:duration-200 `} onClick={()=>{
        setopenposts(false)
        setbookmarks(true)
        setopenfollowers(false)
        setopenfollowing(false)
      }}>Bookmarks</li>:''}
        <li className={`${openfollowers?'border-b-5 border-blue-500':''} relative before:absolute before:-bottom-1 before:bg-blue-500 before:w-0 before:h-1 hover:before:w-full before:transition-all before:duration-200 `} onClick={()=>{
        setopenposts(false)
        setbookmarks(false)
        setopenfollowers(true)
        setopenfollowing(false)
      }}>Followers</li>
      <li className={`${openfollowing?'border-b-5 border-blue-500':''} relative before:absolute before:-bottom-1 before:bg-blue-500 before:w-0 before:h-1 hover:before:w-full before:transition-all before:duration-200 `} onClick={()=>{
        setopenposts(false)
        setbookmarks(false)
        setopenfollowers(false)
        setopenfollowing(true)
      }}>Following</li>
      
    </ul>
   </div>

  </div>
  <div className="max-w-2xl mx-auto mt-15 ">
    {posts&&openposts?posts.map((postinfo)=>{
      return <Postcard  getposts={getuserposts} key={postinfo.id} postinfo={postinfo}/>

    }):bookmarks||openfollowers||openfollowing?'':<PostCardSkeleton/>}
    {bookmarks&&profile.user.bookmarksCount?<Bookmarks navbar={false}/>:''}
   {openfollowers?
    profile?.user.followers.length?userprofile?.user.followers.map((user)=>{
      return <div>
      <div className="flex items-center gap-2 justify-between bg-white p-10 shadow-lg rounded-xl">
       <div className="flex items-center">
         <div className="image">
        <img className="size-20 border-2 border-gray-400/30 rounded-full p-1" src={user.photo} alt="y" />
      </div>
      <div>
        <h1>{user.name}</h1>
        
      </div>
      
       </div>
       <div>
        <button onClick={()=>{
followuser(user._id)
        }} className="btn bg-linear-to-r from-blue-400 to-blue-700 hover:-translate-y-1 text-white transition-all duration-200">{myprofile.user.following.includes(user._id)?"unFollow":"Follow"}</button>
      </div>
      </div>


    </div>
    }):<div className="bg-white p-10 text-center shadow-xl rounded-2xl "><p className="text-xl">No Followers</p></div>:''}

 {openfollowing?
    profile?.user.following.length?userprofile?.user.following.map((user)=>{
      return <div>
      <div className="flex items-center gap-2 justify-between bg-white p-10 shadow-lg rounded-xl">
       <div className="flex items-center">
         <div className="image">
        <img className="size-20 border-2 border-gray-400/30 rounded-full p-1" src={user.photo} alt="y" />
      </div>
      <div>
        <h1>{user.name}</h1>
        
      </div>
      
       </div>
       <div>
        <button onClick={()=>{
followuser(user._id)
        }} className="btn bg-linear-to-r from-blue-400 to-blue-700 hover:-translate-y-1 text-white transition-all duration-200">{myprofile.user.following.includes(user._id)?"unFollow":"Follow"}</button>
      </div>
      </div>


    </div>
    }):<div className="bg-white p-10 text-center shadow-xl rounded-2xl "><p className="text-xl">No Following</p></div>:''}
    
    
  </div>
  {updpopup?<Updpopup getuserposts={getuserposts}/>:''}
 
  
  </>
}
