import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar"
import { NavLink } from 'react-router-dom';


const RightSidebar = ({ otherUsers }) => {
  return (
    <div className='w-[25%]'>

      <div className='p-2 bg-gray-100 rounded-full outline-none flex items-center '>
        <CiSearch size={"20px"} />
        <input type='text' placeholder='Search' className='bg-transparent outline-none px-2' />
      </div>

      <div className='p-4 bg-gray-100 rounded-2xl my-4 w-full'>
        <h1 className='font-bold text-lg my-3'>Who to follow</h1>
        {
          otherUsers?.map((otherUser) => (
            <NavLink to={`/profile/${otherUser._id}`}>
              <div className='flex justify-between items-center mb-3 hover:bg-gray-200 rounded-full p-1' key={otherUser?._id}>

                <div className='flex justify-between w-full items-center'>

                  <div className='flex'>
                    <Avatar facebookId="100008343750912" size="50" round={true} />
                    <div className='ml-2 '>
                      <h1 className='font-bold'>{otherUser?.name}</h1>
                      <p className='text-sm'>{otherUser?.userName}</p>
                    </div>
                  </div>

                  <div>
                    <button className='px-4 py-1 bg-black text-white rounded-full'>Follow</button>
                  </div>

                </div>
              </div>
            </NavLink>
          ))
        }

      </div>

    </div>
  )
}

export default RightSidebar