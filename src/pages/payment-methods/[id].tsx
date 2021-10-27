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
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as yup from "yup";

const PaymentMethodEditor = () => {
  const {
    query: { id },
  } = useRouter();

  const [previewImage, setPreviewImage] = useState<any>("");
  const [_image, setImage] = useState<any>("");

  const handleFormSubmit = async (values) => {
    console.log(values);
    // const data = {
    //   ...values,
    //   image,
    // }
  };


  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
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
                  name="card_no"
                  label="Card Number"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.card_no || ""}
                  errorText={touched.card_no && errors.card_no}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="name"
                  label="Name on Card"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name || ""}
                  errorText={touched.name && errors.name}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="exp"
                  label="Exp. Date"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.exp || ""}
                  errorText={touched.exp && errors.exp}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="cvc"
                  label="CVC"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cvc || ""}
                  errorText={touched.cvc && errors.cvc}
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
  card_no: "",
  name: "",
  exp: "",
  cvc: "",
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  card_no: yup.string().required("required"),
  exp: yup.string().required("required"),
  cvc: yup.string().required("required"),
});

PaymentMethodEditor.layout = DashboardLayout;

export default PaymentMethodEditor;
