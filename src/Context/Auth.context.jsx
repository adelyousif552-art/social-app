import axios from "axios";
import { createContext, useState } from "react";

export const Authcontext=createContext(null)



 export default function Authprovider({children}){
    const[profile,setuserprofile]=useState(null)
     const [popup,setpopup]=useState(false)
     const[sharedpost,setsharedpost]=useState(null)
     const [updatedpost,setupdatedpost]=useState(null)
   
    
    const [token,settoken]=useState(localStorage.getItem('token'))
    const [userid,setuserid]=useState(localStorage.getItem('userid'))
    
    const [updpopup,setupdpopup]=useState(false)
    
     async function getuserprofile(userid){
        const options={
            url:`https://route-posts.routemisr.com/users/${userid}/profile`,
            method:"GET",
            headers:{
                token
            }
        }
        const {data}=await axios.request(options)
        setuserprofile(data.data)
        
        
        
        
    }
    
    return <Authcontext.Provider value={{token,settoken,sharedpost,setsharedpost,updatedpost,setupdatedpost,updpopup,setupdpopup,userid,setuserid,popup,setpopup,getuserprofile,profile}}>
        
        {children}


    </Authcontext.Provider>
 }