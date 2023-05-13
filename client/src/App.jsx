import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import "./App.css";

const socket = io.connect("http://localhost:5000");

function App() {
  const [input, setInput] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message: input });
    setInput("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, [socket]);

  return (
    <>
      <div className="App">
        <form onSubmit={sendMessage}>
          <div className="d-flex w-50 m-auto justify-content-between">
            <input
              value={input}
              className="form-control mx-2"
              type="text"
              placeholder="Message"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-outline-primary"
              variant="outlined"
            >
              send
            </button>
          </div>
        </form>

        <span>received message: {receivedMessage}</span>
      </div>
    </>
  );
}

export default App;
