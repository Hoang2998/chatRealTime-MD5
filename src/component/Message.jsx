import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

export default function Message({ user, socket, usersOnline }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [sended, setSended] = useState([]);
  const scrollRef = useRef(null);
  const [usera, setUsera] = useState({});
  const [userOnline, setUserOnline] = useState([]);
  const [chatOnline, setChatOnline] = useState([]);
  // const users = async()=>{
  //   return await axios.get("http://localhost:3000/user/1")

  useEffect(() => {
    if (user !== "") {
      socket.on("userArr", (data) => {
        setUserOnline(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    socket?.on("receive_message", (data) => {
      console.log(data);
      setSended((prev) => [...prev, data]);
    });
    socket?.on("user", (data) => {
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sended]);
  const changeValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const join = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = async () => {
    const messageData = {
      room: room,
      name: name,
      message: message,
    };
    await socket.emit("send_message", messageData);
    setSended((prev) => [...prev, messageData]);
  };
  const chat = (data) => {
    setChatOnline((prev) => [...prev, data]);
    const idRoom = Math.floor(Math.random() * 999999);
  };

  return (
    <>
      <div>
        <h1>App</h1>
        <h3>thông báo</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {userOnline.map((data, index) => {
            return (
              <div
                key={index}
                onClick={() => chat(data)}
                style={{ cursor: "pointer" }}
              >
                <h3>{data.name}</h3>
                <p>
                  {data.name != "" ? "online" : "offline"}{" "}
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: data.name != "" ? "green" : "red",
                      display: "inline-block",
                    }}
                  ></span>{" "}
                </p>
              </div>
            );
          })}
        </div>

        {/* <input type="text"  placeholder='Enter room' name='room' onChange={(e) => setRoom(e.target.value)} />
        <input type="text" placeholder='Enter name' name='name' onChange={(e) => setName(e.target.value)}/>
        <button onClick={join} >JOIN</button> */}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        {chatOnline.map((data, index) => {
          return (
            <div style={{ border: "1px solid black", width: "300px" }}>
              <h1>Chat {data.name}</h1>
              <input
                type="text"
                placeholder="Enter message"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>SEND</button>
              {/* <div style={{width: '500px', height: '500px', overflow: 'auto'}}> */}
              <div
                style={{
                  width: "300px",
                  height: "200px",
                  border: "1px solid black",
                  position: "relative",
                  overflow: "auto",
                }}
              >
                {sended.map((data, index) => {
                  return (
                    <p
                      key={index}
                      style={{
                        width: "fit-content",
                        padding: "5px 20px",
                        borderRadius: "10px",
                        color: "white",
                        backgroundColor:
                          data.name == name ? "aquamarine" : "green",
                        margin: "5px",
                        marginLeft: data.name == name ? "auto" : "0",
                      }}
                    >
                      {data.name} : {data.message}
                    </p>
                  );
                })}
                <div ref={scrollRef}></div>
                {/* </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
