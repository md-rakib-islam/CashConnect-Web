import FlexBox from "@component/FlexBox";
import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import {
  Get_phone_varification_code_by_customer,
  Get_phone_varification_code_for_resend_otp,
} from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Button from "../buttons/Button";

import TextField from "../text-field/TextField";
import { H3, H5, H6 } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

interface SignupProps {
  type?: string;
  closeSignupDialog?: any;
}

const Otp: React.FC<SignupProps> = () => {
  const router = useRouter();

  const [openLogin, setOpenLogin] = useState(false);
  const [otpError, setOtpError] = useState("");
  const phoneNumber = router.query?.phoneNumber;

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
        `${Get_phone_varification_code_by_customer}?primary_phone=${values.primary_phone}&phone_otp=${values.otp}`
      )
      .then((res) => {
        console.log("otpResponse", res);

        if (res.status === 200) {
          router.push("/login").then(() => window.location.reload());
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

  //Resend Otp
  const resendOtp = () => {
    axios
      .get(
        `${Get_phone_varification_code_for_resend_otp}?primary_phone=${phoneNumber}`
      )
      .then((res) => {
        console.log("otpResponse", res);

        if (res.status === 200) {
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

        console.log(error);
      });
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

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
          OTP
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Check your phone to get OTP
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
            fullwidth
            onBlur={handleBlur}
            onChange={(e) => setFieldValue("otp", e.target.value)}
            value={values.otp || ""}
            errorText={otpError || ""}
          />
          <FlexBox
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: "row-reverse",
              marginBottom: "1rem",
            }}
          >
            {/* <CheckBox
              mb="1.75rem"
              name="remember"
              color="secondary"
              checked={values.remember}
              onClick={setCookies}
              onChange={handleChange}
              label={
                <FlexBox>
                  <SemiSpan>Remember me</SemiSpan>
                </FlexBox>
              }
            /> */}
            <H6
              fullwidth
              ml="0px"
              style={{
                cursor: "pointer",
                fontSize: "0.875rem",
                borderColor: "gray.900",
                borderBottom: "1px solid",
              }}
              onClick={resendOtp}
            >
              Resend OTP
            </H6>
          </FlexBox>
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
