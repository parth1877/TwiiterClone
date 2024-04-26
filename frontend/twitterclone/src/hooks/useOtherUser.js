import React, { useEffect } from 'react'
import { User_API_Endpoint } from '../utils/constant'
import  axios  from 'axios'
import {useDispatch} from "react-redux"
import { getMyprofile, getOtherusers } from '../redux/userSlice'

const useOtherUser = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyProfile = async ()=>{
      try {
        const res =  await axios.get(`${User_API_Endpoint}/otherUsers/${id}`, {
          withCredentials: true
        })
        
        dispatch(getOtherusers(res?.data?.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchMyProfile();
    
  },[])
}

export default useOtherUser