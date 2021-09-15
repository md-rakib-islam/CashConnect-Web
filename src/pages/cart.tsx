import TextArea from "@component/textarea/TextArea";
import {
  Customer_Order_Comment,
  Customer_Order_Pending_Details,
} from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Box from "../components/Box";
import Button from "../components/buttons/Button";
import { Card1 } from "../components/Card1";
import Divider from "../components/Divider";
import FlexBox from "../components/FlexBox";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import ProductCard7 from "../components/product-cards/ProductCard7";
import Typography from "../components/Typography";

type CartItem = {
  id: any;
  quantity: any;
  price: any;
  product: any;
};

const Cart = () => {
  const [cartProductList, setCartProductList] = useState<CartItem[]>([]);
  const [reloadCart, setReloadCart] = useState(0);

  try {
    var order_Id: any = localStorage.getItem("OrderId");
    var authTOKEN: any = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };
  } catch (err) {
    var order_Id = null;
    var authTOKEN: any = {
      headers: {
        "Content-type": "application/json",
        Authorization: null,
      },
    };
  }

  const getTotalPrice = () => {
    return (
      cartProductList.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      ) || 0
    );
  };

  const addComment = () => {
    console.log("add comment called");
    console.log("comment", values.comment);

    const comment = {
      comment: values.comment,
    };
    console.log("commentData", comment);
    axios
      .post(`${Customer_Order_Comment}${order_Id}`, comment, authTOKEN)
      .then((res) => {
        console.log("comentRes", res);
      });
  };

  useEffect(() => {
    axios.get(`${Customer_Order_Pending_Details}${order_Id}`).then((res) => {
      console.log("CorderDetailsRes", res);
      setCartProductList(res.data.order?.order_items);
      setFieldValue("comment", res.data.order?.comment);
    });
  }, [reloadCart]);

  const runReloadCart = () => {
    setReloadCart(Math.random());
  };

  const initialValues = {
    comment: "",
  };
  const checkoutSchema = null;
  const handleFormSubmit = () => {};

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    // handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          {cartProductList.map((item) => (
            <ProductCard7
              key={item.id}
              mb="1.5rem"
              runReloadCart={runReloadCart}
              {...item}
            />
          ))}
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Card1>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <Typography color="gray.600">Total:</Typography>
              <FlexBox alignItems="flex-end">
                <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                  ${getTotalPrice().toFixed(2)}
                </Typography>
                <Typography fontWeight="600" fontSize="14px" lineHeight="1">
                  00
                </Typography>
              </FlexBox>
            </FlexBox>

            <Divider mb="1rem" />

            <FlexBox alignItems="center" mb="1rem">
              <Typography fontWeight="600" mr="10px">
                Additional Comments
              </Typography>
              <Box p="3px 10px" bg="primary.light" borderRadius="3px">
                <Typography fontSize="12px" color="primary.main">
                  Note
                </Typography>
              </Box>
            </FlexBox>

            <TextArea
              rows={6}
              name="comment"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.comment || ""}
              errorText={touched.comment && errors.comment}
              fullwidth
              mb="1rem"
            />

            <Divider mb="1rem" />

            {/* 
            <TextField placeholder="Voucher" fullwidth />

            <Button
              variant="outlined"
              color="primary"
              mt="1rem"
              mb="30px"
              fullwidth
            >
              Apply Voucher
            </Button>

            <Divider mb="1.5rem" />

            <Typography fontWeight="600" mb="1rem">
              Shipping Estimates
            </Typography>

            <Select
              mb="1rem"
              label="Country"
              placeholder="Select Country"
              options={countryList}
              onChange={(e) => {
                console.log(e);
              }}
            />

            <Select
              label="State"
              placeholder="Select State"
              options={stateList}
              onChange={(e) => {
                console.log(e);
              }}
            />

            <Box mt="1rem">
              <TextField label="Zip Code" placeholder="3100" fullwidth />
            </Box>

            <Button variant="outlined" color="primary" my="1rem" fullwidth>
              Calculate Shipping
            </Button> */}
            <Link href="/checkout">
              <Button
                variant="contained"
                color="primary"
                onClick={addComment}
                fullwidth
              >
                Checkout Now
              </Button>
            </Link>
          </Card1>
        </Grid>
      </Grid>
    </Fragment>
  );
};

Cart.layout = CheckoutNavLayout;

export default Cart;
