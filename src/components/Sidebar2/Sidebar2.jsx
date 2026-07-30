import React, { useContext, useEffect, useState } from 'react'

import { Authcontext } from '../../Context/Auth.context'
import axios from 'axios'
import SuggestionSkeleton from '../Sugeestionskeleton/SugesstionSkeleton'
export default function Sidebar2() {
   
    const[suggestions,setsuggestions]=useState(null)
    const {token}=useContext(Authcontext)
    async function getsuggestions(){
        const options={
            url:'https://route-posts.routemisr.com/users/suggestions?limit=10',
            method:"GET",
            headers:{
                token

            }

        }
        const {data}=await axios.request(options)
        setsuggestions(data.data.suggestions)
        console.log(data);
        
    }
   
    useEffect(()=>{
        getsuggestions()
    },[])
  return <>
  <section className="second my-10 sticky top-0 ">
    <div className="bg-white p-3 rounded-2xl">
        <div className='flex items-center justify-between p-5'>
            <h1>People you may know</h1>
            <button className='text-blue-400'>Seeall</button>
        </div>
        <div className="people p-5">
            <ul>
               {suggestions?suggestions.map((user)=>{
                return  <li key={user._id} className='flex items-center my-7 justify-between'>
                    <div className='flex gap-2 items-center'>
                        <div>
                        <img className='size-20 rounded-full' src={user.photo} alt={user.name} />
                    </div>
                    <div>
                        <h1>{user.name}</h1>
                        <span className='text-gray-600/90'>{user.mutualFollowersCount} mutual friends</span>
                        
                    </div>
                    </div>
                    <button className='btn bg-linear-to-r from-blue-700 to-blue-500 hover:-translate-1 transition-all duration-200 text-white'>follow</button>
                </li>
               }):<SuggestionSkeleton/>}
            </ul>

        </div>

    </div>
  </section>
  
  </>
}
