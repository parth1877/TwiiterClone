import React, { useState } from 'react'
import axios from "axios"
import {User_API_Endpoint} from "../utils/constant"
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { getUser } from '../redux/userSlice'


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setisLogin] = useState(true);
  const [data,setData] = useState({
    name:"",
    userName:"",
    email:"",
    password:"",
  });

  const loginSignupHandler=()=>{
    setisLogin(!isLogin);
  }

  function changeHandler (event){
    const {name,type,value} = event.target;
    setData((prevdata)=>({
      ...prevdata,
      [name] : value
    }))
  }

  async function submitHandler(event){
    event.preventDefault();
    console.log(data)

    if(isLogin){
      try {
        const res = await axios.post(`${User_API_Endpoint}/login`,{email:data.email,password:data.password},{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        })
        
        dispatch(getUser(res?.data?.user))

        console.log(res);
        if(res.data.success === true){
          navigate("/")
          await toast.success(res.data.msg)
        }
      } catch (error) {
        console.log(error)
      }
    }else{
      try {
        const res = await axios.post(`${User_API_Endpoint}/signUp`,data,{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        })
       
        if(res.data.success === true){
          navigate("/")
          setisLogin(true)
          await toast.success(res.data.msg)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div className='w-screen h-screen flex items-center justify-center'>

      <div className='flex items-center justify-evenly w-[80%]'>

        <div>
          <img width={"400px"} src='https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712361600&semt=ais' alt='Twitter-logo' />
        </div>

        <div>
          <div className='my-5'>
            <h1 className='font-bold text-7xl'>Happening Now</h1>
          </div>

          <h1 className='mt-4 text-2xl font-bold mb-2'>{isLogin ? "Login" : "SignUp"}</h1>
          <form className='flex flex-col w-[50%]' onSubmit={submitHandler}>
            {
              !isLogin && (
                <>
                  <input type='text' placeholder='Name' name="name" value={data.name}   className='outline-blue-500 border-gray-800 rounded-full px-3 py-1 border my-1'  onChange={changeHandler}/>
                  <input type='text' placeholder='Username' name="userName" value={data.userName} className='outline-blue-500 border-gray-800 rounded-full px-3 py-1 border my-1' onChange={changeHandler}/>
                </>
              )
            }

            <input type='Email' placeholder='Email' name="email" value={data.email}   className='outline-blue-500 border-gray-800 rounded-full px-3 py-1 border my-1' onChange={changeHandler}/>
            <input type='Password' placeholder='Password' name="password" value={data.password}   className='outline-blue-500 border-gray-800 rounded-full px-3 py-1 border my-1' onChange={changeHandler}/>

            <button className='bg-[#1d9bf0] py-2 rounded-full border-none text-md text-white my-4'>{isLogin ? "Login" : "Signup"}</button>
            <h1>{isLogin ? "Do not have an account ?":"Already have an account ?"} <span onClick={loginSignupHandler} className='hover:cursor-pointer font-bold text-blue-600'>{isLogin ? "Regitser":"Login"}</span></h1>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Login