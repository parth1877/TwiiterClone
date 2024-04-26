import React, { useEffect } from 'react'
import { Tweet_API_Endpoint } from '../utils/constant'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { getAllTweets } from '../redux/tweetSlice'
import { useSelector } from "react-redux"


const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const {isActive} = useSelector(store=>store.tweets)
  const {user} = useSelector(store=>store.user)


  const { refresh } = useSelector(store => store.tweets)

  const followingTweetHandler = async () => {
    try {
      console.log(id)
      const res = await axios.get(`${Tweet_API_Endpoint}/getFollowingTweets/${id}`,{
        withCredentials: true
      })
      console.log(res)
      

      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error)
    }
  }



  const fetchMyTweets = async () => {
    try {
      const res = await axios.get(`${Tweet_API_Endpoint}/getAllTweets/${id}`, {
        withCredentials: true
      })
      console.log(res?.data?.tweets)

      dispatch(getAllTweets(res?.data?.tweets))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if(isActive){
      fetchMyTweets();
    }
    else{
      followingTweetHandler();
    }
  

  }, [refresh,isActive])
}

export default useGetMyTweets