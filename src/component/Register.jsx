import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// const socket = io("http://localhost:3000")
export default function Register( {getIdUsera}) {
const [name, setName] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate()

// useEffect(() => {
// const socket = io("http://localhost:3000")
// },[])

const login = async () => {
    const status = await axios.put(`http://localhost:3000/userStatus?name=${name}`)
    const result = await axios.get(`http://localhost:3000/user?name=${name}`)
    console.log(result.data)
    if( result.data.idUser != null){
       getIdUsera(result.data)
       navigate("/chat")
    }
}

  return (
    <>
      <h1>Login chat</h1>
      <p>Enter your name</p>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <br />
      <p>Enter your password</p>
      <input type="text" onChange={(e) => setPassword(e.target.value)}/>
      <br />
      <button onClick={login}>login</button>
    </>
  )
}
