import React, { useRef } from 'react'
import { userIcon,sendIcon} from './images'

export default function Chat(props) {
  const el = useRef(null)
  const selectedUser = props.selectedUser
  // console.log(selectedUser)
  const handleClick = ()=>{
    props.massage(el.current.value)
    el.current.value = ""

  }
  return (
      <div className='chat col-span-4 h-screen flex flex-col justify-between'>
      <div className='chat__user-section p-4 px-[3rem] h-44'>
          <div className='flex justify-start items-center h-full gap-3 border-b-2 border-[#5c758723]'>
            <div>
              <img src={userIcon} alt="userIcon" className='w-[5.5rem]' />
            </div>
            
            <div>
                <h1 className=' text-2xl font-bold '>{selectedUser.name}</h1>
                <div className='flex justify-start items-center gap-1'>
                  <div className={'w-2 h-2 rounded-full '+ (selectedUser.isActive?'bg-[#34D859]':'bg-[#6d8394a6]')}></div>
                  <p className='text-[#6d8394a6]'>Active Now</p>
                </div>
            </div>
          </div>
      </div>

      <div className='chat__chatting-section p-4 h-full w-full flex flex-col'>
        {selectedUser.userMassages&&
          selectedUser.userMassages.map(message=>(
             <div key={message.id} className={message.from == selectedUser.name? 'bg-[#ECF4FC] mb-3 p-5 self-start max-w-lg break-words rounded-2xl':'bg-Red mb-3 p-5 self-end max-w-lg break-words rounded-2xl text-[#FFFFFF]'}>
                     {message.message}
                   </div>
          ))
        }
 
      </div>
      
      <div className='chat__send-section px-[5rem] h-32'>
          <div className='border-t-2 border-[#607a8d42] flex justify-between items-center w-full h-full'>
            <input ref={el} type="text" className='h-full w-full focus:outline-none' />
            <button className='w-[4rem] h-[4rem] drop-shadow-glow rounded-full bg-Red p-2' onClick={handleClick}>
              <img src={sendIcon} alt="sendIcon" />
            </button>
          </div>
      </div>
  </div>
  )
}
