import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftSidebarOptions = ({ iconComponent, text ,id}) => {
  return (
    <div>
  <NavLink to={text==="Home" ? "/":`${text}/${id}`}
    className='flex items-center my-2 hover:bg-gray-200 px-4 py-2 rounded-full hover:cursor-pointer'>
        {iconComponent}
        
        <h1 className='font-bold text-lg ml-2'>{text}</h1>
        
      </NavLink>
    </div>
  )
}

export default LeftSidebarOptions
