import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { CiImageOn } from "react-icons/ci";
import axios from "axios"
import { Tweet_API_Endpoint } from '../utils/constant';
import toast from "react-hot-toast"
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import { getAllTweets, getisActive, getrefresh } from '../redux/tweetSlice';



const CreatePost = () => {
    const [description,setDescription] = useState("");
    const {user} = useSelector(store=>store.user)
    const {isActive} = useSelector(store=>store.tweets)

    const dispatch = useDispatch();

    

    function changeHandler(e){
        setDescription(e.target.value)
    }
    console.log(description)

    const submitHandler = async ()=>{
        try {
            const res = await axios.post(`${Tweet_API_Endpoint}/create`,{description,id:user._id},{
                withCredentials:true
            })
            dispatch(getrefresh());
            if(res.data.success){
                toast.success(res.data.msg)
            }
            setDescription("");
        } catch (error) {
            toast.error(error.res.data.msg)
            console.log(error)
        }
    }

    const foryouHandler = async()=>{
        dispatch(getisActive(true))
    }

    const followingHandler = async()=>{
        dispatch(getisActive(false))
    }

    

    return (
        <div className='w-[100%]'>
            <div>

                <div className='flex items-center justify-evenly border border-gray-200'>

                    <div className={`hover:cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 ${isActive ? "border-b border-blue-600":null}`} onClick={foryouHandler}>
                        <h1 className='font-semibold text-gray-600 text-lg'>For you</h1>
                    </div>

                    <div className={`hover:cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 ${isActive===false ? "border-b border-blue-600":null}`}    onClick={followingHandler}>
                        <h1 className='font-semibold text-gray-600 text-lg' >Following</h1>
                    </div>

                </div>

                <div>

                    <div className='flex items-center p-4'>

                        <div>
                            <Avatar facebookId="100008343750912" size="50" round={true} />
                        </div>

                        <input className="w-full outline-none border-none text-lg ml-2" type='text' placeholder='What is happening ?' onChange={changeHandler} value={description}/>

                    </div>

                    <div className='flex items-center justify-between p-4 border-b border-gray-300'>

                        <div>
                            <CiImageOn size={"24px"}/>
                        </div>

                        <button className='bg-[#1d9bf0] px-4 py-2 border-none rounded-full text-lg text-white' onClick={submitHandler}>
                            Post
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default CreatePost