import React from 'react'
import { userIcon } from './images'
import moment from 'moment';

export default function User(props) {
  const {name , userMassages} = props.userName
  // const {when} = userMassages[userMassages.length-1]
  const dateTimeAgo = moment(new Date(JSON.parse(localStorage.getItem('test')))).fromNow();
  console.log(dateTimeAgo)
  return (
    <div className={'sideBar__list__user flex justify-start ' + (props.isSelected == name &&"bg-[#C1D0DB]") +' items-center gap-2 p-5 border-b-2 h-24 border-[#5c758723] hover:cursor-pointer'} onClick={()=>props.handleClick(name)}>
        <div>
            <img src={userIcon} className=' w-[5rem]' alt="userIcon" />
        </div>

        <div className='w-full'>
            <div className='flex items-center justify-between'>
              <h1 className=' text-[1.35rem] font-bold '>{name}</h1>
              <p className='text-[#6d83949c]'>
                {dateTimeAgo}
              </p>
            </div>
            <p className='text-[#6d8394a6]'>{userMassages.length?userMassages[userMassages.length-1].message:"gg"}</p>
        </div>
    </div>
  )
}
