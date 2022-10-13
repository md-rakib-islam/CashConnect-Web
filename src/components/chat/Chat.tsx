// import {  Site_Setting_All } from '@data/constants';
// import React, { useEffect, useState } from 'react';
import TextField from "@component/text-field/TextField";
import { useFormik } from "formik";
import React from "react";
import ChatStyle from "./Chat.module.css";
import * as yup from "yup";
import { WS_URL } from "@data/constants";

const Chat: React.FC = () => {
  // const [user_type, setUser_type] = useState(3);

  // var ws = null;
  // var ws = null;

  function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("chat").style.display = "none";
  }

  // function closeForm() {
  //   document.getElementById("myForm").style.display = "none";
  //   document.getElementById("chat").style.display = "block";
  // }
  // function closeChat() {
  //   document.getElementById("fromValue").style.display = "block";
  //   document.getElementById("message").style.display = "none";
  //   localStorage.removeItem("sender");
  // }
  // useEffect(() => {
  //   const authTOKEN = localStorage.getItem("jwt_access_token");
  //   const token = authTOKEN.slice(7);
  //   var ws = new WebSocket(`ws://${WS_URL}/ws/chat/?token=${token}`);

  //   ws.onopen = function () {
  //     console.log("WebSocket connection is open....");
  //     //  ws.send(JSON.stringify({ message: values.message }));
  //   };
  //   ws.onmessage = function (event) {
  //     let message = JSON.parse(event.data);

  //     console.log("message", message);
  //     // if (message.msg_type === "new") {
  //     //   let messageElem = document.createElement("div");
  //     //   messageElem.textContent = message.message;
  //     //   document.getElementById("messages").prepend(messageElem);
  //     // }
  //   };
  //   //  ws.onerror = function (event) {
  //   //    console.log("WebSocket Error occurred....", event);
  //   //  };
  //   //  ws.onclose = function (event) {
  //   //    console.log("WebSocket Connectin Closed....", event);
  //   //  };
  // }, []);

  const handleFormSubmit = async (values) => {
    console.log("form value", values);
    const authTOKEN = localStorage.getItem("jwt_access_token");
    const token = authTOKEN.slice(7);
    var ws = new WebSocket(`ws://${WS_URL}/ws/chat/?token=${token}`);

    ws.onopen = function () {
      console.log("WebSocket connection is open....");
      ws.send(JSON.stringify({ message: values.message }));
    };
    ws.onmessage = function (event) {
      let message = JSON.parse(event.data);
      if (message.msg_type === "new") {
        let messageElem = document.createElement("div");
        messageElem.textContent = message.message;
        document.getElementById("messages").prepend(messageElem);
      }
    };
    ws.onerror = function (event) {
      console.log("WebSocket Error occurred....", event);
    };
    ws.onclose = function (event) {
      console.log("WebSocket Connectin Closed....", event);
    };
  };

  const {
    // setErrors,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

  return (
    <div>
      <button className={ChatStyle.open_button} id="chat" onClick={openForm}>
        Chat
      </button>

      <div className={ChatStyle.chat_popup} id="myForm">
        <form className={ChatStyle.form_container} onSubmit={handleSubmit}>
          <div id="fromValue">
            <h4>
              There are no online operators at the moment, please leave a
              message
            </h4>
            <div id="messages"></div>
            {/* <div style={{ display: "flex" }}>
              <TextField
                mb="0.75rem"
                mr="0.75rem"
                name="name"
                label="Name*"
                placeholder="Full Name"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name || ""}
                errorText={touched.name && errors.name}
              />
              <TextField
                mb="0.75rem"
                name="email"
                label="Email*"
                placeholder="exmple@mail.com"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email || ""}
                errorText={touched.email && errors.email}
              />
            </div> */}
            <TextField
              id="fromValue"
              className="textArea"
              mb="0.75rem"
              name="message"
              label="Your question*"
              placeholder="Type message.."
              fullwidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.message || ""}
              errorText={touched.message && errors.message}
            />

            <button type="submit" className={ChatStyle.btn}>
              Leave a message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const initialValues = {
  message: "",
};
const formSchema = yup.object().shape({
  message: yup.string().required("Feild is requred"),
});

export default Chat;
