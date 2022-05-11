import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/FooterLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import  { CountryCodeSelect } from "@component/Select";
import TextField from "@component/text-field/TextField";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  BASE_URL, Customer_By_Id, Customer_Update
} from "@data/constants";
import { country_codes } from "@data/country_code";
import { genders, requred } from "@data/data";
import axios from "axios";
import { useFormik } from "formik";
import checkValidation from "helper/checkValidation";
import jsonToFormData from "helper/jsonToFormData";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { H2 } from "@component/Typography";

type Iimage = any;
type TIMG = any;

const ProfileEditor = ({
}) => {
  const [ setPreviewImage] = useState<Iimage>();
  const [image] = useState<TIMG>("");


  const { user_id, authTOKEN } = useUserInf()

  const { dispatch } = useAppContext()

  const handleFormSubmit = async (values) => {

    const { isValid, emailExist, primaryPhoneExist, SecondaryPhoneExist } = await checkValidation({ email: values.email, primaryPhone: values.primary_phone, secondaryPhone: values.secondary_phone, userId: user_id })

    if (isValid) {
      const data = {
        ...values,
        primary_phone: `${values.primary_phone}`,
        secondary_phone: values.secondary_phone === "+880" ? "" : values.secondary_phone || "",
        image: image,
        gender:
          typeof values.gender != "object"
            ? values?.gender
            : values?.gender?.id,
        role: typeof values.role != "object" ? values?.role : values?.role?.id,
        thana:
          typeof values.thana != "object" ? values?.thana : values?.thana?.id,
        city: typeof values.city != "object" ? values?.city : values?.city?.id,
        country:
          typeof values.country != "object"
            ? values?.country
            : values?.country?.id,
        branch:
          typeof values.branch != "object" ? values?.branch : values?.branch?.id,
        cusotmer_type:
          typeof values.cusotmer_type != "object"
            ? values?.cusotmer_type
            : values?.cusotmer_type?.id,
      };

      const [customerEditData] = jsonToFormData(data);
      console.log(data)
      axios
        .put(`${Customer_Update}${user_id}`, customerEditData, authTOKEN)
        .then((res) => {
          console.log("updatedRes", res.data);

          if (res?.data?.id) {
            router.push("/profile");
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "success",
                alertValue: "update sussess...",
              }
            })
          }
          else {
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "error",
                alertValue: "someting went wrong",
              }
            })
          }
        }).catch(() => {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alerType: "error",
              alertValue: "someting went wrong",
            }
          })
        })
    }
    else {
      setErrors({
        ...errors,
        // username: userNameExist ? "user name already exist" : "",
        email: emailExist ? "email already exist" : "",
        primary_phone: primaryPhoneExist ? "primary phone already exist" : "",
        secondary_phone: SecondaryPhoneExist ? "secondary phone already exist" : "",
      })
    }
  };


  useEffect(() => {
    if (user_id && authTOKEN) {
      axios.get(`${Customer_By_Id}${user_id}`, authTOKEN).then((datas) => {
        console.log("EditDetails", datas.data);
        const { data } = datas;

        console.log("secondary_phone", data?.secondary_phone)

        resetForm({
          values: {
            ...values,
            ...data,
            primary_phone: data?.primary_phone || "+880",
            secondary_phone: data?.secondary_phone || "+880"
          }
        })

        setPreviewImage(`${BASE_URL}${data.image}`);

        for (let key in data) {

          // setFieldValue(`${key}`, _.isNull(data[key]) ? "" : data[key]);
          setFieldValue(`${key}`, data[key]);
        }
        setFieldValue("gender", {
          id: data.gender,
          name: genders.find((gender: any) => gender?.id == data.gender)
            ?.name,
        });
      }).catch((err) => { console.log("error", err) });
    }
  }, [user_id, authTOKEN]);



   
  

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setErrors,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  const CustomOption = ({ innerProps, isDisabled, data }) => {

    return !isDisabled ? (
      <div {...innerProps}
        style={{ cursor: "pointer", width: "180px" }}
      ><img src={`https://flagcdn.com/w20/${data.code.toLowerCase()}.png`}></img>
        {' ' + data.label}
      </div>
    ) : null;
  }


  return (
    <div>
      <DashboardPageHeader
        iconName="tracking"
        title="Order Track"
        button={
          <Link href="/">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Home
            </Button>
          </Link>
        }
      />

      
       

        <form onSubmit={handleSubmit}>
          <Box mb="30px">
            <H2 color="primary.main"  fontWeight="800" mb="15px" style={{textAlign:'center'}}> Track Your Order</H2>
            <Grid container horizontal_spacing={6} vertical_spacing={4}>
              <Grid item lg={12} md={12} xs={12} style={{marginLeft:"auto",marginRight:"auto", width:"60%"}}>
                <TextField
                  name="first_name"
                  label="Order No"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={touched.first_name && errors.first_name}
                />
              </Grid>
              <Grid item lg={12} md={12} xs={12}  style={{marginLeft:"auto",marginRight:"auto", width:"60%"}}>
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={touched.email && errors.email}
                />
              </Grid>

             

             

              <Grid item md={12} xs={12} style={{margin:"auto", width:"60%"}}>

                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <CountryCodeSelect
                    mb="1rem"
                    mt="1rem"
                    label="Country"
                    width="55%"
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
                  />
                  <TextField
                    mt="1rem"
                    mb="1rem"
                    name="primary_phone"
                    label="Primary Phone"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.primary_phone || ""}
                    errorText={touched.primary_phone && errors.primary_phone}
                  />
                </div>
              </Grid>

             

            </Grid>
          </Box>

          <Button style={{margin:"auto", width:"60%"}} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
       
     
    </div>
  );
};


const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  date_of_birth: "",
  primary_phone: "+880",
  secondary_phone: "+880",
  country_code: {
    code: "BD",
    label: "Bangladesh",
    value: "+880"
  },
  country_code_2: {
    code: "BD",
    label: "Bangladesh",
    value: "+880"
  },
};

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required").nullable(requred),
  last_name: yup.string().required("required").nullable(requred),
  email: yup.string().email("invalid email").required("required").nullable(requred),
  date_of_birth: yup.date().required("invalid date").nullable(requred),
  primary_phone: yup.string().required("primary_phone required").nullable(requred),
  // secondary_phone: yup.string().required("secondary_phone required").nullable(requred),
});

ProfileEditor.layout = DashboardLayout;

export default ProfileEditor;
