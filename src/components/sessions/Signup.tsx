import Grid from "@component/grid/Grid";
// import { CountryCodeSelect } from "@component/Select";
import { useAppContext } from "@context/app/AppContext";
import {
  Customer_Create,
  // Get_Pending_Order_After_Login,
} from "@data/constants";
// import { country_codes } from "@data/country_code";
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
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { StyledSessionCard } from "./SessionStyle";
// import AuthService from "services/authService";

interface SignupProps {
  type?: string;
  closeSignupDialog?: any;
}

const Signup: React.FC<SignupProps> = ({
  type = "SignupPage",
  closeSignupDialog,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  // const [customerVariant, setCustomerVariant] = useState("contained");
  // const [vendorVariant, setvendorVariant] = useState("outlined");
  const [user_type, setUser_type] = useState(3);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    setFieldValue("email", "");
    setUser_type(3);
  }, []);
  useEffect(() => {
    router.events.on("routeChangeComplete", handleLoadingComplete);
  }, [router.events]);

  const { dispatch } = useAppContext();

  const gotologin = () => {
    router.push("/login");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  // const singUpAsCustomer = () => {
  //   setUser_type(3);
  //   setCustomerVariant("contained");
  //   setvendorVariant("outlined");
  // };

  // const singUpAsVendor = () => {
  //   setvendorVariant("contained");
  //   setCustomerVariant("outlined");
  //   setUser_type(2);
  // };

  const handleFormSubmit = async (values) => {
    setLoading(true);

    const { isValid, emailExist, primaryPhoneExist } = await checkValidation({
      email: values.email,
      primaryPhone: values.primary_phone,
    });

    console.log("isValid", isValid);
    if (isValid) {
      const data = {
        ...values,
        primary_phone: `${values.primary_phone}`,
        phone_otp: `${values.otp}`,
      };

      if (user_type == 3) {
        axios
          .post(`${Customer_Create}`, data)
          .then((data) => {
            console.log("createdCustomerRes", data);
            if (type == "SignupPage") {
              router.push({
                pathname: `/otp/${values.primary_phone}`,
              });

              dispatch({
                type: "CHANGE_ALERT",
                payload: {
                  alertValue: "sugnup success...",
                },
              });
            } else {
              closeSignupDialog();
              dispatch({
                type: "CHANGE_ALERT",
                payload: {
                  alertValue: "sugnup success...",
                },
              });
            }
          })
          .catch((err) => {
            setLoading(false);

            console.log("signup Erro", err.response.data);

            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alertValue: err.response?.data
                  ? err.response?.data?.primary_phone[0]
                  : err.response.data,
                alerType: "signupError",
              },
            });
          });
      }
      //  else if (user_type == 2) {
      //   axios
      //     .post(`${Vendor_Create}`, data)
      //     .then((data) => {
      //       console.log("createdVendorRes", data);
      //       if (type == "SignupPage") {
      //         router.push({
      //           pathname: `/otp/${values.primary_phone}`,
      //         });
      //         setLoading(true);

      //         dispatch({
      //           type: "CHANGE_ALERT",
      //           payload: {
      //             alertValue: "sugnup success...",
      //           },
      //         });
      //       } else {
      //         closeSignupDialog();
      //         dispatch({
      //           type: "CHANGE_ALERT",
      //           payload: {
      //             alertValue: "sugnup success...",
      //           },
      //         });
      //       }
      //     })
      //     .catch((err) => {
      //       setLoading(false);

      //       console.log("signup Erro", err.response.data.primary_phone[0]);

      //       dispatch({
      //         type: "CHANGE_ALERT",
      //         payload: {
      //           alertValue: err.response.data.primary_phone[0],
      //           alerType: "signupError",
      //         },
      //       });
      //     });
      // }
    } else {
      setErrors({
        ...errors,
        // username: userNameExist ? "user name already exist" : "",
        email: emailExist ? "email already exist" : "",
        primary_phone: primaryPhoneExist ? "phone no already exist" : "",
      });
      setLoading(false);
    }
  };
  // facebook
  // const responseFacebook = (response) => {
  //   console.log("responseFacebook", response);
  //   console.log("name", response.name);

  //   const auth_token = response.accessToken;
  //   const token = {
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: localStorage.getItem("jwt_access_token"),
  //     },
  //   };
  //   console.log("authTOKENauthTOKEN", token);
  //   return AuthService.signInWithFacebook(auth_token).then(
  //     (user) => {
  //       console.log("userFacebook", user);

  //       axios
  //         .get(`${Get_Pending_Order_After_Login}`, {
  //           headers: {
  //             "Content-type": "application/json",
  //             Authorization: localStorage.getItem("jwt_access_token"),
  //           },
  //         })
  //         .then((res) => {
  //           console.log("order_Id_res", res);
  //           if (res.data.id) {
  //             localStorage.setItem("OrderId", res.data.id);
  //           } else {
  //             localStorage.removeItem("OrderId");
  //           }
  //         })
  //         .catch(() => localStorage.removeItem("OrderId"));

  //       dispatch({
  //         type: "CHANGE_ALERT",
  //         payload: {
  //           alertValue: "login success...",
  //           alerType: "successLogin",
  //         },
  //       });

  //       // if (user.user_type === "customer") {
  //       //   if (type != "popup") {
  //       //     const backUrl = localStorage.getItem("backAfterLogin");
  //       //     if (backUrl) {
  //       //       localStorage.removeItem("backAfterLogin");
  //       //       router.push(`${backUrl}`);
  //       //     } else {
  //       //       router.push("/profile");
  //       //     }
  //       //   } else {
  //       //     closeLoginDialog();
  //       //     localStorage.removeItem("backAfterLogin");
  //       //   }
  //       // } else if (user.user_type == "vendor") {
  //       //   if (type != "popup") {
  //       //     const backUrl = localStorage.getItem("backAfterLogin");
  //       //     if (backUrl) {
  //       //       localStorage.removeItem("backAfterLogin");
  //       //       router.push(`${backUrl}`);
  //       //     } else {
  //       //       router.push("/vendor/dashboard");
  //       //     }
  //       //   } else {
  //       //     closeLoginDialog();
  //       //     localStorage.removeItem("backAfterLogin");
  //       //   }
  //       // }
  //       if (type != "popup") {
  //         const backUrl = localStorage.getItem("backAfterLogin");
  //         if (backUrl) {
  //           localStorage.removeItem("backAfterLogin");
  //           router.push(`${backUrl}`);
  //         } else {
  //           router.push("/profile");
  //         }
  //       } else {
  //         localStorage.removeItem("backAfterLogin");
  //       }
  //     },
  //     (_errors) => {
  //       console.log("login failed", _errors.response.status);

  //       if (_errors.response.status == 400) {
  //         dispatch({
  //           type: "CHANGE_ALERT",
  //           payload: {
  //             alertValue: "Waiting...",
  //           },
  //         });
  //       }
  //       // else if (_errors.response.status == 401) {
  //       //   dispatch({
  //       //     type: "CHANGE_ALERT",
  //       //     payload: {
  //       //       alertValue: "Email or Password is wrong",
  //       //       alerType: 'loginError',
  //       //     },
  //       //   });
  //       // }
  //       // else {
  //       //   dispatch({
  //       //     type: "CHANGE_ALERT",
  //       //     payload: {
  //       //       alertValue: "",
  //       //       alerType: 'loginError',
  //       //     },
  //       //   });
  //       // }

  //       if (type != "popup") {
  //         router.push("/login");
  //       }
  //     }
  //   );
  // };

  const {
    setErrors,
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

  // const CustomOption = ({ innerProps, isDisabled, data }) => {
  //   console.log(`https://flagcdn.com/w20/${data.code.toLowerCase()}.png`);
  //   return !isDisabled ? (
  //     <div {...innerProps} style={{ cursor: "pointer", width: "180px" }}>
  //       <img
  //         src={`https://flagcdn.com/w20/${data.code.toLowerCase()}.png`}
  //       ></img>
  //       {" " + data.label}
  //     </div>
  //   ) : null;
  // };

  return (
    <>
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
        <img
          style={{
            width: "80px",
            display: "block",
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: "2rem",
          }}
          src="assets/images/logos/footer.png"
          alt="logo"
        />

        <H3 textAlign="center" mb="0.5rem" mt="0.5rem">
          Welcome to CashConnect
        </H3>
        <H5
          fontWeight="600"
          fontSize="0.875rem"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Please fill all forms to create your account
        </H5>

        {/* <div
          className="content"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "0px",
          }}
        >
          <Button
            mb="1.65rem"
            size="large"
            variant={customerVariant}
            color="secondary"
            width="50%"
            onClick={singUpAsCustomer}
          >
            Customer
          </Button>

          <Button
            mb="1.65rem"
            size="large"
            variant={vendorVariant}
            color="secondary"
            width="50%"
            onClick={singUpAsVendor}
          >
            Vendor
          </Button>
        </div> */}

        <form
          className="content"
          style={{ paddingTop: "0px" }}
          onSubmit={handleSubmit}
        >
          <TextField
            mb="0.75rem"
            name="first_name"
            label="First Name"
            placeholder="First Name"
            autoComplete="off"
            fullwidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.first_name || ""}
            errorText={touched.first_name && errors.first_name}
          />

          <TextField
            mb="0.75rem"
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            autoComplete="off"
            fullwidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.last_name || ""}
            errorText={touched.last_name && errors.last_name}
          />

          {/* <TextField
            mb="0.75rem"
            name="username"
            label="User Name"
            fullwidth
            onBlur={handleBlur}
            onChange={(e: any,) => {
              setFieldValue("username", e.target.value.trim());
            }}
            value={values.username || ""}
            errorText={touched.username && errors.username}
          /> */}

          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {/* <CountryCodeSelect
              mb="0.75rem"
              mt="1rem"
              label="Country"
              width="40%"
              placeholder="Select Country"
              getOptionLabelBy="label"
              getOptionValueBy="value"
              options={country_codes}
              components={{ Option: CustomOption }}
              value={values.country_code || null}
              onChange={(value: any) => {
                setFieldValue("country_code", value);
                setFieldValue("primary_phone", `${value.value}`);
              }}
              errorText={touched.country_code && errors.country_code}
            /> */}
            <Grid item md={4}>
              <TextField
                style={{ textAlign: "center" }}
                mb="0.75rem"
                mt="1rem"
                name="country_code"
                // placeholder="Obtional"
                label="Country"
                fullwidth
                endAdornment={
                  <div
                    style={{
                      cursor: "pointer",
                      width: "105px",
                      marginTop: "2px",
                    }}
                  >
                    <img src={`https://flagcdn.com/w20/bd.png`}></img>
                  </div>
                }
                onBlur={handleBlur}
                onChange={handleChange}
                value={`${values.country_code || ""}`}
                errorText={touched.country_code && errors.country_code}
              />
            </Grid>

            <Grid item md={8}>
              <TextField
                mb="0.75rem"
                mt="1rem"
                name="primary_phone"
                // placeholder="Obtional"
                autoComplete="off"
                label="Phone Number"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={`${values.primary_phone || ""}`}
                errorText={touched.primary_phone && errors.primary_phone}
              />
            </Grid>
          </div>

          <TextField
            mb="0.75rem"
            name="password"
            placeholder="*********"
            type={passwordVisibility ? "text" : "password"}
            label="Password"
            fullwidth
            autoComplete="off"
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
            name="re_password"
            placeholder="*********"
            type={passwordVisibility ? "text" : "password"}
            label="Confirm Password"
            fullwidth
            autoComplete="off"
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
            value={values.re_password || ""}
            errorText={touched.re_password && errors.re_password}
          />
          <TextField
            mb="0.75rem"
            name="email"
            placeholder="Email (Optional)"
            label="Email"
            type="email"
            fullwidth
            autoComplete="off"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email || ""}
            errorText={touched.email && errors.email}
          />

          <CheckBox
            mb="1.75rem"
            name="agreement"
            color="secondary"
            checked={values.agreement}
            onChange={handleChange}
            label={
              <FlexBox>
                <SemiSpan>By signing up, I agree to the</SemiSpan>
                <a href="/" target="_blank" rel="noreferrer noopener">
                  <H6
                    ml="0.5rem"
                    borderBottom="1px solid"
                    borderColor="gray.900"
                  >
                    Terms & Condtion
                  </H6>
                </a>
              </FlexBox>
            }
          />

          <Button
            mb="1.65rem"
            variant="contained"
            color="primary"
            style={{ cursor: !values.agreement && "no-drop" }}
            type="submit"
            fullwidth
          >
            Create Account
          </Button>

          <Box mb="1rem">
            <Divider width="200px" mx="auto" />
            <FlexBox justifyContent="center" mt="-14px">
              <Span color="text.muted" bg="body.paper" px="1rem">
                on
              </Span>
            </FlexBox>
          </Box>

          {/* <form style={{ padding: "1rem 3.75rem 0px" }}>
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
          </form> */}

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
            <Small fontWeight="600" >Continue with Facebook</Small>
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
        </form>
        <FlexBox justifyContent="center" bg="gray.200" py="19px">
          <SemiSpan>Already have account?</SemiSpan>
          <H6
            style={{ cursor: "pointer" }}
            onClick={gotologin}
            ml="0.5rem"
            color="primary.main"
            borderBottom="1px solid #e94560"
            borderColor="primary.main"
          >
            Log in
          </H6>
        </FlexBox>
      </StyledSessionCard>
    </>
  );
};

const initialValues = {
  first_name: "",
  last_name: "",
  username: "",
  primary_phone: "",
  email: "",
  password: "",
  re_password: "",
  country_code: "+88",
  // {
  //   code: "BD",
  //   label: "Bangladesh",
  //   value: "+880",
  // }
  agreement: false,
};

const formSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  // username: yup.string().required("user name is required"),
  primary_phone: yup
    .string()
    .min(11, "Please enter your number with 0")
    .max(12, "Invalid phone number")
    .required("Phone number is required"),
  password: yup.string().required("Password is required"),
  // country_code: yup.object().required("requred"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});

export default Signup;
