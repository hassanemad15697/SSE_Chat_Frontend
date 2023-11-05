import React from 'react'
import { groupicons } from './images'
export default function Groups() {
  return (
    <div className='sideBar__list__user flex justify-start items-center gap-2 border-b-2 h-24 p-5 border-[#5c758723] hover:cursor-pointer' onClick={()=>props.handleClick(props.userName)}>
      <div>
          <img src={groupicons} className=' w-[4rem]' alt="userIcon" />
      </div>

      <div className='w-full'>
          <div className='flex items-center justify-between'>
            <h1 className=' text-[1.35rem] font-bold '>Group name</h1>
            <p className='text-[#6d83949c]'>
              Time
            </p>
          </div>
          <p className='text-[#6d8394a6]'>Last massage.................</p>
      </div>
    </div> 
  )
}
