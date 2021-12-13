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
import TextField from "@component/text-field/TextField";
import Typography from "@component/Typography";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { BASE_URL, Customer_Payment_Maythod_By_Id, Customer_Payment_Method_Create, Customer_Payment_Method_Update } from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import jsonToFormData from "helper/jsonToFormData";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

const PaymentMethodEditor = () => {
  const {
    query: { id },
  } = useRouter();

  const router = useRouter()
  const { dispatch } = useAppContext()
  const { user_id, authTOKEN } = useUserInf()

  const [previewImage, setPreviewImage] = useState<any>("");
  const [image, setImage] = useState<any>("");

  useEffect(() => {
    if (id) {
      if (id !== "add") {
        axios.get(`${Customer_Payment_Maythod_By_Id}${id}`, authTOKEN).then(res => {
          console.log("paymentDetailsRes", res)
          resetForm({ values: { ...res?.data } })
          setPreviewImage(`${BASE_URL}${res?.data?.image}`)
        })
      }
    }
  }, [id])

  const handleFormSubmit = async (values) => {

    const data = {
      ...values,
      customer: user_id,
      image: image || previewImage,
    }
    const [saveData] = jsonToFormData(data)

    if (id === "add") {
      axios.post(`${Customer_Payment_Method_Create}`, saveData, authTOKEN).then(res => {

        console.log("Customer_Payment_Method_Create", res)

        if (res?.data?.id) {
          router.push("/payment-methods")
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: "payment method added",
            }
          })
        }
        else {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: "sumthing went wrong",
              alerType: "error",
            }
          })
        }
      }
      ).catch(() => {
        dispatch({
          type: "CHANGE_ALERT",
          payload: {
            alertValue: "sumthing went wrong",
            alerType: "error",
          }
        })
      })
    }
    else {
      axios.put(`${Customer_Payment_Method_Update}${id}`, saveData, authTOKEN).then(res => {
        console.log("Customer_Payment_Method_Update", res)
        router.push("/payment-methods")
        dispatch({
          type: "CHANGE_ALERT",
          payload: {
            alertValue: "payment method updated",
          }
        })
      }).catch(() => {
        dispatch({
          type: "CHANGE_ALERT",
          payload: {
            alertValue: "something went wrong",
            alerType: "error",
          }
        })
      })
    }
    console.log("data", data);
  };


  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    // setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <div>
      <DashboardPageHeader
        iconName="credit-card_filled"
        title={`${id === "add" ? "Add New" : "Edit"} Payment Method`}
        button={
          <Link href="/payment-methods">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Payment Methods
            </Button>
          </Link>
        }
      />

      <Card1>
        <form onSubmit={handleSubmit}>
          <Box mb="30px">
            <Grid container horizontal_spacing={6} vertical_spacing={4}>
              <Grid item md={6} xs={12}>
                <TextField
                  name="card_number"
                  label="Card Number"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.card_number || ""}
                  errorText={touched.card_number && errors.card_number}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="card_holder"
                  label="Name on Card"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.card_holder || ""}
                  errorText={touched.card_holder && errors.card_holder}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="expiry_date"
                  label="Exp. Date"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.expiry_date || ""}
                  errorText={touched.expiry_date && errors.expiry_date}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="cvc_code"
                  label="CVC"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cvc_code || ""}
                  errorText={touched.cvc_code && errors.cvc_code}
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  mt="20px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="150px"
                  border="1px dashed"
                  borderColor="gray.400"
                  borderRadius="10px"
                  transition="all 250ms ease-in-out"
                  style={{ outline: "none" }}
                >
                  <Typography fontSize="17px" mb="5px">Image</Typography>

                  <FlexBox alignItems="flex-end" mb="22px">
                    <Avatar
                      borderRadius="10px"
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
                        }}
                        id="profile-image"
                        accept="image/*"
                        type="file"
                      />
                    </Hidden>
                  </FlexBox>

                </Box>
              </Grid>
            </Grid>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </Card1>
    </div>
  );
};

const initialValues = {
  card_number: "",
  card_holder: "",
  expiry_date: "",
  cvc_code: "",
};

const checkoutSchema = yup.object().shape({
  card_holder: yup.string().required("required"),
  card_number: yup.string().required("required"),
  expiry_date: yup.string().required("required"),
  cvc_code: yup.string().required("required"),
});

PaymentMethodEditor.layout = DashboardLayout;

export default PaymentMethodEditor;
