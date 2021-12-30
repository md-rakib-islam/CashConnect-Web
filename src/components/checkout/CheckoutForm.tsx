import LoginPopup from "@component/LoginPopup";
import useUserInf from "@customHook/useUserInf";
import {
  City_All,
  Country_All,
  Customer_Order_Shipping_Address, Shipping_Adress_By_Order_Id,
  Thana_All
} from "@data/constants";
import { requred } from "@data/data";
import axios from "axios";
import { useFormik } from "formik";
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

  // const [_shippingId, setShippingId] = useState(0);
  const [thanas, setThanas] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [openLogin, setOpenLogin] = useState(false)

  const { user_id, authTOKEN, order_Id, isLogin } = useUserInf()

  const closeLoginTab = () => {
    setOpenLogin(false)
  }

  const handleFormSubmit = async (values) => {
    if (isLogin) {
      if (!sameAsProfile) {
        console.log(values);

        const shippingData = {
          ...values,
          user_id,
          thana_id:
            typeof values.thana_id != "object"
              ? values?.thana_id
              : values?.thana_id?.id,
          city_id:
            typeof values.city_id != "object"
              ? values?.city_id
              : values?.city_id?.id,
          country_id:
            typeof values.country_id != "object"
              ? values?.country_id
              : values?.country_id?.id,
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
          })
          .catch((err) => { console.log("error", err) })
      }
      // else if (shippingId) {
      //   const authTOKEN = {
      //     headers: {
      //       "Content-type": "application/json",
      //       Authorization: localStorage.getItem("jwt_access_token"),
      //     },
      //   };
      //   axios
      //     .delete(`${Shipping_Address_Delete}${shippingId}`, authTOKEN)
      //     .then((res) => {
      //       console.log("shppingDeleteRes", res);
      //       router.push("/payment");
      //     }).catch((err) => {console.log("error", err)})
      // } 
      else {
        axios
          .post(
            `${Customer_Order_Shipping_Address}${order_Id}`,
            { user_id, same_as_profile: true },
            authTOKEN
          ).then(res => {
            console.log("shippingRes", res)
            router.push("/payment");
          })
      }
    } else {
      setOpenLogin(true)
    }

  };

  const handleCheckboxChange =
    (setFieldValue) =>
      ({ target: { checked } }) => {
        setSameAsProfile(checked);
        setFieldValue("same_as_profile_address", checked);
      };

  useEffect(() => {
    if (order_Id) {
      axios.get(`${Shipping_Adress_By_Order_Id}${order_Id}`).then((res) => {
        console.log("shippingDetailsRes", res);
        const { data } = res;
        // setShippingId(data.id);
        for (let key in data) {
          if (key == "country") {
            setFieldValue(`country_id`, data[key]);
          } else if (key == "city") {
            setFieldValue(`city_id`, data[key]);
          } else if (key == "thana") {
            setFieldValue(`thana_id`, data[key]);
          } else {
            setFieldValue(`${key}`, data[key]);
          }
        }
      }).catch((err) => { console.log("error", err) })
    }

    fetch(`${City_All}`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data.cities);
      }).catch((err) => { console.log("error", err) });

    fetch(`${Thana_All}`)
      .then((res) => res.json())
      .then((data) => {
        setThanas(data.thanas);
      }).catch((err) => { console.log("error", err) });

    fetch(`${Country_All}`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries);
      }).catch((err) => { console.log("error", err) });
  }, []);

  if (sameAsProfile) {
    var checkoutSchema: any = yup.object().shape({});
  } else {
    var checkoutSchema: any = yup.object().shape({
      company: yup.string().required("company is required").nullable(requred),
      name: yup.string().required("name is required").nullable(requred),
      email: yup.string().required("email is required").nullable(requred),
      phone: yup.string().required("phone is required").nullable(requred),
      zip_code: yup.string().required("zip_code is required").nullable(requred),
      country_id: yup.string().required("country is required").nullable(requred),
      city_id: yup.string().required("city is required").nullable(requred),
      thana_id: yup.string().required("thana is required").nullable(requred),
      street_address: yup.string().required("address is required").nullable(requred),
    });
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />
      <form onSubmit={handleSubmit}>
        <Card1 mb="2rem">
          <Typography fontWeight="600" mb="1rem">
            Shipping Address
          </Typography>

          <CheckBox
            label="Same as profile address"
            color="secondary"
            mb={sameAsProfile ? "" : "1rem"}
            onChange={handleCheckboxChange(setFieldValue)}
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
                  placeholder="Select Country"
                  options={countries}
                  value={values.country_id || ""}
                  onChange={(country_id: any) => {
                    setFieldValue("country_id", country_id?.id);
                  }}
                  errorText={touched.country_id && errors.country_id}
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
                  placeholder="Select City"
                  options={cities}
                  value={values.city_id || ""}
                  onChange={(city_id: any) => {
                    setFieldValue("city_id", city_id?.id);
                  }}
                  errorText={touched.city_id && errors.city_id}
                />
                <Select
                  mb="1rem"
                  label="Thana"
                  placeholder="Select Thana"
                  options={thanas}
                  value={values.thana_id || ""}
                  onChange={(thana_id: any) => {
                    setFieldValue("thana_id", thana_id?.id);
                  }}
                  errorText={touched.thana_id && errors.thana_id}
                />
              </Grid>
            </Grid>
          )}
        </Card1>

        <Grid container spacing={7}>
          <Grid item sm={6} xs={12}>
            <Link href="/cart">
              <Button variant="outlined" color="primary" type="button" fullwidth>
                Back to Cart
              </Button>
            </Link>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Button variant="contained" color="primary" type="submit" fullwidth>
              Proceed to Payment
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  zip_code: "",
  country_id: "",
  city_id: "",
  thana_id: "",
  street_address: "",
};

export default CheckoutForm;
