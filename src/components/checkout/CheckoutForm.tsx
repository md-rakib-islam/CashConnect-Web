import LoginPopup from "@component/LoginPopup";
import useUserInf from "@customHook/useUserInf";
import {
  City_All_BY_COUNTRY_ID,
  Country_All,
  Customer_By_Id,
  Customer_Order_Blling_Address,
  Customer_Order_Shipping_Address,
  Shipping_Adress_By_Order_Id,
  Thana_All_BY_CITY_ID,
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
  const [sameAsBillingAddress, setSameAsBillingAddress] = useState(false);
  const router = useRouter();

  // const [_shippingId, setShippingId] = useState(0);
  const [thanas, setThanas] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const { user_id, authTOKEN, order_Id, isLogin } = useUserInf();

  const closeLoginTab = () => {
    setOpenLogin(false);
  };

  const handleFormSubmit = async (values) => {
    if (isLogin) {
      if (!sameAsBillingAddress) {
        console.log("values", values);

        const billingData = {
          user: user_id,
          order: order_Id,
          name: values.name,
          email: values.email,
          phone: values.phone,
          street_address: values.street_address,
          zip_code: values.zip_code,
          thana:
            typeof values.thana != "object" ? values?.thana : values?.thana?.id,
          city:
            typeof values.city != "object" ? values?.city : values?.city?.id,
          country:
            typeof values.country != "object"
              ? values?.country
              : values?.country?.id,
        };
        const shippingData = {
          user: user_id,
          order: order_Id,
          name: values.name_shipping,
          email: values.email_shipping,
          phone: values.phone_shipping,
          street_address: values.street_address_shipping,
          zip_code: values.zip_code_shipping,
          thana:
            typeof values.thana_shipping != "object"
              ? values?.thana_shipping
              : values?.thana_shipping?.id,
          city:
            typeof values.city_shipping != "object"
              ? values?.city_shipping
              : values?.city_shipping?.id,
          country:
            typeof values.country_shipping != "object"
              ? values?.country_shipping
              : values?.country_shipping?.id,
        };
        console.log("shippingData", shippingData);
        console.log("billingData", billingData);
        axios
          .post(`${Customer_Order_Blling_Address}`, billingData, authTOKEN)
          .then((res) => {
            console.log("shipingRes", res);
            router.push("/payment");
          })
          .catch((err) => {
            console.log("error", err);
          });
        axios
          .post(`${Customer_Order_Shipping_Address}`, shippingData, authTOKEN)
          .then((res) => {
            console.log("shipingRes", res);
            router.push("/payment");
          })
          .catch((err) => {
            console.log("error", err);
          });
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
        const billingData = {
          same_as_billing: true,
          user: user_id,
          order: order_Id,
          name: values.name,
          email: values.email,
          phone: values.phone,
          street_address: values.street_address,
          zip_code: values.zip_code,
          thana:
            typeof values.thana != "object" ? values?.thana : values?.thana?.id,
          city:
            typeof values.city != "object" ? values?.city : values?.city?.id,
          country:
            typeof values.country != "object"
              ? values?.country
              : values?.country?.id,
        };
        axios
          .post(`${Customer_Order_Blling_Address}`, billingData, authTOKEN)
          .then((res) => {
            console.log("shippingRes", res);
            router.push("/payment");
          });
      }
    } else {
      router.push("/login").then(() => window.location.reload());
    }
  };

  const handleCheckboxChange =
    (setFieldValue) =>
    ({ target: { checked } }) => {
      setSameAsBillingAddress(checked);
      setFieldValue("same_as_billing_address", checked);
    };

  useEffect(() => {
    if (user_id) {
      axios
        .get(`${Customer_By_Id}${user_id}`, authTOKEN)
        .then((user) => {
          const { data } = user;
          console.log("userData", data);
          setFieldValue("name", `${data.first_name} ${data.last_name}`);
          setFieldValue("email", `${data.email}`);
          setFieldValue("phone", `${data.primary_phone}`);
          setFieldValue(
            "name_shipping",
            `${data.first_name} ${data.last_name}`
          );
          setFieldValue("email_shipping", `${data.email}`);
          setFieldValue("phone_shipping", `${data.primary_phone}`);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [user_id]);

  const handleCity = (country) => {
    fetch(`${City_All_BY_COUNTRY_ID}${country.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("cityData", data);
        setCities(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const handleThana = (city) => {
    fetch(`${Thana_All_BY_CITY_ID}${city.id}`)
      .then((res) => res.json())
      .then((data) => {
        setThanas(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    if (order_Id) {
      axios
        .get(`${Shipping_Adress_By_Order_Id}${order_Id}`)
        .then((res) => {
          console.log("shippingDetailsRes", res);
          const { data } = res;
          // setShippingId(data.id);
          for (let key in data) {
            if (key == "country") {
              setFieldValue(`country`, data[key]);
            } else if (key == "city") {
              setFieldValue(`city`, data[key]);
            } else if (key == "thana") {
              setFieldValue(`thana`, data[key]);
            } else {
              setFieldValue(`${key}`, data[key]);
            }
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }

    fetch(`${Country_All}`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  if (sameAsBillingAddress) {
    var checkoutSchema: any = yup.object().shape({
      name: yup.string().required("name is required").nullable(requred),
      email: yup.string().required("email is required").nullable(requred),
      phone: yup.string().required("phone is required").nullable(requred),
      zip_code: yup.string().required("zip_code is required").nullable(requred),
      country: yup.string().required("country is required").nullable(requred),
      city: yup.string().required("city is required").nullable(requred),
      thana: yup.string().required("thana is required").nullable(requred),
      street_address: yup
        .string()
        .required("address is required")
        .nullable(requred),
    });
  } else {
    var checkoutSchema: any = yup.object().shape({
      // company: yup.string().required("company is required").nullable(requred),
      name: yup.string().required("name is required").nullable(requred),
      email: yup.string().required("email is required").nullable(requred),
      phone: yup.string().required("phone is required").nullable(requred),
      zip_code: yup.string().required("zip_code is required").nullable(requred),
      country: yup.string().required("country is required").nullable(requred),
      city: yup.string().required("city is required").nullable(requred),
      thana: yup.string().required("thana is required").nullable(requred),
      street_address: yup
        .string()
        .required("address is required")
        .nullable(requred),
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
          <div>
            <Typography fontWeight="600" mb="1rem">
              Billing Address
            </Typography>
          </div>

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
                label="City"
                placeholder="Select City"
                options={cities}
                value={values.city || ""}
                onChange={(city: any) => {
                  setFieldValue("city", city?.id);
                  setFieldValue("thana", "");
                  handleThana(city);
                }}
                errorText={touched.city && errors.city}
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
              {/* <TextField
                  name="company"
                  label="Company"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.company || ""}
                  errorText={touched.company && errors.company}
                /> */}
              <Select
                mb="1rem"
                label="Country"
                placeholder="Select Country"
                options={countries}
                value={values.country || ""}
                onChange={(country: any) => {
                  setFieldValue("country", country?.id);
                  setFieldValue("city", "");
                  setFieldValue("thana", "");
                  handleCity(country);
                }}
                errorText={touched.country && errors.country}
              />

              <Select
                mb="1rem"
                label="Thana"
                placeholder="Select Thana"
                options={thanas}
                value={values.thana || ""}
                onChange={(thana: any) => {
                  setFieldValue("thana", thana?.id);
                }}
                errorText={touched.thana && errors.thana}
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
          </Grid>

          <div>
            <CheckBox
              label="Same as Billing Address"
              color="primary"
              m={sameAsBillingAddress ? "0.5rem" : "0.5rem"}
              onChange={handleCheckboxChange(setFieldValue)}
            />
          </div>
        </Card1>
        {!sameAsBillingAddress && (
          <Card1 mb="2rem">
            <div>
              <Typography fontWeight="600" mb="1rem">
                Shipping Address
              </Typography>
            </div>
            <Grid container spacing={7}>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="name_shipping"
                  label="Full Name"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name_shipping || ""}
                  errorText={touched.name_shipping && errors.name_shipping}
                />
                <TextField
                  name="phone_shipping"
                  label="Phone Number"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone_shipping || ""}
                  errorText={touched.phone_shipping && errors.phone_shipping}
                />
                <Select
                  mb="1rem"
                  label="City"
                  placeholder="Select City"
                  options={cities}
                  value={values.city_shipping || ""}
                  onChange={(city: any) => {
                    setFieldValue("city_shipping", city?.id);
                    setFieldValue("thana_shipping", "");
                    handleThana(city);
                  }}
                  errorText={touched.city_shipping && errors.city_shipping}
                />
                <TextField
                  name="zip_code_shipping"
                  label="Zip Code"
                  type="number"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.zip_code_shipping || ""}
                  errorText={
                    touched.zip_code_shipping && errors.zip_code_shipping
                  }
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="email_shipping"
                  label="Email Address"
                  type="email"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email_shipping || ""}
                  errorText={touched.email_shipping && errors.email_shipping}
                />
                {/* <TextField
                  name="company"
                  label="Company"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.company || ""}
                  errorText={touched.company && errors.company}
                /> */}
                <Select
                  mb="1rem"
                  label="Country"
                  placeholder="Select Country"
                  options={countries}
                  value={values.country_shipping || ""}
                  onChange={(country: any) => {
                    setFieldValue("country_shipping", country?.id);
                    setFieldValue("city_shipping", "");
                    setFieldValue("thana_shipping", "");
                    handleCity(country);
                  }}
                  errorText={
                    touched.country_shipping && errors.country_shipping
                  }
                />

                <Select
                  mb="1rem"
                  label="Thana"
                  placeholder="Select Thana"
                  options={thanas}
                  value={values.thana_shipping || ""}
                  onChange={(thana: any) => {
                    setFieldValue("thana_shipping", thana?.id);
                  }}
                  errorText={touched.thana_shipping && errors.thana_shipping}
                />
                <TextField
                  name="street_address_shipping"
                  label="Address"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.street_address_shipping || ""}
                  errorText={
                    touched.street_address_shipping &&
                    errors.street_address_shipping
                  }
                />
              </Grid>
            </Grid>
          </Card1>
        )}

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
  // company: "",
  zip_code: "",
  country: "",
  city: "",
  thana: "",
  street_address: "",
};

export default CheckoutForm;
