import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import { Get_phone_varification_code_for_reset_password } from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Button from "../buttons/Button";

import TextField from "../text-field/TextField";
import { H3, H5 } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

interface SignupProps {
  type?: string;
  closeSignupDialog?: any;
}

const SendOtp: React.FC<SignupProps> = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [otpError, setOtpError] = useState("");

  const router = useRouter();

  const { dispatch } = useAppContext();

  const closeLoginTab = () => {
    setOpenLogin(false);
  };
  const [loading, setLoading] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleLoadingComplete);
  }, [router.events]);

  const handleFormSubmit = async (values) => {
    console.log("values.otp", values.otp);
  };
  const handleOtpSubmit = async () => {
    setLoading(true);

    axios
      .get(
        `${Get_phone_varification_code_for_reset_password}?primary_phone=${values.primary_phone}`
      )
      .then((res) => {
        console.log("otpResponse", res);

        if (res.status === 200) {
          router.push("/resetPassword");
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: res.data.detail,
            },
          });
        } else {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: res.data.detail,
            },
          });
        }
      })
      .catch((error) => {
        setLoading(false);

        if (error.response.status !== 200) {
          // The request was made and the server responded with a status code
          setOtpError(error.response.data.detail);
          console.log("error.response.data.detail", error.response.data.detail);
          console.log(error.response.status);
        }
      });
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });
  const phoneNumber = router.query?.phoneNumber;

  useEffect(() => {
    if (phoneNumber) {
      setFieldValue("primary_phone", phoneNumber);
    }
  }, [phoneNumber]);

  return (
    <>
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />
      {loading && (
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: " rgb(0 0 0 / 50%)",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <img
            style={{
              height: "100px",
              width: "100px",
              marginTop: "100pz",
            }}
            src="/assets/images/gif/loading.gif"
          />
        </div>
      )}

      <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
        <H3 textAlign="center" mb="0.5rem" mt="2.5rem">
          Forgot Password?
        </H3>
        <H5
          fontWeight="600"
          fontSize="0.875rem"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Enter your phone number to recover your password.
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
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.primary_phone || ""}
            errorText={
              (errors.primary_phone && touched.primary_phone && otpError) || ""
            }
          />

          <Button
            mb="2.65rem"
            variant="contained"
            color="primary"
            fullwidth
            onClick={handleOtpSubmit}
          >
            Get OTP
          </Button>
        </form>
      </StyledSessionCard>
    </>
  );
};

const initialValues = {
  primary_phone: "",
};

const formSchema = yup.object().shape({
  primary_phone: yup.string().required("Please enter your phone number"),
});

export default SendOtp;
