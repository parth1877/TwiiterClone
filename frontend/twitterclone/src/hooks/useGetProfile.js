import React, { useEffect } from 'react'
import { User_API_Endpoint } from '../utils/constant'
import  axios  from 'axios'
import {useDispatch} from "react-redux"
import { getMyprofile } from '../redux/userSlice'

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyProfile = async ()=>{
      try {
        const res =  await axios.get(`${User_API_Endpoint}/getprofile/${id}`, {
          withCredentials: true
        })
        
        dispatch(getMyprofile(res?.data?.user))
      } catch (error) {
        console.log(error)
      }
    }
    fetchMyProfile();
    
  },[id])
}

export default useGetProfile