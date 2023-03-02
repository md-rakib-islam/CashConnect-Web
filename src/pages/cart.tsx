import Currency from "@component/Currency";
import LazyImage from "@component/LazyImage";
import LoginPopup from "@component/LoginPopup";
import TextArea from "@component/textarea/TextArea";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  Customer_Order_Comment,
  Customer_Order_Pending_Details,
} from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Box from "../components/Box";
import Button from "../components/buttons/Button";
import { Card1 } from "../components/Card1";
import Divider from "../components/Divider";
import FlexBox from "../components/FlexBox";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import ProductCard7 from "../components/product-cards/ProductCard7";
import Typography, { Paragraph } from "../components/Typography";

type CartItem = {
  id: any;
  quantity: any;
  price: any;
  product: any;
  condition: string;
};

const Cart = () => {
  const [cartProductList, setCartProductList] = useState<CartItem[]>([]);
  const [_reloadCart, setReloadCart] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const { state } = useAppContext();
  const cartCanged = state.cart.chartQuantity;

  const router = useRouter();

  const { order_Id, authTOKEN, isLogin } = useUserInf();

  const closeLoginTab = () => {
    setOpenLogin(false);
  };

  const getTotalPrice = () => {
    return (
      cartProductList.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      ) || 0
    );
  };

  const addComment = () => {
    console.log("comment", values.comment);

    if (isLogin) {
      if (order_Id) {
        const comment = {
          comment: values.comment,
        };
        console.log("commentData", comment);
        axios
          .post(`${Customer_Order_Comment}${order_Id}`, comment, authTOKEN)
          .then((res) => {
            console.log("comentRes", res);
            router.push("/checkout");
          })
          .catch((err) => {
            console.log("error", err);
          });
      }
    } else {
      setOpenLogin(true);
    }
  };

  useEffect(() => {
    if (order_Id) {
      axios
        .get(`${Customer_Order_Pending_Details}${order_Id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("jwt_access_token"),
          },
        })
        .then((res) => {
          console.log("CorderDetailsRes", res);
          setCartProductList(
            res.data.order?.order_items.length !== 0
              ? res.data.order?.order_items
              : []
          );
          setFieldValue("comment", res.data.order?.comment);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [order_Id, cartCanged]);

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
    <>
      {cartProductList.length !== 0 ? (
        <Fragment>
          <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />

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
                      <Currency>{getTotalPrice().toFixed(2)}</Currency>
                    </Typography>
                    {/* <Typography fontWeight="600" fontSize="14px" lineHeight="1">
                  00
                </Typography> */}
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

                <Button
                  variant="contained"
                  color="primary"
                  onClick={addComment}
                  fullwidth
                >
                  Checkout Now
                </Button>
              </Card1>
            </Grid>
          </Grid>
        </Fragment>
      ) : (
        <FlexBox
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="calc(100% - 100px)"
          mb="260px"
          mt="260px"
        >
          <LazyImage
            src="/assets/images/logos/shopping-bag.svg"
            width="90px"
            height="100%"
          />
          <Paragraph
            mt="1rem"
            color="text.muted"
            textAlign="center"
            maxWidth="200px"
          >
            Your shopping bag is empty. Start shopping
          </Paragraph>
        </FlexBox>
      )}
    </>
  );
};

Cart.layout = CheckoutNavLayout;

export default Cart;
