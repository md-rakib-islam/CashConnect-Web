import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Select from "@component/Select";
import TextField from "@component/text-field/TextField";
import { useAppContext } from "@context/app/AppContext";
import {
  BASE_URL,
  Branch_All,
  City_All,
  Country_All,
  Customer_By_Id,
  Customer_type_All,
  Customer_Update,
  Role_All,
  Thana_All,
} from "@data/constants";
import axios from "axios";
import { Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

const ProfileEditor = () => {
  const [previewImage, setPreviewImage] = useState();

  const { state, dispatch } = useAppContext();
  const { data } = state;

  const handleFormSubmit = async (values) => {
    console.log("Submitted");
    console.log("id", state.auth.user.id);

    const user_id = state.auth.user?.id;
    const data = {
      ...values,
      gender: values?.gender?.value,
      role: values?.role?.id,
      thana: values?.thana?.id,
      city: values?.city?.id,
      country: values?.country?.id,
      branch: values?.branch?.id,
      cusotmer_type: values?.cusotmer_type?.id,
    };

    console.log("dataUpdate", data);

    const authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };
    axios
      .put(`${BASE_URL}${Customer_Update}${user_id}`, data, authTOKEN)
      .then((data) => {
        console.log("updatedRes", data);
      });
    // console.log(data);
  };

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

  useEffect(() => {
    fetch(`${BASE_URL}${Role_All}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_ROLES",
          payload: data.roles,
        });
      });

    fetch(`${BASE_URL}${City_All}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_CITIES",
          payload: data.cities,
        });
      });

    fetch(`${BASE_URL}${Thana_All}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_THANAS",
          payload: data.thanas,
        });
      });

    fetch(`${BASE_URL}${Country_All}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_COUNTRY",
          payload: data.countries,
        });
      });

    fetch(`${BASE_URL}${Branch_All}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_BRANCH",
          payload: data.branches,
        });
      });

    fetch(`${BASE_URL}${Customer_type_All}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_CUSTOMER_TYPE",
          payload: data.customer_types,
        });
      });
  }, []);

  useEffect(() => {
    const authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };

    axios
      .get(`${BASE_URL}${Customer_By_Id}${state.auth.user?.id}`, authTOKEN)
      .then((data) => {
        console.log("EditDetails", data);
      });
  }, [state.auth.user?.id]);

  console.log("render edit profile");

  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="Edit Profile"
        button={
          <Link href="/profile">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Profile
            </Button>
          </Link>
        }
      />

      <Card1>
        <FlexBox alignItems="flex-end" mb="22px">
          <Avatar
            src={previewImage || "/assets/images/faces/ralph.png"}
            size={64}
          />

          <Box ml="-20px" zIndex={1}>
            <label htmlFor="profile-image">
              <Button
                as="span"
                size="small"
                bg="gray.300"
                color="secondary"
                height="auto"
                p="6px"
                borderRadius="50%"
              >
                <Icon>camera</Icon>
              </Button>
            </label>
          </Box>
          <Hidden>
            <input
              className="hidden"
              onChange={async (e) => {
                const reader: any = new FileReader();
                reader.onload = () => {
                  if (reader.readyState === 2) {
                    setPreviewImage(reader.result);
                  }
                };
                reader.readAsDataURL(e.target.files[0]);

                const file = e.target.files[0];
                // onChange(file);
              }}
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Hidden>
        </FlexBox>

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="first_name"
                      label="First Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name || ""}
                      errorText={touched.first_name && errors.first_name}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="last_name"
                      label="Last Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name || ""}
                      errorText={touched.last_name && errors.last_name}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="username"
                      label="User Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username || ""}
                      errorText={touched.username && errors.nusernameame}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email || ""}
                      errorText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="password"
                      label="Password"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password || ""}
                      errorText={touched.password && errors.password}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="confirmPassword"
                      label="Confirm Password"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword || ""}
                      errorText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Select
                      mb="1rem"
                      label="Gender"
                      placeholder="Select Gender"
                      options={genders}
                      getOptionLabelBy="label"
                      getOptionValueBy="value"
                      value={values.gender || ""}
                      onChange={(gender) => {
                        setFieldValue("gender", gender);
                      }}
                      errorText={touched.gender && errors.gender}
                    />

                    {/* <TextField
                      name="gender"
                      label="Gender"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.shipping_country || ""}
                      errorText={touched.gender && errors.gender}
                    /> */}
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="birth_date"
                      label="Birth Date"
                      type="date"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.birth_date || ""}
                      errorText={touched.birth_date && errors.birth_date}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="primary_phone"
                      label="Primary Phone"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.primary_phone || ""}
                      errorText={touched.primary_phone && errors.primary_phone}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="secondary_phone"
                      label="Secondary Phone"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.secondary_phone || ""}
                      errorText={
                        touched.secondary_phone && errors.secondary_phone
                      }
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="street_address_one"
                      label="Street Address One"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.street_address_one || ""}
                      errorText={
                        touched.street_address_one && errors.street_address_one
                      }
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="street_address_two"
                      label="Street Address Two"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.street_address_two || ""}
                      errorText={
                        touched.street_address_two && errors.street_address_two
                      }
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Select
                      mb="1rem"
                      label="Role"
                      placeholder="Select Role"
                      options={data?.roles}
                      value={values.role || ""}
                      onChange={(role) => {
                        setFieldValue("role", role);
                      }}
                      errorText={touched.role && errors.role}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Select
                      mb="1rem"
                      label="Thana"
                      placeholder="Select Thana"
                      options={data.thanas}
                      value={values.thana || ""}
                      onChange={(thana) => {
                        setFieldValue("thana", thana);
                      }}
                      errorText={touched.thana && errors.thana}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Select
                      mb="1rem"
                      label="city"
                      placeholder="Select city"
                      options={data.cities}
                      value={values.city || ""}
                      onChange={(city) => {
                        setFieldValue("city", city);
                      }}
                      errorText={touched.city && errors.city}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Select
                      mb="1rem"
                      label="country"
                      placeholder="Select country"
                      options={data.country}
                      value={values.country || ""}
                      onChange={(country) => {
                        setFieldValue("country", country);
                      }}
                      errorText={touched.country && errors.country}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="postal_code"
                      label="Postal Code"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.postal_code || ""}
                      errorText={touched.postal_code && errors.postal_code}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="nid"
                      label="NID"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.nid || ""}
                      errorText={touched.nid && errors.nid}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Select
                      mb="1rem"
                      label="Branch"
                      placeholder="Select Branch"
                      options={data.branch}
                      value={values.branch || ""}
                      onChange={(branch) => {
                        setFieldValue("branch", branch);
                      }}
                      errorText={touched.branch && errors.branch}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Select
                      mb="1rem"
                      label="Cusotmer_type"
                      placeholder="Select Cusotmer_type"
                      options={data.customer_type}
                      value={values.cusotmer_type || ""}
                      onChange={(cusotmer_type) => {
                        setFieldValue("cusotmer_type", cusotmer_type);
                      }}
                      errorText={touched.cusotmer_type && errors.cusotmer_type}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      type="number"
                      name="customer_credit_limit"
                      label="Customer Credit Limit"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.customer_credit_limit || ""}
                      errorText={
                        touched.customer_credit_limit &&
                        errors.customer_credit_limit
                      }
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  );
};

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  birth_date: "",
};

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  birth_date: yup.date().required("invalid date"),
});

ProfileEditor.layout = DashboardLayout;

export default ProfileEditor;
