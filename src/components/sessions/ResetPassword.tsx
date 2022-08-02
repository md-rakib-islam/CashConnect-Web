import IconButton from "@component/buttons/IconButton";
import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import { Reset_password_with_otp_code } from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Button from "../buttons/Button";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5 } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

interface SignupProps {
  type?: string;
  closeSignupDialog?: any;
}

const ResetPassword: React.FC<SignupProps> = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [otpError, setOtpError] = useState("");

  const router = useRouter();

  const { dispatch } = useAppContext();

  const closeLoginTab = () => {
    setOpenLogin(false);
  };
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleLoadingComplete);
  }, [router.events]);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const handleFormSubmit = async (values) => {
    console.log("values.otp", values.otp);
  };
  const handleOtpSubmit = async () => {
    setLoading(true);

    axios
      .post(`${Reset_password_with_otp_code}`, values)
      .then((res) => {
        console.log("otpResponse", res);

        if (res.status === 200) {
          router.push("/login");
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
          Reset Password
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Enter your phone, code and new password and confirm password.
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
            onChange={(e) => setFieldValue("otp", e.target.value)}
            value={values.otp || ""}
            errorText={otpError || ""}
          />
          <TextField
            mb="0.75rem"
            name="password"
            placeholder="*********"
            type={passwordVisibility ? "text" : "password"}
            label="Password"
            fullwidth
            endAdornment={
              <IconButton
                size="small"
                type="button"
                p="0.25rem"
                mr="0.25rem"
                color={passwordVisibility ? "gray.700" : "gray.600"}
                onClick={togglePasswordVisibility}
              >
                <Icon variant="small" defaultcolor="currentColor">
                  {passwordVisibility ? "eye-alt" : "eye"}
                </Icon>
              </IconButton>
            }
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password || ""}
            errorText={touched.password && errors.password}
          />
          <TextField
            mb="1rem"
            name="confirm_password"
            placeholder="*********"
            type={passwordVisibility ? "text" : "password"}
            label="Confirm Password"
            fullwidth
            endAdornment={
              <IconButton
                size="small"
                type="button"
                p="0.25rem"
                mr="0.25rem"
                color={passwordVisibility ? "gray.700" : "gray.600"}
                onClick={togglePasswordVisibility}
              >
                <Icon variant="small" defaultcolor="currentColor">
                  {passwordVisibility ? "eye-alt" : "eye"}
                </Icon>
              </IconButton>
            }
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.confirm_password || ""}
            errorText={touched.confirm_password && errors.confirm_password}
          />

          <Button
            mb="1.65rem"
            variant="contained"
            color="primary"
            fullwidth
            onClick={handleOtpSubmit}
          >
            Reset Password
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

export default ResetPassword;
