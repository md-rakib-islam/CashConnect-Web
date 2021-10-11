import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import Select from "@component/Select";
import TextField from "@component/text-field/TextField";
import { useAppContext } from "@context/app/AppContext";
import useJsonToFormData from "@customHook/useJsonToFormData";
import useUserInf from "@customHook/useUserInf";
import {
  BASE_URL,
  Branch_All,
  City_All,
  Country_All, Role_All,
  Thana_All,
  Vendor_By_Id,
  Vendor_Update
} from "@data/constants";
import { country_codes } from "@data/country_code";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

type Timage = any;
type TIMG = any;

const AccountSettings = () => {
  const [previewImage, setPreviewImage] = useState<Timage>();
  const [image, setImage] = useState<TIMG>("");
  const [roles, setRoles] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [branches, setBranches] = useState([]);

  const [updated, setUpdated] = useState(0)

  const { dispatch } = useAppContext()

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

  const { user_id, authTOKEN } = useUserInf()

  useEffect(() => {
    fetch(`${Role_All}`)
      .then((res) => res.json())
      .then((data) => {
        setRoles(data.roles);
      }).catch(() => { });

    fetch(`${City_All}`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data.cities);
      }).catch(() => { });

    fetch(`${Thana_All}`)
      .then((res) => res.json())
      .then((data) => {
        setThanas(data.thanas);
      }).catch(() => { });

    fetch(`${Country_All}`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries);
      }).catch(() => { });

    fetch(`${Branch_All}`)
      .then((res) => res.json())
      .then((data) => {
        setBranches(data.branches);
      }).catch(() => { });
  }, []);


  useEffect(() => {
    axios.get(`${Vendor_By_Id}${user_id}`, authTOKEN).then((datas) => {
      console.log("VendorEditDetails", datas.data);
      const { data } = datas;

      setPreviewImage(`${BASE_URL}${data.image}`);

      for (let key in data) {

        setFieldValue(`${key}`, data[key]);
      }

      setFieldValue("gender", {
        value: data.gender,
        label: genders.find((gender: any) => gender?.value == data.gender)
          ?.label,
      });
    }).catch(() => { });
  }, [user_id, updated]);

  const handleFormSubmit = async (values) => {
    // const user_id = state.auth.user?.id;
    const data = {
      ...values,
      primary_phone: `${values.primary_phone}`,
      secondary_phone: `${values.secondary_phone}`,
      image: image,
      gender:
        typeof values.gender != "object"
          ? values?.gender
          : values?.gender?.value,
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
    };

    const [vendorEditData] = useJsonToFormData(data);

    console.log("data", data)

    axios
      .put(`${Vendor_Update}${user_id}`, vendorEditData, authTOKEN)
      .then((data) => {
        console.log("VenderUpdatedRes", data);

        dispatch({
          type: "CHANGE_ALERT",
          payload: {
            alerType: "success",
            alertValue: "update sussess...",
            alertShow: true,
            alertChanged: Math.random()
          }
        })

        setUpdated(Math.random())

      }).catch(() => {
        dispatch({
          type: "CHANGE_ALERT",
          payload: {
            alerType: "error",
            alertValue: "someting went wrong",
            alertShow: true,
            alertChanged: Math.random()
          }
        })
      });
  };

  const {
    values,
    errors,
    touched,
    // dirty,
    // isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: accountSchema,
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
      <DashboardPageHeader title="Account" iconName="settings_filled" />

      <Card1 p="24px 30px">
        <Box
          borderRadius="10px"
          overflow="hidden"
          height="173px"
          mb="1.5rem"
          position="relative"
          style={{
            background:
              "url(/assets/images/banners/banner-10.png) center/cover",
          }}
        >
          <Box
            display="flex"
            alignItems="flex-end"
            position="absolute"
            bottom="20px"
            left="24px"
          >
            <Avatar
              src={previewImage}
              size={80}
              border="4px solid"
              borderColor="gray.100"
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
                  setImage(file);
                  // onChange(file);
                }}
                id="profile-image"
                accept="image/*"
                type="file"
              />
            </Hidden>
          </Box>

          <Box
            display="flex"
            alignItems="flex-end"
            position="absolute"
            top="20px"
            right="24px"
          >
            <label htmlFor="cover-image">
              <Button
                as="span"
                size="small"
                bg="primary.light"
                color="secondary"
                height="auto"
                p="6px"
                borderRadius="50%"
              >
                <Icon color="primary">camera</Icon>
              </Button>
            </label>
            <Hidden>
              <input
                className="hidden"
                onChange={(e) => console.log(e.target.files)}
                id="cover-image"
                accept="image/*"
                type="file"
              />
            </Hidden>
          </Box>
        </Box>

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
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  name="date_of_birth"
                  label="Birth Date"
                  type="date"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.date_of_birth || ""}
                  errorText={touched.date_of_birth && errors.date_of_birth}
                />
              </Grid>

              <Grid item md={6} xs={12}>

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
                    components={{ Option: CustomOption }}
                    value={values.country_code || null}
                    onChange={(value) => {
                      setFieldValue("country_code", value);
                      setFieldValue("primary_phone", `${value.value}`);
                    }}
                    errorText={touched.country_code && errors.country_code}
                  />
                  <TextField
                    mt="1rem"
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

              <Grid item md={6} xs={12}>

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
                    components={{ Option: CustomOption }}
                    value={values.country_code_2 || null}
                    onChange={(value) => {
                      setFieldValue("country_code_2", value);
                      setFieldValue("secondary_phone", `${value.value}`);
                    }}
                    errorText={touched.country_code_2 && errors.country_code_2}
                  />
                  <TextField
                    mt="1rem"
                    name="secondary_phone"
                    label="Secondary Phone"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.secondary_phone || ""}
                    errorText={touched.secondary_phone && errors.secondary_phone}
                  />
                </div>
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
                  options={roles}
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
                  options={thanas}
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
                  label="City"
                  placeholder="Select city"
                  options={cities}
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
                  options={countries}
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
                  options={branches}
                  value={values.branch || ""}
                  onChange={(branch) => {
                    setFieldValue("branch", branch);
                  }}
                  errorText={touched.branch && errors.branch}
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

              <Grid item md={6} xs={12}>
                <TextField
                  name="company_name"
                  label="Company Name"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.company_name || ""}
                  errorText={touched.company_name && errors.company_name}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  name="contact_person"
                  label="Contact Person"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact_person || ""}
                  errorText={touched.contact_person && errors.contact_person}
                />
              </Grid>
            </Grid>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </Card1>
    </div >
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

const accountSchema = yup.object().shape({
  first_name: yup.string().required("required").nullable("required"),
  last_name: yup.string().required("required").nullable("required"),
  email: yup.string().email("invalid email").required("required").nullable("required"),
  date_of_birth: yup.date().required("invalid date").nullable("required"),
  primary_phone: yup.string().required("primary_phone required").nullable("required"),
  secondary_phone: yup.string().required("secondary_phone required").nullable("required"),
});

AccountSettings.layout = VendorDashboardLayout;

export default AccountSettings;
