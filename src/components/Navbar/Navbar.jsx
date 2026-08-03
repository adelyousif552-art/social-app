import { faBell, faBookmark, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes,faHouse, faCompass, faPeopleGroup, faMagnifyingGlass, faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Authcontext } from "../../Context/Auth.context";
import axios from "axios";
import Passwordpopup from "../passwordpopup/Passwordpopup";


export default function Navbar() {
    const[changepass,setchangepass]=useState(false)

    const [myprofile,setmyprofile]=useState(null)

    const [countnot,setcountnot]=useState(null)
    async function getunreadcount(){
      try {
          const options={
            url:'https://route-posts.routemisr.com/notifications/unread-count',
            method:"GET",
            headers:{
                token
            }
            
        }
        const {data}=await axios.request(options)
        
        setcountnot(data.data.unreadCount)
      } catch (error) {
        console.log(error);
        
      }
        
    }
    const navigate=useNavigate()
    const [notifications,setnotifications]=useState(null)
    async function getnotifications(){
       try {
         const options={
            url:'https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10',
            method:"GET",
            headers:{
                token
            }
        }
        const {data}=await axios.request(options)
        setnotifications(data.data.notifications)
       } catch (error) {
        console.log(error);
        
       }
        
        
    }
    const [opennotification,setopennotification]=useState(false)
   
    const {profile,getuserprofile}=useContext(Authcontext)
    const [users,setusers]=useState(null)
    const [listopen,setlistopen]=useState(false)
   
    const {userid}=useContext(Authcontext)
    const {token,settoken} =useContext(Authcontext)
    async function getmyprofile(){
     try {
         const options={
          url:'https://route-posts.routemisr.com/users/profile-data',
          method:"GET",
          headers:{
              token
          }
      }
      const {data}=await axios.request(options)
      setmyprofile(data.data)
     } catch (error) {
        console.log(error);
        
     }
      
      
     }
      async function getsuggestions(){
       try {
         const options={
            url:'https://route-posts.routemisr.com/users/suggestions?limit=50',
            method:"GET",
            headers:{
                token

            }

        }
        const {data}=await axios.request(options)
        setusers(data.data.suggestions)
       } catch (error) {
        console.log(error);
        
       }
        
        
    }
    async function markasread(id){
      try {
          const options={
            url:`https://route-posts.routemisr.com/notifications/${id}/read`,
            method:"PATCH",
            headers:{
                token
            }
        }

        const {data}=await axios.request(options)
      } catch (error) {
        console.log(error);
        
      }
       
        
        
    }
   
    useEffect(()=>{
        getuserprofile(userid)
        getnotifications()
        getunreadcount()
        getmyprofile()
        getsuggestions()
        
        
    },[token])
    
    const [search,setsearch]=useState('')
    const [isfocused,setisfocused]=useState(false)
    const [mobilemenu,setmobilemenu]=useState(false)
    const results=users?.filter((user)=>{
        return user.name.toLowerCase().startsWith(search.toLowerCase())
    })
    
  return <>
  <nav className={`bg-gray-50 z-50 sticky top-0 shadow-lg py-3 px-10   `}>
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
                        <li onClick={()=>{
                            setchangepass(true)
                        }}>password</li>
                        
                        <li onClick={()=>{
                            localStorage.removeItem('token')
                            settoken(null)
                        }}><Link to={'/login'}>Logout</Link></li>
                    </ul>

                </div>:''}
                
                </li>
               
                <li ><NavLink to={'/'} className={({isActive})=>`${isActive&&'text-blue-600'} space-x-1`}><FontAwesomeIcon className="" icon={faHouse} /><span>Home</span></NavLink></li>
               
            </ul>

        </div>
        <div className="rightside flex items-center space-x-2 gap-4">
            <div className="searchinput relative hidden xl:block">
                <input value={search} onBlur={()=>{
                    setisfocused(false)
                }} onFocus={()=>{
                    setisfocused(true)
                }} onChange={(e)=>{
                    setsearch(e.target.value)
                }} type="search" placeholder="search posts,people,topics...." className="py-1 px-2 pl-10 bg-gray-100 focus:border-blue-600 border border-transparent transition-colors duration-400 rounded-full focus:outline-none min-w-72" />
                <FontAwesomeIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" icon={faMagnifyingGlass} />
               {search&&isfocused?<ul className="bg-white z-50 absolute top-full right-0 left-0 mt-3 shadow-lg py-5 px-2 rounded-2xl">
                {results?.map((user)=>{
                    return <li onClick={()=>{
                        navigate(`/${user._id}/profile`)

                    }} className="mt-3 hover:bg-blue-500 hover:-translate-y-1 transition-all duration-200 cursor-pointer  p-5 flex items-center gap-3" key={user._id}>
                        <img className="size-20 rounded-full" src={user.photo} alt={user.name}  />
                        <span>{user.name}</span>
                    </li>
                })}

               </ul>:''}
            </div>
            <div className="space-x-2 flex items-center  ">
                <div className="relative  ">
                    <button onClick={()=>{
                        setopennotification(!opennotification)
                        console.log("notify");
                        
                    }} className=" cursor-pointer " > <span className=" size-4 right-0 translate-x-1/2 -top-2 rounded-full bg-blue-500 absolute text-white text-xs font-semibold">{countnot?countnot:''}</span>  <FontAwesomeIcon icon={faBell} /></button>
                    {opennotification?<div className="fixed xl:absolute top-20 xl:top-full left-1/2 xl:left-auto -translate-x-1/2 xl:translate-x-0  xl:right-0 w-[90vw] max-w-md xl:w-xl rounded-xl bg-white shadow-2xl mt-0 xl:mt-5 z-50 max-h-[70vh] overflow-y-auto"> 
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
                
                <Link to={'/bookmark'} className=" relative" > <span className=" size-4 right-0 translate-x-1/2 -top-2 rounded-full bg-blue-500 absolute flex items-center justify-center text-white">{myprofile?.user.bookmarksCount}</span> <FontAwesomeIcon icon={faBookmark} /></Link>
            </div>
            <label onClick={()=>{
                navigate('/')
            }} htmlFor="post" className="rounded-full hidden xl:block py-1 px-3 text-white bg-linear-to-r from-blue-400 to-blue-600 cursor-pointer transition-colors duration-200 hover:from-blue-600 hover:to-blue-300 "><FontAwesomeIcon icon={faPlus} /> <span>Create Post</span></label>
            <button onClick={()=>{
                setmobilemenu(!mobilemenu)
            }} className="xl:hidden cursor-pointer"><FontAwesomeIcon className="" icon={faBars} /></button>

        </div>
    </div>






  </nav>
  <div onClick={()=>{
    setmobilemenu(false)
  }} className={`overlay xl:hidden transition-opacity duration-300 bg-gray-500/20 ${mobilemenu?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'} fixed inset-0 z-20`}>
    <div onClick={(e)=>{
e.stopPropagation()
    }} className={`fixed  bg-white w-72 p-5 h-[calc(100vh-5rem)]  shadow-lg z-30 transition-all  duration-300  top-20 right-0 ${mobilemenu?'translate-x-0 ':'translate-x-full'}    `}>
   <div className="flex  flex-col h-full    justify-between ">
<div className="top">
     <ul className="space-y-5 ">
        
             
                <li  className="flex cursor-pointer space-x-2 relative items-center"><img className="size-8 rounded-full" src={profile?.user.photo} alt={profile?.user.name}/> <span>{profile?.user.name}</span>
                
              
                </li>
                 <li>
             <div className="searchinput relative ">
                <input value={search} onBlur={()=>{
                    setisfocused(false)
                }} onFocus={()=>{
                    setisfocused(true)
                }} onChange={(e)=>{
                    setsearch(e.target.value)
                }} type="search" placeholder="search posts,people,topics...." className="py-1 px-2 pl-10 bg-gray-100 focus:border-blue-600 border border-transparent transition-colors duration-400 rounded-full focus:outline-none max-w-72" />
                <FontAwesomeIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" icon={faMagnifyingGlass} />
               {search&&isfocused?<ul className="bg-white z-50 absolute top-full  right-0 left-0 mt-3 max-h-[70vh] overflow-y-auto shadow-lg py-5 px-2 rounded-2xl">
                {results?.map((user)=>{
                    return <li onClick={()=>{
                        navigate(`/${user._id}/profile`)

                    }} className="mt-3 hover:bg-blue-500 hover:-translate-y-1 transition-all duration-200 cursor-pointer  p-5 flex items-center gap-3" key={user._id}>
                        <img className="size-20 rounded-full" src={user.photo} alt={user.name}  />
                        <span>{user.name}</span>
                    </li>
                })}

               </ul>:''}
            </div>
        </li>
                 <li className="hover:bg-blue-500 hover:text-white p-2 transition-all duration-200 cursor-pointer"><Link to={`/${userid}/profile`}>myprofile</Link></li>
                        
                       
                        
               
                
               
            
        
        <li className="hover:bg-blue-500 hover:text-white p-2 cursor-pointer transition-all duration-200" ><NavLink to={'/'} className={` space-x-2`}><FontAwesomeIcon className="" icon={faHouse} /><span>Home</span></NavLink></li>
       
        <li className="hover:bg-blue-500 hover:text-white p-2 transition-all duration-200 cursor-pointer "> 
               
                
                <Link  to={'/bookmark'} className=" relative" > <FontAwesomeIcon icon={faBookmark} /> <span>Bookmarks</span></Link>
            </li>

    </ul>
   </div>
   <div className="bottom ">
    <ul className="space-y-3">
        <li onClick={()=>{
            setchangepass(true)
        }} className="hover:bg-blue-500 hover:text-white p-2 transition-all duration-200 cursor-pointer">change Password</li>
        <li className="hover:bg-blue-500 hover:text-white p-2 transition-all duration-200 cursor-pointer" onClick={()=>{
                            localStorage.removeItem('token')
                            settoken(null)
                        }}><Link to={'/login'}>Logout</Link></li>
    </ul>
   </div>
   </div>
  </div>
  </div>
  {changepass?<Passwordpopup passwordpopup={setchangepass}/>:''}
  
  </>
}
