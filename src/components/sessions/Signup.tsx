import LoginPopup from "@component/LoginPopup";
import Select from "@component/Select";
import { Customer_Create, Vendor_Create } from "@data/constants";
import { country_codes } from "@data/country_code";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import CheckBox from "../CheckBox";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

interface SignupProps {
  type?: string,
  closeSignupDialog?: any,
}

const Signup: React.FC<SignupProps> = ({ type = "SignupPage", closeSignupDialog }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [customerVariant, setCustomerVariant] = useState("contained");
  const [vendorVariant, setvendorVariant] = useState("outlined");
  const [user_type, setUser_type] = useState(3);
  const [openLogin, setOpenLogin] = useState(false)

  const router = useRouter();

  const closeLoginTab = () => {
    setOpenLogin(false)
  }

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
    const data = {
      ...values,
      number: `${values.country_code.value}${values.number}`,
      user_type,
    };

    if (user_type == 3) {
      axios.post(`${Customer_Create}`, data).then((data) => {
        console.log("createdCustomerRes", data);
        if (type == "SignupPage") {
          router.push("/login");
        } else {
          closeSignupDialog()
        }
      });
    }

    else if (user_type == 2) {
      axios.post(`${Vendor_Create}`, data).then((data) => {
        console.log("createdVendorRes", data);
        if (type == "SignupPage") {
          router.push("/login");
        } else {
          closeSignupDialog()
        }
      }).catch(() => { });
    }


    console.log("saveData", data);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <>
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />

      <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
        <H3 textAlign="center" mb="0.5rem">
          Create Your Account
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Please fill all forms to continued
        </H5>

        <div
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
        </div>

        <form
          className="content"
          style={{ paddingTop: "0px" }}
          onSubmit={handleSubmit}
        >
          <TextField
            mb="0.75rem"
            name="first_name"
            label="First Name"
            placeholder="Ralph Adwards"
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
            placeholder="Ralph Adwards"
            fullwidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.last_name || ""}
            errorText={touched.last_name && errors.last_name}
          />

          <TextField
            mb="0.75rem"
            name="email"
            placeholder="exmple@mail.com"
            label="Email"
            type="email"
            fullwidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email || ""}
            errorText={touched.email && errors.email}
          />

          <div style={{ display: "flex" }}>
            <Select
              mb="1rem"
              mt="1rem"
              label="Country"
              width="40%"
              placeholder="Select Country"
              getOptionLabelBy="label"
              getOptionValueBy="value"
              options={country_codes}
              value={values.country_code || null}
              onChange={(value) => {
                setFieldValue("country_code", value);
              }}
              errorText={touched.country_code && errors.country_code}
            />
            <button style={{
              marginRight: "-2px",
              background: "inherit",
              border: "1px solid #dbdbdb",
              height: "40px",
              marginTop: "43px",
              width: "fit-content",
              padding: "5px"
            }}
            >{values.country_code.value}</button>
            <TextField
              mb="0.75rem"
              mt="1rem"
              name="number"
              placeholder="Obtional"
              label="Phone Number"
              fullwidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={`${values.number || ""}`}
              errorText={touched.number && errors.number}
            />
          </div>

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
            name="re_password"
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
            value={values.re_password || ""}
            errorText={touched.re_password && errors.re_password}
          />

          <CheckBox
            mb="1.75rem"
            name="agreement"
            color="secondary"
            checked={values.agreement}
            onChange={handleChange}
            label={
              <FlexBox>
                <SemiSpan>By signing up, you agree to</SemiSpan>
                <a href="/" target="_blank" rel="noreferrer noopener">
                  <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
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

          <FlexBox
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
          </FlexBox>
        </form>
        <FlexBox justifyContent="center" bg="gray.200" py="19px">
          <SemiSpan>Already have account?</SemiSpan>
          <H6 style={{ cursor: "pointer" }} onClick={gotologin} ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
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
  email: "",
  password: "",
  re_password: "",
  country_code: {
    code: "BD",
    label: "Bangladesh",
    value: "+880"
  },
  agreement: false,
};

const formSchema = yup.object().shape({
  first_name: yup.string().required("${path} is required"),
  last_name: yup.string().required("${path} is required"),
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
  country_code: yup.object().required("requred"),
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

