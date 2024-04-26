import React, { useEffect } from 'react'
import LeftSidebar from '../components/LeftSidebar'
import Feed from '../components/Feed'
import RightSidebar from '../components/RightSidebar'
import {Outlet} from "react-router-dom"
import useOtherUser from '../hooks/useOtherUser'
import {useSelector} from "react-redux"
import useGetMyTweets from '../hooks/useGetMyTweets'
import {useNavigate} from "react-router-dom"


const Home = () => {
  //custome hook
  const {user,otherUsers} = useSelector(store=>store.user)
  const navigate = useNavigate();
  useOtherUser(user?._id)
  useGetMyTweets(user?._id)

  useEffect(()=>{
    if(!user){
      navigate("/Login")
    }
  },[])

  return (
    <div className='flex justify-between w-[80%] mx-auto'>
        <LeftSidebar/>
        <Outlet/>
        <RightSidebar otherUsers={otherUsers}/>
    </div>
  )
}

export default Home