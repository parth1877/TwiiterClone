import React from 'react'
import { createBrowserRouter, NavLink, RouterProvider, useParams } from "react-router-dom"
import Home from '../pages/Home'
import Login from '../pages/Login'
import { IoMdArrowBack } from "react-icons/io";
import Avatar from "react-avatar"
import useGetProfile from '../hooks/useGetProfile'
import { useSelector } from "react-redux"
import axios from "axios"
import { User_API_Endpoint } from '../utils/constant';
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import { followingUpdate } from '../redux/userSlice';
import { getrefresh } from '../redux/tweetSlice';

const Profile = () => {
    const { user, profile } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const { id } = useParams();
    //customehooks
    console.log(id)
    useGetProfile(id);

    const followUnfollow = async ()=>{
        if(user.following.includes(id)){
            //unfollow
            try {
                const res = await axios.post(`${User_API_Endpoint}/unfollow/${id}`,{id:user?._id},{
                    withCredentials:true
                })
                toast.success(res.data.msg)
                dispatch(followingUpdate(id))
                dispatch(getrefresh());
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.msg)
            }
        }else{
            //follow
            try {
                const res = await axios.post(`${User_API_Endpoint}/follow/${id}`,{id:user?._id},{
                    withCredentials:true
                })
                toast.success(res?.data?.msg)
                dispatch(followingUpdate(id))
                dispatch(getrefresh());
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.msg)
            }
        }
    }

    return (
        <div className='w-[50%] border border-l border-r border-gray-200'>


            <div>

                <div className='flex items-center py-2'>
                    <NavLink to="/">
                        <div className='p-2 rounded-full  hover:bg-gray-100 cursor-pointer'>
                            <IoMdArrowBack size={"24px"} />
                        </div>
                    </NavLink>


                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm'>10 post</p>
                    </div>

                </div>

                <img src='https://t4.ftcdn.net/jpg/03/08/82/39/360_F_308823955_XTMT8TNKmOYnPEwmEmfnskgNqQv3hQE5.jpg' alt='Developer Image' height="auto" width={"100%"} />

                <div className='absolute top-56 border-4 border-white rounded-full ml-3'>
                    <Avatar facebookId="100008343750912" size="150" round={true} />
                </div>

                <div className='text-right m-2'>
                    {
                        user?._id === profile?._id ? (
                            <button className='rounded-full px-4 py-1 border-gray-400 border hover:bg-gray-200'>Edit Profile</button>
                        ) : (
                            <button className='rounded-full px-4 py-1 border-gray-400 border text-white  bg-black' onClick={followUnfollow}>{user?.following?.includes(id) ? "Following" : "Follow"}</button>
                        )
                    }

                </div>

                <div className='m-4'>
                    <h1 className='font-bold text-xl'>{profile?.name}</h1>
                    <p className='text-sm text-gray-300'>{profile?.userName}</p>
                </div>

                <div className='m-4 text-sm'>
                    <p>Exploring MERN Stack,Learning DEVops,Contributing Open Source</p>
                </div>

            </div>






        </div>

    )
}

export default Profile