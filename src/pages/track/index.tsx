import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/FooterLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { Get_Tracking_Order } from "@data/constants";
import { requred } from "@data/data";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import router from "next/router";
import React from "react";
import * as yup from "yup";
import { H2 } from "@component/Typography";

const ProfileEditor = ({}) => {
  //

  const { authTOKEN, isLogin } = useUserInf();

  const { dispatch } = useAppContext();

  const handleFormSubmit = async (values) => {
    if (isLogin) {
      console.log("order_no", values.order_no);
      axios
        .get(`${Get_Tracking_Order}${values.order_no}`, authTOKEN)
        .then((res) => {
          console.log("updatedRes", res);

          if (res?.data?.id) {
            router.push(`/orders/${res?.data?.id}`);
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "success",
                alertValue: "Your order has been tracked successfully",
              },
            });
          }
          //else {
          //   dispatch({
          //     type: "CHANGE_ALERT",
          //     payload: {
          //       alerType: "error",
          //       alertValue: "someting went wrongpppp",
          //     },
          //   });
          // }
        })
        .catch(() => {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alerType: "error",
              alertValue: "Invalid Order No",
            },
          });
        });
    } else {
      localStorage.setItem("backAfterLogin", `/track`);
      router.push({
        pathname: "/login",
      });
      // setErrors({
      //   ...errors,
      //   // username: userNameExist ? "user name already exist" : "",
      //   order_no: "email already exist" || "",
      // });
    }
  };

  const { errors, touched, handleChange, handleBlur, handleSubmit } = useFormik(
    {
      initialValues: initialValues,
      validationSchema: checkoutSchema,
      onSubmit: handleFormSubmit,
    }
  );

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
          <H2
            color="primary.main"
            fontWeight="800"
            mb="15px"
            style={{ textAlign: "center" }}
          >
            {" "}
            Track Your Order
          </H2>
          <Grid container horizontal_spacing={6} vertical_spacing={4}>
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
              style={{ marginLeft: "auto", marginRight: "auto", width: "60%" }}
            >
              <TextField
                name="order_no"
                label="Order No"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                errorText={touched.order_no && errors.order_no}
              />
            </Grid>
          </Grid>
        </Box>

        <Button
          style={{ margin: "auto", width: "60%" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

const initialValues = {
  order_no: "",
};

const checkoutSchema = yup.object().shape({
  order_no: yup.string().required("required").nullable(requred),

  // secondary_phone: yup.string().required("secondary_phone required").nullable(requred),
});

ProfileEditor.layout = DashboardLayout;

export default ProfileEditor;
