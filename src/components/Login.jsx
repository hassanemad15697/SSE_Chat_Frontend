import React, { useState, useRef, useEffect } from 'react'
import {userIcon,person1,person2} from './images'
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState(true)
  const el = useRef("")
  // localStorage.clear()


  useEffect(()=>{
    if(!error || localStorage.getItem("userName") !== null){
      navigate('/chat',{state: el.current.value || localStorage.getItem("userName")})
    }
  },[error])

  const handleClick = async ()=>{
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(el.current.value)
    }
    el.current.value.replace(/\s/g, '') === "" ? console.log('empty') :
    localStorage.setItem('userName',el.current.value)
   await fetch('https://chat-sse-6cdf18c29902.herokuapp.com/user/add',options)
    .then(res=>{
       if(res.status >=400){
            setError(true)
        }else{
           setError(false)
         }
      })
  }
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      
      <img className='w-24 h-24' src={userIcon} alt="userLogo" />
      
      <label id='logIn-label' className='mt-5 text-2xl tracking-widest' htmlFor="user">Username</label><br />
      
      <input ref={el} id='logIn-input' className='border-b bg-backGround w-80 h-10 text-center focus:border-Red border-black ease-in duration-300' type="text" name="user" />
      
      <button className="group mt-5 relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow" onClick={handleClick}>
        <div className="absolute inset-0 w-3 bg-Red transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span className="relative text-black font-bold text-lg group-hover:text-white">Let's Start</span>
      </button>
      
      <div>
        <img src={person1} alt="p1" className=' absolute bottom-0 z-10 right-0'/>
        <svg className='absolute left-0 bottom-0' width="559" height="576" viewBox="0 0 559 576" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="39" cy="520" r="450" stroke="#FD5050" strokeOpacity="0.13" strokeWidth="140"/>
        </svg>
        <img src={person2} alt="p2" className=' absolute bottom-0 z-10 left-0'/>
        <svg className='absolute right-0 bottom-0' width="604" height="465" viewBox="0 0 604 465" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="520" cy="520" r="450" stroke="#EBF4FB" strokeWidth="140"/>
        </svg>

      </div>
    </div>
  )
}


