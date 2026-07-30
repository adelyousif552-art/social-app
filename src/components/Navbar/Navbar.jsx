import { faBell, faBookmark, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes,faHouse, faCompass, faPeopleGroup, faMagnifyingGlass, faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Authcontext } from "../../Context/Auth.context";
import axios from "axios";


export default function Navbar() {
    const [myprofile,setmyprofile]=useState(null)

    const [countnot,setcountnot]=useState(null)
    async function getunreadcount(){
        const options={
            url:'https://route-posts.routemisr.com/notifications/unread-count',
            method:"GET",
            headers:{
                token
            }
            
        }
        const {data}=await axios.request(options)
        console.log("count not",data);
        setcountnot(data.data.unreadCount)
        
    }
    const navigate=useNavigate()
    const [notifications,setnotifications]=useState(null)
    async function getnotifications(){
        const options={
            url:'https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10',
            method:"GET",
            headers:{
                token
            }
        }
        const {data}=await axios.request(options)
        setnotifications(data.data.notifications)
        console.log("notifications",data);
        
    }
    const [opennotification,setopennotification]=useState(false)
   
    const {profile,getuserprofile}=useContext(Authcontext)
    const [listopen,setlistopen]=useState(false)
   
    const {userid}=useContext(Authcontext)
    const {token,settoken} =useContext(Authcontext)
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
    async function markasread(id){
        const options={
            url:`https://route-posts.routemisr.com/notifications/${id}/read`,
            method:"PATCH",
            headers:{
                token
            }
        }

        const {data}=await axios.request(options)
        console.log(data);
        
        
    }
   
    useEffect(()=>{
        getuserprofile(userid)
        getnotifications()
        getunreadcount()
        getmyprofile()
        
        
    },[token])
    
    
    
  return <>
  <nav className="bg-gray-50 shadow-lg py-3 px-10 ">
    <div className="container  max-w-7xl mx-auto px-5 py-3 flex items-center justify-between ">
        <div className="leftside flex items-center gap-4">
            <h1 className="text-2xl"><Link to={'/'}> <FontAwesomeIcon className="text-blue-600" icon={faShareNodes} /><span>SocialHub</span></Link></h1>
            <ul className="xl:flex hidden items-center space-x-5">
                <li onClick={()=>{
                    setlistopen(!listopen)
                }} className="flex cursor-pointer  relative items-center"><img className="size-8 rounded-full" src={profile?.user.photo} alt={profile?.user.name}/> <span>{profile?.user.name}</span>
               {listopen? <div className="bg-white z-50 cursor-pointer rounde-xl shadow top-full  absolute">
                    <ul className="space-y-3 *:hover:bg-blue-500 *:hover:text-white *:p-2 *:transition-all *:duration-200">
                        <li><Link to={`/${userid}/profile`}>myprofile</Link></li>
                        <li>Setting</li>
                        <li>savedposts</li>
                        <li onClick={()=>{
                            localStorage.removeItem('token')
                            settoken(null)
                        }}><Link to={'/login'}>Logout</Link></li>
                    </ul>

                </div>:''}
                
                </li>
               
                <li ><NavLink to={'/'} className={({isActive})=>`${isActive&&'text-blue-600'} space-x-1`}><FontAwesomeIcon className="" icon={faHouse} /><span>Home</span></NavLink></li>
                <li ><NavLink to={'/explore'} className={({isActive})=>`${isActive&&'text-blue-600'} space-x-1`}><FontAwesomeIcon className="" icon={faCompass} /><span>Explore</span></NavLink></li>
                <li ><NavLink to={'/communities'} className={({isActive})=>`${isActive&&'text-blue-600'} space-x-1`}><FontAwesomeIcon className="" icon={faPeopleGroup} /><span>Communitites</span></NavLink></li>
            </ul>

        </div>
        <div className="rightside flex items-center space-x-2 gap-4">
            <div className="searchinput relative hidden xl:block">
                <input type="search" placeholder="search posts,people,topics...." className="py-1 px-2 pl-10 bg-gray-100 focus:border-blue-600 border border-transparent transition-colors duration-400 rounded-full focus:outline-none min-w-72" />
                <FontAwesomeIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" icon={faMagnifyingGlass} />
            </div>
            <div className="space-x-2 md:flex items-center hidden ">
                <div className="relative ">
                    <button onClick={()=>{
                        setopennotification(!opennotification)
                        console.log("notify");
                        
                    }} className=" cursor-pointer " > <span className=" size-4 right-0 translate-x-1/2 -top-2 rounded-full bg-blue-500 absolute text-white text-xs font-semibold">{countnot?countnot:''}</span>  <FontAwesomeIcon icon={faBell} /></button>
                    {opennotification?<div className="w-xl rounded-xl bg-white  shadow-2xl absolute mt-5 right-0 z-50">
                       {notifications?.map((notification)=>{
                        return <>
                      <div onClick={()=>{
                        if(notification?.entityType=='post'){
                            navigate(`/post/${notification.entity._id}`)
                        }else{
                            navigate(`/${notification.entity._id}/profile`)
                        }
                        markasread(notification._id)

                      }} className={` ${notification?.entity.unavailable?'opacity-50 cursor-not-allowed':'cursor-pointer'} ${notification?.isread?'':'border-l-4 border-blue-500'} p-10 flex   items-center justify-between mt-10`}>
                         <div className="flex items-center gap-3">
                         <div className="image">
                            <img className="size-15 rounded-full " src={notification?.actor.photo} alt={notification?.actor.name}/>

                        </div>
                        <div>
                            <p>{notification.type==='like_post'?`${notification?.actor.name} like on your Post`:notification.type==='comment_post'?`${notification?.actor.name} comment on your Post`:`${notification?.actor.name} starting following you`} </p>
                        </div>
                       </div>
                       {notification?.isread?'':<div className="size-3 bg-blue-600 rounded-full ">

                       </div>}
                      </div>
                        
                        </>
                       })}

                    </div>:''}
                </div>
                <button className=" relative" > <span className=" size-4 right-0 translate-x-1/2 -top-2 rounded-full bg-blue-500 absolute"></span> <FontAwesomeIcon icon={faEnvelope} /></button>
                <Link to={'/bookmark'} className=" relative" > <span className=" size-4 right-0 translate-x-1/2 -top-2 rounded-full bg-blue-500 absolute flex items-center justify-center text-white">{myprofile?.user.bookmarksCount}</span> <FontAwesomeIcon icon={faBookmark} /></Link>
            </div>
            <button className="rounded-full hidden xl:block py-1 px-3 text-white bg-linear-to-r from-blue-400 to-blue-600 cursor-pointer transition-colors duration-200 hover:from-blue-600 hover:to-blue-300 "><FontAwesomeIcon icon={faPlus} /> <span>Create Post</span></button>
            <button className="xl:hidden"><FontAwesomeIcon className="" icon={faBars} /></button>

        </div>
    </div>






  </nav>
  
  </>
}
