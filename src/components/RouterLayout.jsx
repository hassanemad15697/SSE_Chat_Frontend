import React, { useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function RouterLayout() {

  return (
    <div>

        <Outlet />
    </div>
  )
}
