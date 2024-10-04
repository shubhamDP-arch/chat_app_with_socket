import React, { useState, useEffect } from "react";
import { Box, Center } from "@chakra-ui/react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000"); 

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(""); 
  const [joinedRoom, setJoinedRoom] = useState(false); 

  const joinRoom = () => {
    if (room !== "" && !joinedRoom) {
      socket.emit("join_room", room);
      setJoinedRoom(true); 
    }
  };

  useEffect(() => {
   
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message"); 
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && joinedRoom) {
      socket.emit("message", { room, message }); 
      setMessage(""); 
    }
  };

  return (
    <Center height="100vh">
      <Box
        className="chatBox"
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        width="400px"
        boxShadow="lg"
        textAlign="center"
      >
      
        {!joinedRoom && (
          <>
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter Room Name"
              style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "4px" }}
            />
            <button
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#4A90E2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={joinRoom}
            >
              Join Room
            </button>
          </>
        )}

        
        <Box mb={4}>
          {messages.map((msg, index) => (
            <div key={index}>{msg.message}</div> 
          ))}
        </Box>

        {/* Input for messages */}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Messages"
          style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "4px" }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4A90E2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={sendMessage}
        >
          Send Message
        </button>
      </Box>
    </Center>
  );
};

export default ChatPage;
