import React, { useEffect, useRef, useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './component/Register'
import Message from './component/Message'
import {io} from "socket.io-client"
export default function App() {
  const [user, setUser] = useState("")
  const [socket, setSocket] = useState(null)
  const [usersOnline, setUsersOnline] = useState([])
  useEffect(() => {
   setSocket(io("http://localhost:3000"))
  },[])
  useEffect(() => {
    if(user !== ""){
    socket?.emit("newUser", user)
    socket?.on("user_online", (data)=>{
      console.log(data)
      setUsersOnline(data)
    })
    }
  },[socket, user])
const getIdUser = (User)=>{
  console.log(User)
  setUser(User)
}

  return (
    <>
      <Routes>
        <Route path="/" element={<Register getIdUsera = {getIdUser} />} />
        <Route path="/chat" element={<Message user = {user}  socket = {socket} usersOnline = {usersOnline} />} />
      </Routes>
    </>
  )
}
