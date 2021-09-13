import {
  City_All,
  Country_All,
  Customer_Order_Shipping_Address,
  Thana_All,
} from "@data/constants";
import axios from "axios";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import CheckBox from "../CheckBox";
import Grid from "../grid/Grid";
import Select from "../Select";
import TextField from "../text-field/TextField";
import Typography from "../Typography";

const CheckoutForm = () => {
  const [sameAsProfile, setSameAsProfile] = useState(false);
  const router = useRouter();

  const [thanas, setThanas] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  const order_Id = localStorage.getItem("OrderId");
  const user_id = localStorage?.getItem("UserId");
  const authTOKEN = {
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("jwt_access_token"),
    },
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    const shippingData = {
      ...values,
      user_id,
      thana:
        typeof values.thana != "object" ? values?.thana : values?.thana?.id,
      city: typeof values.city != "object" ? values?.city : values?.city?.id,
      country:
        typeof values.country != "object"
          ? values?.country
          : values?.country?.id,
    };
    console.log("shippingData", shippingData);
    axios
      .post(
        `${Customer_Order_Shipping_Address}${order_Id}`,
        shippingData,
        authTOKEN
      )
      .then((res) => {
        console.log("shipingRes", res);
        router.push("/payment");
      });
  };

  const handleCheckboxChange =
    (values: typeof initialValues, setFieldValue) =>
    ({ target: { checked } }) => {
      setSameAsProfile(checked);
      setFieldValue("same_as_profile_address", checked);
      setFieldValue("name", checked ? values.name : "");
    };

  useEffect(() => {
    fetch(`${City_All}`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data.cities);
      });

    fetch(`${Thana_All}`)
      .then((res) => res.json())
      .then((data) => {
        setThanas(data.thanas);
      });

    fetch(`${Country_All}`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries);
      });
  }, []);

  return (
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
          {/* <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Shipping Address
            </Typography>

            <Grid container spacing={7}>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="shipping_name"
                  label="Full Name"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_name || ""}
                  errorText={touched.shipping_name && errors.shipping_name}
                />
                <TextField
                  name="shipping_contact"
                  label="Phone Number"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_contact || ""}
                  errorText={
                    touched.shipping_contact && errors.shipping_contact
                  }
                />
                <TextField
                  name="shipping_zip"
                  label="Zip Code"
                  type="number"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_zip || ""}
                  errorText={touched.shipping_zip && errors.shipping_zip}
                />
                <TextField
                  name="shipping_address1"
                  label="Address 1"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_address1 || ""}
                  errorText={
                    touched.shipping_address1 && errors.shipping_address1
                  }
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="shipping_email"
                  label="Email Address"
                  type="email"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_email || ""}
                  errorText={touched.shipping_email && errors.shipping_email}
                />
                <TextField
                  name="shipping_company"
                  label="Company"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_company || ""}
                  errorText={
                    touched.shipping_company && errors.shipping_company
                  }
                />
                <Select
                  mb="1rem"
                  label="Country"
                  options={countryList}
                  value={values.shipping_country || "US"}
                  onChange={(country) => {
                    setFieldValue("shipping_country", country);
                  }}
                  errorText={
                    touched.shipping_country && errors.shipping_country
                  }
                />
                <TextField
                  name="shipping_address2"
                  label="Address 2"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_address2 || ""}
                  errorText={
                    touched.shipping_address2 && errors.shipping_address2
                  }
                />
              </Grid>
            </Grid>
          </Card1> */}

          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Shipping Address
            </Typography>

            <CheckBox
              label="Same as profile address"
              color="secondary"
              mb={sameAsProfile ? "" : "1rem"}
              onChange={handleCheckboxChange(values, setFieldValue)}
            />

            {!sameAsProfile && (
              <Grid container spacing={7}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="name"
                    label="Full Name"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                  <TextField
                    name="phone"
                    label="Phone Number"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone || ""}
                    errorText={touched.phone && errors.phone}
                  />
                  <Select
                    mb="1rem"
                    label="Country"
                    options={countries}
                    value={values.country || ""}
                    onChange={(country) => {
                      setFieldValue("country", country);
                    }}
                    errorText={touched.country && errors.country}
                  />
                  <TextField
                    name="zip_code"
                    label="Zip Code"
                    type="number"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.zip_code || ""}
                    errorText={touched.zip_code && errors.zip_code}
                  />
                  <TextField
                    name="street_address"
                    label="Address"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.street_address || ""}
                    errorText={touched.street_address && errors.street_address}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="email"
                    label="Email Address"
                    type="email"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email || ""}
                    errorText={touched.email && errors.email}
                  />
                  <TextField
                    name="company"
                    label="Company"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.company || ""}
                    errorText={touched.company && errors.company}
                  />
                  <Select
                    mb="1rem"
                    label="City"
                    options={cities}
                    value={values.city || ""}
                    onChange={(city) => {
                      setFieldValue("city", city);
                    }}
                    errorText={touched.city && errors.city}
                  />
                  <Select
                    mb="1rem"
                    label="Thana"
                    options={thanas}
                    value={values.thana || ""}
                    onChange={(thana) => {
                      setFieldValue("thana", thana);
                    }}
                    errorText={touched.thana && errors.thana}
                  />
                </Grid>
              </Grid>
            )}
          </Card1>

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart">
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  fullwidth
                >
                  Back to Cart
                </Button>
              </Link>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullwidth
              >
                Proceed to Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  // shipping_name: "",
  // shipping_email: "",
  // shipping_contact: "",
  // shipping_company: "",
  // shipping_zip: "",
  // shipping_country: "",
  // shipping_address1: "",
  // shipping_address2: "",

  name: "",
  email: "",
  phone: "",
  company: "",
  zip_code: "",
  country: "",
  street_address: "",
};

const checkoutSchema = yup.object().shape({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // name: yup.string().required("required"),
  // email: yup.string().required("required"),
  // phone: yup.string().required("required"),
  // zip_code: yup.string().required("required"),
  // country: yup.string().required("required"),
  // address: yup.string().required("required"),
});

export default CheckoutForm;
