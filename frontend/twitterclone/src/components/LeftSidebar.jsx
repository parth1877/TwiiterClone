import React from 'react'
import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import LeftSidebarOptions from './LeftSidebarOptions';
import { CiHashtag } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoBookmarkSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import Profile from './Profile';
import { useSelector } from "react-redux"
import axios from "axios"
import { User_API_Endpoint } from '../utils/constant';
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { getMyprofile, getOtherusers, getUser } from '../redux/userSlice';

const LeftSidebar = () => {
  const { user } = useSelector(store => store.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const logoutHandler = async ()=>{
    try {
      const res = await axios.get(`${User_API_Endpoint}/logout`)
      navigate("/Login")
      dispatch(getUser(null));
      dispatch(getMyprofile(null));
      dispatch(getOtherusers(null));

      toast.success(res.data.msg)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='w-[100%]'>

        <div className='ml-4'>
          <img width={"50px"} src='https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712361600&semt=ais' alt='Twitter-logo' />
        </div>

        <div className='my-4'>
          <LeftSidebarOptions iconComponent={<MdHomeFilled size={"24px"} />} text={"Home"} />
          <LeftSidebarOptions iconComponent={<IoSearch size={"24px"} />} text={"Explore"} />
          <LeftSidebarOptions iconComponent={<IoNotificationsOutline size={"24px"} />} text={"Notification"} />

          <LeftSidebarOptions iconComponent={<CgProfile size={"24px"} />} text={"Profile"} id={user?._id} />

          <LeftSidebarOptions iconComponent={<IoBookmarkSharp size={"24px"} />} text={"Bookmarks"} />
          <div onClick={logoutHandler}>
            <LeftSidebarOptions iconComponent={<IoIosLogOut size={"24px"} />} text={"Logout"} />

          </div>
          <button className='px-4 py-2 text-md bg-[#1d9bf0] w-full rounded-full text-white font-bold hover:bg-blue-500'>Tweet</button>
        </div>

      </div>
    </div>
  )
}

export default LeftSidebar