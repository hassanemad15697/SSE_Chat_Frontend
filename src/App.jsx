import { useEffect, useRef, useState } from 'react'
import './App.css'
import Login from './components/login'
import RouterLayout from './components/RouterLayout'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import MainChat from './components/MainChat'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RouterLayout/>}>
      <Route index element={<Login/>}/>
      <Route path='/chat' element={<MainChat/>}/>
    </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
