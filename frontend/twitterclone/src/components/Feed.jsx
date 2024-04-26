import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from "react-redux"

const Feed = () => {
  const { tweets } = useSelector(store => store.tweets)
  return (
    <div className='w-[50%] border-gray-200 border'>
      <CreatePost />
      {
        tweets?.map(tweet => (
          <Tweet key={tweet?._id} tweet={tweet} />
        ))
      }

    </div>
  )
}

export default Feed