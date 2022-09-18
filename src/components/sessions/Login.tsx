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
import authService from "../../services/authService";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useGoogleLogin } from "@react-oauth/google";
import CheckBox from "@component/CheckBox";
import Cookies from "js-cookie";

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
  const [nameCookie, setNameCookie] = useState();
  const [passwordCookie, setPasswordCookie] = useState();

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
  const gotoreset = () => {
    router.push("/sendOtp");
  };

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    setLoading(true);

    const { username, password } = values;
    console.log(values);

    return jwtService.signInWithEmailAndPassword(username, password).then(
      (user) => {
        console.log("user", user);

        axios
          .get(`${Get_Pending_Order_After_Login}`, authTOKEN)
          .then((res) => {
            console.log("order_Id_res", res, authTOKEN);
            if (res.data.id) {
              localStorage.setItem("OrderId", res.data.id);
            } else {
              localStorage.removeItem("OrderId");
            }
          })
          .catch(() => {
            setLoading(false), localStorage.removeItem("OrderId");
          });

        dispatch({
          type: "CHANGE_ALERT",
          payload: {
            alertValue: "login success...",
          },
        });
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

        // if (user.user_type === "customer") {
        //   if (type != "popup") {
        //     const backUrl = localStorage.getItem("backAfterLogin");
        //     if (backUrl) {
        //       localStorage.removeItem("backAfterLogin");
        //       router.push(`${backUrl}`);
        //     } else {
        //       router.push("/profile");
        //     }
        //   } else {
        //     closeLoginDialog();
        //     localStorage.removeItem("backAfterLogin");
        //   }
        // } else if (user.user_type == "vendor") {
        //   if (type != "popup") {
        //     const backUrl = localStorage.getItem("backAfterLogin");
        //     if (backUrl) {
        //       localStorage.removeItem("backAfterLogin");
        //       router.push(`${backUrl}`);
        //     } else {
        //       router.push("/vendor/dashboard");
        //     }
        //   } else {
        //     closeLoginDialog();
        //     localStorage.removeItem("backAfterLogin");
        //   }
        // }
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
              alertValue: `${_errors.response.data.detail}`,
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

  // facebook
  const responseFacebook = (response) => {
    console.log("responseFacebook", response);
    console.log("name", response.name);
    const fb_auth_token = sessionStorage.getItem("fbssls_5515163185212209");

    const auth_token = response.accessToken || fb_auth_token;

    return authService.signInWithFacebook(auth_token).then(
      (user) => {
        console.log("userFacebook", user);

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

        // if (user.user_type === "customer") {
        //   if (type != "popup") {
        //     const backUrl = localStorage.getItem("backAfterLogin");
        //     if (backUrl) {
        //       localStorage.removeItem("backAfterLogin");
        //       router.push(`${backUrl}`);
        //     } else {
        //       router.push("/profile");
        //     }
        //   } else {
        //     closeLoginDialog();
        //     localStorage.removeItem("backAfterLogin");
        //   }
        // } else if (user.user_type == "vendor") {
        //   if (type != "popup") {
        //     const backUrl = localStorage.getItem("backAfterLogin");
        //     if (backUrl) {
        //       localStorage.removeItem("backAfterLogin");
        //       router.push(`${backUrl}`);
        //     } else {
        //       router.push("/vendor/dashboard");
        //     }
        //   } else {
        //     closeLoginDialog();
        //     localStorage.removeItem("backAfterLogin");
        //   }
        // }
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
      },
      (_errors) => {
        console.log("login failed", _errors.response.status);

        if (_errors.response.status == 400) {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: "Waiting...",
            },
          });
        }
        // else if (_errors.response.status == 401) {
        //   dispatch({
        //     type: "CHANGE_ALERT",
        //     payload: {
        //       alertValue: "Email or Password is wrong",
        //       alerType: "error",
        //     },
        //   });
        // }
        // else {
        //   dispatch({
        //     type: "CHANGE_ALERT",
        //     payload: {
        //       alertValue: "",
        //       alerType: "error",
        //     },
        //   });
        // }

        if (type != "popup") {
          router.push("/login");
        }
      }
    );
  };
  // google
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => responseGoogle(tokenResponse),
  });
  const responseGoogle = (response) => {
    console.log("responseGoogle", response);
    console.log("name", response.name);
    const auth_token = response.access_token;

    return authService.signInWithGoogle(auth_token).then(
      (user) => {
        console.log("userGoogle", user);

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

        // if (user.user_type === "customer") {
        //   if (type != "popup") {
        //     const backUrl = localStorage.getItem("backAfterLogin");
        //     if (backUrl) {
        //       localStorage.removeItem("backAfterLogin");
        //       router.push(`${backUrl}`);
        //     } else {
        //       router.push("/profile");
        //     }
        //   } else {
        //     closeLoginDialog();
        //     localStorage.removeItem("backAfterLogin");
        //   }
        // } else if (user.user_type == "vendor") {
        //   if (type != "popup") {
        //     const backUrl = localStorage.getItem("backAfterLogin");
        //     if (backUrl) {
        //       localStorage.removeItem("backAfterLogin");
        //       router.push(`${backUrl}`);
        //     } else {
        //       router.push("/vendor/dashboard");
        //     }
        //   } else {
        //     closeLoginDialog();
        //     localStorage.removeItem("backAfterLogin");
        //   }
        // }
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
        } else if (_errors.response.status == 400) {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: "Email or Password is wrong",
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

  console.log("cookiesData", nameCookie, passwordCookie);

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

  // set Cookeis for remember me
  const setCookies = () => {
    var username = values.username;
    var password = values.password;

    Cookies.set("UserName", `${username}`, {
      expires: 7,
      path: "http://localhost:4005",
    });
    Cookies.set("UserPassword", `${password}`, {
      expires: 7,
      path: "http://localhost:4005",
    });
  };
  //get Cookies
  useEffect(() => {
    setNameCookie(Cookies.get("UserName"));
    setPasswordCookie(Cookies.get("UserPassword"));
    setFieldValue("username", nameCookie);
    setFieldValue("password", passwordCookie);
    setFieldValue("remember", !passwordCookie ? false : true);
  }, [nameCookie, passwordCookie]);
  console.log("values", values);
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
            fontSize="0.875rem"
            color="gray.800"
            textAlign="center"
            mb="2.25rem"
          >
            Please Login To Your Account
          </H5>

          <TextField
            mb="0.75rem"
            name="username"
            placeholder="User Name"
            label="User Name"
            type="username"
            fullwidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.username || ""}
            errorText={touched.username && errors.username}
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
          <FlexBox style={{ justifyContent: "space-between" }}>
            <CheckBox
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
            />
            <H6
              fullwidth
              ml="0px"
              style={{
                cursor: "pointer",
                fontSize: "0.875rem",
                borderColor: "gray.900",
                borderBottom: "1px solid",
                alignItems: "flex-start",
              }}
              onClick={gotoreset}
            >
              Forgot password?
            </H6>
          </FlexBox>

          <Button
            mb="1.65rem"
            mt="1rem"
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
              <Span
                fontSize="0.875rem"
                color="text.muted"
                bg="body.paper"
                px="1rem"
              >
                on
              </Span>
            </FlexBox>
          </Box>
        </form>
        <form style={{ padding: "1rem 3.75rem 0px" }}>
          <FacebookLogin
            appId="5515163185212209"
            callback={responseFacebook}
            render={(renderProps) => (
              <>
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  bg="#3B5998"
                  borderRadius={5}
                  height="40px"
                  color="white"
                  cursor="pointer"
                  mb="0.75rem"
                  onClick={renderProps.onClick}
                >
                  <Icon variant="small" defaultcolor="auto" mr="0.5rem">
                    facebook-filled-white
                  </Icon>
                  <Small
                    onClick={responseFacebook}
                    style={{
                      width: "45%",
                      backgroundColor: "#3B5998",
                      border: "none",
                      color: "whitesmoke",
                      textAlign: "left",
                      fontWeight: 600,
                    }}
                  >
                    Continue with Facebook
                  </Small>
                </FlexBox>
              </>
            )}
          />
          <FlexBox
            justifyContent="center"
            alignItems="center"
            bg="#4285F4"
            borderRadius={5}
            height="40px"
            color="white"
            cursor="pointer"
            mb="0.75rem"
            onClick={() => login()}
          >
            <Icon variant="small" defaultcolor="auto" mr="0.5rem">
              google-1
            </Icon>
            <Small
              style={{
                width: "45%",
                backgroundColor: "#4285F4",
                border: "none",
                color: "whitesmoke",
                textAlign: "left",
                fontWeight: 600,
              }}
            >
              Continue with Google
            </Small>
          </FlexBox>

          {/* render=
          {(renderProps) => (
            <>
              <FlexBox
                justifyContent="center"
                alignItems="center"
                bg="#4285F4"
                borderRadius={5}
                height="40px"
                color="white"
                cursor="pointer"
                mb="0.75rem"
                onClick={renderProps.onClick}
              >
                <Icon variant="small" defaultcolor="auto" mr="0.5rem">
                  google-1
                </Icon>
                <Small
                  style={{
                    width: "45%",
                    backgroundColor: "#4285F4",
                    border: "none",
                    color: "whitesmoke",
                    textAlign: "left",
                    fontWeight: 600,
                  }}
                >
                  Continue with Google
                </Small>
              </FlexBox>
            </>
          )} */}
          {/* <FlexBox
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
            <SemiSpan style={{ cursor: "pointer" }} onClick={gotosingup}>
              Don’t have account?
            </SemiSpan>
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
  username: "",
  password: "",
  remember: true,
};

const formSchema = yup.object().shape({
  username: yup.string().required("${path} is required"),

  password: yup.string().required("${path} is required"),
});

export default Login;
