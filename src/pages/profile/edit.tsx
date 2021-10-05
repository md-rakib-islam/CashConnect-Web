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
import useJsonToFormData from "@customHook/useJsonToFormData";
import useUserInf from "@customHook/useUserInf";
import {
  BASE_URL,
  Branch_All,
  City_All,
  Country_All,
  Customer_By_Id,
  Customer_type_All,
  Customer_Update, Role_All,
  Thana_All
} from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

type Iimage = any;
type TIMG = any;

const ProfileEditor = ({
}) => {
  const [previewImage, setPreviewImage] = useState<Iimage>();
  const [image, setImage] = useState<TIMG>("");

  const [roles, setRoles] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [branches, setBranches] = useState([]);
  const [customer_types, setCustomer_types] = useState([]);

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

  const { user_id, authTOKEN } = useUserInf()

  const handleFormSubmit = (values) => {
    const data = {
      ...values,
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
      cusotmer_type:
        typeof values.cusotmer_type != "object"
          ? values?.cusotmer_type
          : values?.cusotmer_type?.id,
    };

    const [customerEditData] = useJsonToFormData(data);

    console.log("customerEditData", customerEditData)
    console.log("data", data)


    axios
      .put(`${Customer_Update}${user_id}`, customerEditData, authTOKEN)
      .then((data) => {
        console.log("updatedRes", data);
        router.push("/profile")
      });
  };

  useEffect(() => {
    axios.get(`${Customer_By_Id}${user_id}`, authTOKEN).then((datas) => {
      console.log("EditDetails", datas.data);
      const { data } = datas;

      setPreviewImage(`${BASE_URL}${data.image}`);

      for (let key in data) {
        setFieldValue(`${key}`, data[key]);
        // setFieldValue(`${key}`, _.isNull(data[key]) ? "" : data[key]);
      }
      setFieldValue("gender", {
        value: data.gender,
        label: genders.find((gender: any) => gender?.value == data.gender)
          ?.label,
      });
    }).catch(() => { });
  }, [user_id]);

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

    fetch(`${Customer_type_All}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer_types(data.customer_types);
      }).catch(() => { });
  }, []);

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
            src={previewImage}
            size={64}
          // loader={() => previewImage}
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
        </FlexBox>

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
                  errorText={touched.secondary_phone && errors.secondary_phone}
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
                <Select
                  mb="1rem"
                  label="Cusotmer_type"
                  placeholder="Select Cusotmer_type"
                  options={customer_types}
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
        {/* )}
        </Formik> */}
      </Card1>
    </div>
  );
};

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  date_of_birth: "",
  primary_phone: "",
  secondary_phone: "",
};

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required").nullable("required"),
  last_name: yup.string().required("required").nullable("required"),
  email: yup.string().email("invalid email").required("required").nullable("required"),
  date_of_birth: yup.date().required("invalid date").nullable("required"),
  primary_phone: yup.string().required("primary_phone required").nullable("required"),
  secondary_phone: yup.string().required("secondary_phone required").nullable("required"),
});

ProfileEditor.layout = DashboardLayout;

export default ProfileEditor;

// export const getServerSideProps: GetServerSideProps = async () => {

//   const [
//     countriesRes,
//     thanasRes,
//     branchesRes,
//     citiesRes,
//     customer_typesRes,
//     rolesRes,
//   ]: any = await Promise.all([
//     fetch(`${Country_All}`),
//     fetch(`${Thana_All}`),
//     fetch(`${Branch_All}`),
//     fetch(`${City_All}`),
//     fetch(`${Customer_type_All}`),
//     fetch(`${Role_All}`),
//   ]);
//   const [
//     countriesData,
//     thanasData,
//     branchesData,
//     citiesData,
//     customer_typesData,
//     rolesData,
//   ] = await Promise.all([
//     countriesRes.json(),
//     thanasRes.json(),
//     branchesRes.json(),
//     citiesRes.json(),
//     customer_typesRes.json(),
//     rolesRes.json(),
//   ]);

//   return {
//     props: {
//       countries: countriesData.countries,
//       thanas: thanasData.thanas,
//       branches: branchesData.branches,
//       cities: citiesData.cities,
//       customer_types: customer_typesData.customer_types,
//       roles: rolesData.roles,
//     }, // will be passed to the page component as props
//   };
// };
