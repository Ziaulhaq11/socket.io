import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";
import "./App.css";

const userName = nanoid(4)
const socket = io("http://localhost:5000/");
function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);


  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName }); //chat is a backend event name
    setMessage("");
  };

  useEffect(() => {
    //we're not listening from the message state, we're listening from the event
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
        {chat.map((chat, index) => {
          return <p key={index}>{chat.message} : <span>id : {chat.userName}</span> </p>;
        })}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="Send text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
