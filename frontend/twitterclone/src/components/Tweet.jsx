import React from 'react'
import Avatar from "react-avatar"
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from "axios"
import { Tweet_API_Endpoint } from '../utils/constant';
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { getrefresh } from '../redux/tweetSlice';
import { MdDelete } from "react-icons/md";



const Tweet = ({ tweet }) => {
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch();


    const likeOrdislikehandler = async (id) => {
        console.log(id)
        console.log(user._id)

        try {
            const res = await axios.put(`${Tweet_API_Endpoint}/like/${id}`, { id: user._id }, {
                withCredentials: true
            })
            dispatch(getrefresh())
            if (res.data.success) {
                toast.success(res?.data?.msg)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.msg)

        }
    }

    const deleteHandler = async (id) => {
        try {
            const res = await axios.delete(`${Tweet_API_Endpoint}/delete/${id}`, {
                withCredentials: true
            })
            dispatch(getrefresh())
            if (res.data.success) {
                toast.success(res?.data?.msg)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg)
        }
    }


    return (
        <div className='border-b border-gray-200'>
            <div>

                <div>

                    <div className='flex p-4'>
                        <Avatar facebookId="100008343750912" size="50" round={true} />

                        <div className='ml-2 w-full'>

                            <div className='flex items-center'>
                                <h1>{`${tweet?.userDetailes[0]?.name}`}</h1>
                                <p className='text-gray-500 text-sm ml-1'>{`${tweet?.userDetailes[0]?.userName}`} . 1m</p>
                            </div>

                            <div>
                                <p>{tweet?.description}</p>
                            </div>

                            <div className='flex justify-between my-2'>

                                <div className='flex items-center'>

                                    <div className='hover:bg-green-200 cursor-pointer p-2 rounded-full'>
                                        <FaRegComment size={"24px"} />
                                    </div>
                                    <p className='ml-1'>0</p>
                                </div>

                                <div className='flex items-center'>

                                    <div className='hover:bg-green-200 cursor-pointer p-2 rounded-full' onClick={() => likeOrdislikehandler(tweet?._id)}>
                                        <CiHeart size={"24px"} />

                                    </div>
                                    <p className='ml-1'>{tweet?.like?.length}</p>
                                </div>

                                <div className='flex items-center'>

                                    <div className='hover:bg-green-200 cursor-pointer p-2 rounded-full'>
                                        <CiBookmark size={"24px"} />
                                    </div>

                                    <p className='ml-1'>0</p>
                                </div>

                                {
                                    tweet?.userDetailes[0]?._id === user._id ? (
                                        <div className='flex items-center'>

                                            <div className='hover:bg-green-200 cursor-pointer p-2 rounded-full'>
                                                <MdDelete size={"24px"} onClick={() => deleteHandler(tweet?._id)} />
                                            </div>
                                        </div>
                                    ) : (null)
                                }

                            </div>

                        </div>



                    </div>

                </div>

            </div>
        </div>
    )
}

export default Tweet