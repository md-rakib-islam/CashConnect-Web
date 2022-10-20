import React, { useEffect, useRef, useState } from "react";
import ChatStyle from "./Chat.module.css";
import { BASE_URL, WS_URL } from "@data/constants";
import useUserInf from "@customHook/useUserInf";
import { useRouter } from "next/router";

const Chat: React.FC = () => {
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [receiverImage, setReceiverImage] = useState("");
  const { isLogin } = useUserInf();
  const router = useRouter();
  const scrollRef = useRef(null);

  const scrollTo = (ref) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const topImage = receiverImage ? BASE_URL + receiverImage : "/no_image.png";

  function openForm() {
    if (isLogin) {
      document.getElementById("myForm").style.display = "block";
      document.getElementById("chat").style.display = "none";
    } else {
      router.push("/login");
    }
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("chat").style.display = "block";
  }
  // function closeChat() {
  //   document.getElementById("fromValue").style.display = "block";
  //   document.getElementById("message").style.display = "none";
  //   localStorage.removeItem("sender");
  // }
  // useEffect(() => {
  //   const authTOKEN = localStorage.getItem("jwt_access_token");
  //   const token = authTOKEN;
  //   var ws = new WebSocket(`ws://${WS_URL}/ws/chat/?token=${token}`);

  //   ws.onopen = function () {
  //     console.log("WebSocket connection is open useEffect....");
  //     //  ws.send(JSON.stringify({ message: values.message }));
  //   };
  //   ws.onmessage = function (event) {
  //     let message = JSON.parse(event.data);
  //     if (message.msg_type === "new") {
  //       // let messageElem = document.createElement("div");
  //       // messageElem.textContent =
  //       // document.getElementById("messages").appendChild(messageElem);
  //     }
  //     // else if (message.msg_type == "old") {
  //     //   const messages = message.messages;
  //     //   console.log("messages: ", messages);
  //     //   setFieldValue("message", "");
  //     //   for (let message of messages) {
  //     //     console.log("message: ", message);
  //     //     let messageElem = document.createElement("div");
  //     //     messageElem.textContent = message.message;
  //     //     document.getElementById("messages").appendChild(messageElem);
  //     //     message.user.first_name + ": " + message.text + "\n";
  //     //   }
  //     // }
  //   };
  //   //  ws.onerror = function (event) {
  //   //    console.log("WebSocket Error occurred....", event);
  //   //  };
  //   //  ws.onclose = function (event) {
  //   //    console.log("WebSocket Connectin Closed....", event);
  //   //  };
  // }, []);

  // const connectSocket = () => {
  //   const authTOKEN = localStorage.getItem("jwt_access_token");
  //   const token = authTOKEN.slice(7);
  //   var ws = new WebSocket(`ws://${WS_URL}/ws/chat/?token=${token}`);

  //   return ws;
  // };
  useEffect(() => {
    if (!connected) {
      const authTOKEN = localStorage.getItem("jwt_access_token");
      const token = authTOKEN?.slice(7);
      var ws = new WebSocket(`ws://${WS_URL}/ws/chat/?token=${token}`);
      ws.onopen = function () {
        console.log("WebSocket connection is open....");
        setConnected(true);
        setSocket(ws);
      };
    }
  }, []);
  const onkeydown = (e) => {
    if (e.key == "Enter") {
      handleMessageSubmit(e);
    }
  };
  //  useEffect(() => {
  //    scrollRef.current.
  //  }, []);
  const handleMessageSubmit = async (values) => {
    if (isLogin) {
      const userId = localStorage.getItem("UserId");
      console.log("user id ", userId);

      values.preventDefault();
      if (!connected) {
        const authTOKEN = localStorage.getItem("jwt_access_token");
        const token = authTOKEN?.slice(7);
        var ws = await new WebSocket(`ws://${WS_URL}/ws/chat/?token=${token}`);
      } else {
        ws = socket;
      }

      ws.onopen = function () {
        console.log("WebSocket connection is open....");
        setConnected(true);
        setSocket(ws);
      };

      if (connected) {
        ws.send(JSON.stringify({ message: newMessage }));
        setNewMessage("");
      }

      ws.onmessage = function (event) {
        let message = JSON.parse(event.data);
        console.log("ChatMessage", message);
        if (message.msg_type == "new") {
          if (message.user.id == userId) {
            document.getElementById(
              "messages"
            ).innerHTML += `<div ref=${scrollTo} class=${
              ChatStyle.messageElemSender
            }><p class=${ChatStyle.sender}>${
              message.message
            }</p>  <img src=${`${
              message.user.image ? BASE_URL : `/no_image.png`
            }`}${
              message.user.image ? message.user.image : ""
            } alt='imgae'/></div>`;
          } else if (message.user.id !== userId) {
            setReceiverImage(message?.user?.image);
            document.getElementById(
              "messages"
            ).innerHTML += `<div ref=${scrollTo} class=${
              ChatStyle.messageElemReceiver
            }>
          <img src=${`${message.user.image ? BASE_URL : `/no_image.png`}`}${
              message.user.image ? message.user.image : ""
            }
          }alt=""/> 
          <p class=${ChatStyle.receiver}>${message.message}</p>
          </div>`;
          }
          document
            .getElementById("messages")
            .scrollIntoView({ behavior: "smooth" });
        }
        // else if (message.msg_type == "new" && message.user.id !== userId) {
        //   let messageElem = document.createElement("div");
        //   messageElem.textContent = message.message;
        //   document.getElementById("receiver").appendChild(messageElem);
        //   // setReceiver(message.message);
        //   document.getElementById("receiver").style.textAlign = "left";
        // }
        // else if (message.msg_type == "old") {
        //   const messages = message.messages;
        //   console.log("messages: ", messages);
        //   for (let message of messages) {
        //     console.log("message: ", message);
        //     let messageElem = document.createElement("div");
        //     messageElem.textContent = message.message;
        //     document.getElementById("messages2").appendChild(messageElem);
        //     // if (message.user.id === !userId) {
        //     //   document.getElementById("messages2").style.textAlign = "left";
        //     // } else {
        //     //   document.getElementById("messages").style.textAlign = "right";
        //     // }
        //   }
        // }
      };
      ws.onerror = function (event) {
        console.log("WebSocket Error occurred....", event);
      };
      ws.onclose = function (event) {
        console.log("WebSocket Connectin Closed....", event);
      };
    } else {
      router.push("/login");
    }
  };

  console.log("topImage", topImage);

  return (
    <div>
      <button className={ChatStyle.open_button} id="chat" onClick={openForm}>
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
      </button>

      <div className={ChatStyle.chat_popup} id="myForm">
        <div className={ChatStyle.form_container}>
          <div className={ChatStyle.top_chat}>
            <img src={topImage} alt="" />
            <div>
              <a onClick={closeForm}>
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none">
                    <path
                      stroke="white"
                      stroke-width="3"
                      d="M5 20 l15 0"
                    ></path>
                  </g>
                  Sorry, your browser does not support inline SVG.
                </svg>
              </a>
              <a onClick={closeForm}>
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12
 13.41 17.59 19 19 17.59 13.41 12z"
                  ></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
              </a>
            </div>
          </div>
          <div id="fromValue" className={ChatStyle.formFeild}>
            <div
              ref={scrollRef}
              id="messages"
              className={ChatStyle.message}
              style={{ height: "300px" }}
            ></div>
          </div>
          <div style={{ display: "flex" }}>
            <textarea
              id="fromValue"
              className={ChatStyle.textArea}
              name="message"
              autoComplete="off"
              placeholder="Type message.."
              onKeyDown={onkeydown}
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />

            <button
              onClick={handleMessageSubmit}
              type="submit"
              className={ChatStyle.btn}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 500 500"
              >
                <g>
                  <g>
                    <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"></polygon>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
