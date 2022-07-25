import Alert from "@component/alert/alert";
import SignupPopup from "@component/SignupPopup";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { Get_Pending_Order_After_Login } from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import jwtService from "../../services/jwtService";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

interface LoginProps {
  type?: string;
  closeLoginDialog?: any;
}

const Login: React.FC<LoginProps> = ({
  type = "loginPage",
  closeLoginDialog,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();
  const { dispatch } = useAppContext();

  const [openSignup, setOpenSignup] = useState(false);

  const { authTOKEN } = useUserInf();

  const [loading, setLoading] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleLoadingComplete);
  }, [router.events]);

  const closeSignupTab = () => {
    setOpenSignup(false);
  };

  const gotosingup = () => {
    if (type == "loginPage") {
      router.push("/signup");
    } else {
      setOpenSignup(true);
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    setLoading(true);

    const { password } = values;
    const newValue = "+88" + values.primary_phone;
    console.log(values);

    return jwtService.signInWithEmailAndPassword(newValue, password).then(
      (user) => {
        console.log("user", user);

        axios
          .get(`${Get_Pending_Order_After_Login}`, authTOKEN)
          .then((res) => {
            console.log("order_Id_res", res);
            if (res.data.id) {
              localStorage.setItem("OrderId", res.data.id);
            } else {
              localStorage.removeItem("OrderId");
            }
          })
          .catch(() => localStorage.removeItem("OrderId"));

        dispatch({
          type: "CHANGE_ALERT",
          payload: {
            alertValue: "login success...",
          },
        });

        if (user.user_type === "customer") {
          if (type != "popup") {
            const backUrl = localStorage.getItem("backAfterLogin");
            if (backUrl) {
              localStorage.removeItem("backAfterLogin");
              router.push(`${backUrl}`);
            } else {
              router.push("/profile");
            }
          } else {
            closeLoginDialog();
            localStorage.removeItem("backAfterLogin");
          }
        } else if (user.user_type == "vendor") {
          if (type != "popup") {
            const backUrl = localStorage.getItem("backAfterLogin");
            if (backUrl) {
              localStorage.removeItem("backAfterLogin");
              router.push(`${backUrl}`);
            } else {
              router.push("/vendor/dashboard");
            }
          } else {
            closeLoginDialog();
            localStorage.removeItem("backAfterLogin");
          }
        }
      },
      (_errors) => {
        console.log("login failed", _errors.response.status);

        if (_errors.response.status == 403) {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: "Phone number is not verified",
              alerType: "error",
            },
          });
        } else if (_errors.response.status == 401) {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: "Email or Password is wrong",
              alerType: "error",
            },
          });
        } else {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: "Email and Password is wrong",
              alerType: "error",
            },
          });
        }

        if (type != "popup") {
          router.push("/login");
        }
      }
    );
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <>
      <SignupPopup open={openSignup} closeSignupDialog={closeSignupTab} />
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
        <form className="content" onSubmit={handleSubmit}>
          {type === "loginPage" && <Alert onLogin />}
          <img
            style={{
              width: "80px",
              display: "block",
              marginRight: "auto",
              marginLeft: "auto",
            }}
            src="assets/images/logos/footer.png"
            alt="logo"
          />
          <H3 textAlign="center" mb="0.5rem">
            Welcome To CashConnect
          </H3>
          <H5
            fontWeight="600"
            fontSize="12px"
            color="gray.800"
            textAlign="center"
            mb="2.25rem"
          >
            Please Login Your Account
          </H5>

          <TextField
            mb="0.75rem"
            name="primary_phone"
            placeholder="exmple@mail.com"
            label="Email or Phone Number"
            type="primary_phone"
            fullwidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.primary_phone || ""}
            errorText={touched.primary_phone && errors.primary_phone}
          />
          <TextField
            mb="1rem"
            name="password"
            placeholder="*********"
            autoComplete="on"
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

          <Button
            mb="1.65rem"
            variant="contained"
            color="primary"
            type="submit"
            fullwidth
          >
            Login
          </Button>

          <Box mb="1rem">
            <Divider width="200px" mx="auto" />
            <FlexBox justifyContent="center" mt="-14px">
              <Span color="text.muted" bg="body.paper" px="1rem">
                on
              </Span>
            </FlexBox>
          </Box>

          {/* <FlexBox
            justifyContent="center"
            alignItems="center"
            bg="#3B5998"
            borderRadius={5}
            height="40px"
            color="white"
            cursor="pointer"
            mb="0.75rem"
          >
            <Icon variant="small" defaultcolor="auto" mr="0.5rem">
              facebook-filled-white
            </Icon>
            <Small fontWeight="600">Continue with Facebook</Small>
          </FlexBox>

          <FlexBox
            justifyContent="center"
            alignItems="center"
            bg="#4285F4"
            borderRadius={5}
            height="40px"
            color="white"
            cursor="pointer"
            mb="1.25rem"
          >
            <Icon variant="small" defaultcolor="auto" mr="0.5rem">
              google-1
            </Icon>
            <Small fontWeight="600">Continue with Google</Small>
          </FlexBox> */}

          <FlexBox justifyContent="center" mb="1.25rem">
            <SemiSpan>Don’t have account?</SemiSpan>
            <H6
              color="primary.main"
              style={{ cursor: "pointer" }}
              onClick={gotosingup}
              ml="0.5rem"
              borderColor="primary.main"
              borderBottom="1px solid #e94560"
            >
              Sign Up
            </H6>
          </FlexBox>
        </form>

        {/* <FlexBox justifyContent="center" bg="gray.200" py="19px">
          <SemiSpan>Forgot your password?</SemiSpan>
          <Link href="/">
            <a>
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Reset It
              </H6>
            </a>
          </Link>
        </FlexBox> */}
      </StyledSessionCard>
    </>
  );
};

const initialValues = {
  primary_phone: "",
  password: "",
};

const formSchema = yup.object().shape({
  primary_phone: yup
    .string()
    .required("${path} is required")
    .min(11, "Please remove country code")
    .max(11, "Please remove country code"),
  password: yup.string().required("${path} is required"),
});

export default Login;
