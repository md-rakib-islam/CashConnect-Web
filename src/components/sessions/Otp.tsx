import Alert from "@component/alert/alert";
import LoginPopup from "@component/LoginPopup";
import { CountryCodeSelect } from "@component/Select";
import { useAppContext } from "@context/app/AppContext";
import { BASE_URL, Customer_Create, Vendor_Create } from "@data/constants";
import { country_codes } from "@data/country_code";
import axios from "axios";
import { useFormik } from "formik";
import checkValidation from "helper/checkValidation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import CheckBox from "../CheckBox";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

interface SignupProps {
  type?: string,
  closeSignupDialog?: any,
}

const Otp: React.FC<SignupProps> = ({ type = "SignupPage", closeSignupDialog }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [customerVariant, setCustomerVariant] = useState("contained");
  const [vendorVariant, setvendorVariant] = useState("outlined");
  const [user_type, setUser_type] = useState(3);
  const [openLogin, setOpenLogin] = useState(false)

  const router = useRouter();

  const { dispatch } = useAppContext()

  const closeLoginTab = () => {
    setOpenLogin(false)
  }
  const [loading, setLoading] = useState(false)


  const handleLoadingComplete = () => {
    setLoading(false)
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleLoadingComplete)
  }, [router.events])

  const gotologin = () => {
    if (type == "SignupPage") {
      router.push("/login")
    }
    else {
      setOpenLogin(true)
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const singUpAsCustomer = () => {
    setUser_type(3);
    setCustomerVariant("contained");
    setvendorVariant("outlined");
  };

  const singUpAsVendor = () => {
    setvendorVariant("contained");
    setCustomerVariant("outlined");
    setUser_type(2);
  };

  const handleFormSubmit = async (values) => {

    console.log('values.otp',values.otp)

  };
  const handleOtpSubmit = async () => {

    setLoading(true)

    axios.get(`${BASE_URL}/customer/api/v1/customer/verify_primary_phone/?primary_phone=${values.primary_phone}&phone_otp=${values.otp}`).then(res=>{
      console.log("otpResponse",res)
      
      if (res.status ===200){
        router.push("/login")
        dispatch({
          type: "CHANGE_ALERT",
          payload: {
            alertValue: res.data.detail,
          }
        });
      }
      else {
        
        dispatch({
          type: "CHANGE_ALERT",
          payload: {
            alertValue: res.data.detail,
          }
        });
      }
      // else if (res.status !== 200){
      //   dispatch({
      //     type: "CHANGE_ALERT",
      //     payload: {
      //       alertValue: res.data.detail,
      //     }
      //   });
      // }
      // else {
      //     dispatch({
      //     type: "CHANGE_ALERT",
      //     payload: {
      //       alertValue: res.data.detail,
      //     }
      //   });
      // }
    })

    

  };


  const { setErrors, values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });
    const phoneNumber = router.query?.phoneNumber
  
    useEffect(() => {
      if (phoneNumber){

        setFieldValue('primary_phone',phoneNumber)

      }

    }, [phoneNumber]);


  const CustomOption = ({ innerProps, isDisabled, data }) => {

    console.log(`https://flagcdn.com/w20/${data.code.toLowerCase()}.png`)
    return !isDisabled ? (
      <div {...innerProps}
        style={{ cursor: "pointer", width: "180px" }}
      ><img src={`https://flagcdn.com/w20/${data.code.toLowerCase()}.png`}></img>
        {' ' + data.label}
      </div>
    ) : null;
  }


  return (
    <>
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />
      {loading && (
        <div style={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: '0px',
          left: '0px',
          display: 'flex',
          justifyContent: "center",
          backgroundColor: " rgb(0 0 0 / 50%)",
          alignItems: "center",
          zIndex: 100,
        }}>
          <img style={{
            height: "50px",
            width: "50px",
            marginTop: "100pz"
          }}
            src="/assets/images/gif/loading.gif" />
        </div>
      )}

      <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <H3 textAlign="center" mb="0.5rem" mt="2.5rem">
          OTP
        </H3>
      <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Please check your phone to send OTP
        </H5>
    

        <form
          className="content"
          style={{ paddingTop: "0px" }}
          onSubmit={handleSubmit}
        >
        

            
            <TextField
              mb="0.75rem"
              mt="1rem"
              name="primary_phone"
              // placeholder="Obtional"
              label="Phone Number"
              fullwidth
              readOnly
              onBlur={handleBlur}
              onChange={handleChange}
              value={`${values.primary_phone || ""}`}
              errorText={touched.primary_phone && errors.primary_phone}
            />
        

          <TextField
            mb="0.75rem"
            name="phone_otp"
            label="OTP"
            type="number"
            placeholder="12345"
            fullwidth
            onBlur={handleBlur}
            onChange={(e)=>setFieldValue('otp', e.target.value)}
            value={values.otp || ""}
            errorText={touched.phone_otp && errors.phone_otp}
          />

       

          <Button
            mb="1.65rem"
            variant="contained"
            color="primary"
            fullwidth
            onClick={handleOtpSubmit}
          >
           Send OTP
          </Button>

      

         
        </form>
      
      </StyledSessionCard>
    </>
  );
};

const initialValues = {
  otp: "",
  
  
};

const formSchema = yup.object().shape({
  Otp: yup.string().required("otp is required"),
  
});

export default Otp;

