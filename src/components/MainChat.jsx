import React, { useEffect , useState} from 'react'
import {useLocation,Navigate} from 'react-router-dom'
import ReconnectingEventSource from "reconnecting-eventsource";
import { searchIcon,usersIcon,groupicons,sendIcon,userIcon } from './images';
import User from './User';
import Chat from './Chat';
import Groups from './Groups';
import { MutatingDots } from  'react-loader-spinner'

export default function MainChat() {
  const location = useLocation()
  const userName = location.state || localStorage.getItem("userName")
  
  const [newJoiner, setNewJoiner] = useState()
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])
  const [selectedUser, setSelectedUser] = useState()
  
  const url = 'https://chat-sse-6cdf18c29902.herokuapp.com'
  const [toggle, setToggle] = useState(false)
  const [restart,setRestart] = useState(false)
  const [loading,setLoading] = useState(false)

  if (localStorage.getItem('userName') === null){
    return <Navigate to="/" />
  }
  

  
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setRestart(true)
    },100)

    const eventSource = new EventSource(url+"/user/connect/"+userName)
      eventSource.onmessage = e=>{
        const parsedData = JSON.parse(e.data)
        // console.log(parsedData)
        if(parsedData.eventType == "newJoiner"){
          setNewJoiner(parsedData.message)
         }
        
        if(parsedData.eventType == "updatedUsersAndGroupsList"){
          const Data = JSON.parse(parsedData.message)
          console.log(Data)
          updateUsers()
          // setUsers(prevState => {
          //           return Data.users.map(user=>{
          //               return {
          //                 name: user,
          //                 userMassages: [
          //                   {
          //                     id: Math.ceil(Math.random()*1000),
          //                     to: userName,
          //                     from: user,
          //                     message: `Hi Bro What's Up ${userName}`,
          //                     when: Date.now()
          //                   },
          //                   {
          //                     id: Math.ceil(Math.random()*1000),
          //                     to: user,
          //                     from: userName,
          //                     message: `Hi Bro What's Up ${user}`,
          //                     when: Date.now()
          //                   }
          //                 ],
          //               }
          //             })
          //           })
          // setGroups(Data.groups)
                  }
        if(parsedData.eventType == "newUserMessage"){
                    // console.log(parsedData.message)
                    updateUsersMassages(parsedData)
                  
                }
        if(parsedData.eventType == 'ping'){
                console.log(parsedData)
               }
            }
      eventSource.onerror =(e)=>{
            console.log(e)
          }
          return ()=> clearTimeout(timer)
        },[restart])

  useEffect(()=>{
    // localStorage.setItem('test',JSON.stringify(Date.now()))
  },[])

  const selctedUser = (name)=>{
    setSelectedUser(users.find(user => user.name === name))
  }


  const updateUsersMassages = (parsedData)=>{
    setUsers(prevState => {
      const newState = prevState.map(obj=>{
        if(obj.name == parsedData.to || obj.name == parsedData.from){
          return  {...obj,userMassages: [...obj.userMassages,{
            id: Math.ceil(Math.random()*1000),
            to: parsedData.to,
            from: parsedData.from,
            message: parsedData.message,
            when: Date.now()
          }]}
        }
        return obj
      })
      // console.log(newState)
      return newState
    })
    setSelectedUser(prevState => {
      if (prevState.name == parsedData.to || prevState.name == parsedData.from){
        return  {...prevState,
          userMassages: [...prevState.userMassages,{
            id: Math.ceil(Math.random()*1000),
            to: parsedData.to,
            from: parsedData.from,
            message: parsedData.message,
            when: Date.now()
          }]}

      }
    })
  } 
  const sendMassage = async (text)=>{
    const data = {
      from: userName,
      to: selectedUser.name,
      eventType:"newUserMessage",
      message: text,
      file: "string"
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }

   await fetch(url+'/user/message',options)
            .then(res=>console.log(res))
   updateUsersMassages(data)
  }
  const updateUsers = async()=>{
    const res = await fetch('https://chat-sse-6cdf18c29902.herokuapp.com/user/get/all')
    const data = await res.json()

    setUsers(data.map(user=>{
      const userMassagesList = user.messages.map(message => message.eventType == 'newUserMessage')

      return {
        id : user.id,
        name : user.username,
        userMassages: userMassagesList,
        isActive: user.isActive,
        userMetaData: user.userMetaData 
      }
    }))
    setLoading(true)
  }
  const logOut = ()=>{
    localStorage.clear()
    fetch(url+'/user/disconnect/'+userName)
    window.location.reload(false);
  }
  return (
    <main className='grid grid-cols-5 grid-rows-1'>
      <div className='sideBar flex flex-col h-screen bg-[#d7e7f5]'>
          <div className='sideBar__search p-5 relative flex justify-center items-center flex-[1]'>
              <img src={searchIcon} className=' absolute left-7 z-10' alt="icon" />
              <input type="text" className=' w-[100%] h-12 rounded-full indent-[3.2rem] drop-shadow-md focus:outline-none' placeholder='Search' />
          </div>
         <div className='sideBar__userName px-7 flex justify-start items-start flex-col flex-[1]'>
            <h1 className=' text-[1.8rem] font-bold my-[-10px] '>{userName}</h1>
            <button className='text-[#707f8a]' onClick={logOut}>LogOut</button>
         </div>

          <div className='sideBar__user-groups flex flex-[1]'>
              <div className={'users relative ' + (!toggle&&'bg-[#C1D0DB] ') + 'p-5 flex items-center justify-center flex-[1] hover:cursor-pointer'} onClick={()=>setToggle(false)}>
                <img src={usersIcon} alt="usersIcon" />
                {!toggle&&<div id='user-bar' className='absolute animate-users right-0 bottom-0 bg-Red h-2'></div>}
              </div>

              <div className={'groups relative ' + (toggle&&'bg-[#C1D0DB] ') + 'p-5 flex items-center justify-center flex-[1] hover:cursor-pointer'} onClick={()=>setToggle(true)}>
                <img src={groupicons} alt="groupicons" />
                {toggle&&<div id='group-bar' className='absolute bottom-0 animate-group left-0 bg-Red h-2'></div>}
              </div>
          </div>

          <div className={!loading?'flex justify-center items-center flex-[8] bg-[#EBF4FB] overflow-auto':'sideBar__list flex-[8] bg-[#EBF4FB] overflow-auto'}>
            {!loading&& 
              <MutatingDots 
              height="100"
              width="100"
              color="#FD5050"
              secondaryColor= '#FD5050'
              radius='12.5'
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              />
            }
            {!toggle && loading&&
              users && users.map(user=>(
                 user.name !== userName&&<User key={user.name} userName={user} isSelected={selectedUser?selectedUser.name:"not yet"} handleClick={selctedUser}/>
               )) }
            {toggle && loading&& <Groups handleClick={selctedUser}/>}
          </div>
          
      </div>

      <Chat massage={sendMassage} selectedUser={selectedUser?selectedUser:"not yet"} />

    </main>

    // <div>
    //   <button className=' absolute right-0' onClick={logOut}>LogOut</button>
    //   UserName Is :
    //   <h1 className=' text-2xl'>{userName}</h1>
    //   Welcome to  :
    //   <h1 className=' text-2xl'>{newJoiner}</h1>
    //   All users  :
    //   <div>
    //     {upDated.users && upDated.users.map(user=>(
    //       <h1 className='text-2xl' key={user}>
    //           {user}
    //       </h1>
    //     ))}
    //   </div>
    //   All groups  :
    //   <div>
    //     {upDated.groups && upDated.groups.map(group=>(
    //       <h1 className='text-2xl' key={group}>
    //           {group}
    //       </h1>
    //     ))}
    //   </div>


    // </div>
  )
}
