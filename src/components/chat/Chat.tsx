// import {  Site_Setting_All } from '@data/constants';
// import React, { useEffect, useState } from 'react';
import TextField from '@component/text-field/TextField';
import checkValidation from '@helper/checkValidation';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import ChatStyle from "./Chat.module.css";
import * as yup from "yup";
import axios from 'axios';
import { Create_message } from '@data/constants';
import { useAppContext } from '@context/app/AppContext';




const Chat: React.FC = () => {
    // const [user_type, setUser_type] = useState(3);
      const { dispatch } = useAppContext()

 
    function openForm() {
      document.getElementById("myForm").style.display = "block";
      document.getElementById("chat").style.display = "none";

    }

    function closeForm() {
      document.getElementById("myForm").style.display = "none";
        document.getElementById("chat").style.display = "block";

    }
    function closeChat() {
      document.getElementById("fromValue").style.display = "block";
      document.getElementById("message").style.display = "none";
      localStorage.removeItem('sender')
    }
    const handleFormSubmit = async (values) => {


    const {  emailExist } = await checkValidation({  email: values.email})
    const data = {
        ...values,
        
      };
    
    if (emailExist == true) {
      
    
      axios.post(`${Create_message}`, data).then((data) => {
          console.log("createdMessage", data);
          localStorage.setItem('sender', data.data.sender)
          document.getElementById("fromValue").style.display = "none";
          document.getElementById("message").style.display = "block";

            
       
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alertValue: "sugnup success...",
              }
            });
         
        }).catch(() => {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: "someting went wrong",
              alerType: "error",
            }
          });
        })


      

     
    }
    else {
      setErrors({
        ...errors,
        // username: userNameExist ? "user name already exist" : "",
        email: emailExist == false ? "Email not registered" : "",
      })
    }

  };

  useEffect(() => {
        if(localStorage.getItem('sender')){
              document.getElementById("fromValue").style.display = "none";
              document.getElementById("message").style.display = "block";
        }
        else{
          document.getElementById("fromValue").style.display = "block";
          document.getElementById("message").style.display = "none";

        }
          }, [])
   
  const { setErrors, values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });



  return (
    <div>
      <button className={ChatStyle.open_button} id="chat" onClick={openForm}>Chat</button>


          <div className={ChatStyle.chat_popup} id="myForm">
            <form   className={ChatStyle.form_container} onSubmit={handleSubmit}>
              <div id='fromValue'>
              <h4>There are no online operators at the moment, please leave a message</h4>

                  <div style={{display:"flex"}} >
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
               </div>
                <TextField
                  id='fromValue'
                  className='textArea'
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
               
              <button type="submit" className={ChatStyle.btn}>Leave a message</button>
              </div>
              <div style={{ backgroundColor:'#cdf4cd', borderRadius: '10px', display: 'none'  }}id='message'>
              <h4>Thank you for message. Please wait some moment</h4>
              
              <button type="button" className={ChatStyle.btn} onClick={closeChat}>Close Chat</button>

              </div>
              <button   type="button" className={ChatStyle.cancel} onClick={closeForm}>Close</button>
              
            </form>
          </div>
    </div>
    
  );
};
const initialValues = {
  name: "",
  email: "",
  message: "",
  
};
const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  message: yup.string().required("Feild is requred"),
  
  
});


export default Chat;
