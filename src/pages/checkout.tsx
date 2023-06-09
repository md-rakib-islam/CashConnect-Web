import useUserInf from "@customHook/useUserInf";
import { Customer_Order_Pending_Details } from "@data/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";

const Checkout = () => {
  const [subtotal, setSubtotal] = useState(null);
  const [shippingPrice, setShippingPrice] = useState(null);
  const [taxPrice, setTaxPrice] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(null);

  const { order_Id } = useUserInf();

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
          console.log("orderDetailsRes", res);
          const { order } = res.data;
          setSubtotal(order.net_amount);
          setShippingPrice(order.shipping_price);
          setTaxPrice(order.tax_price);
          setDiscountAmount(order.discount_amount);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [order_Id]);

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummary
          Subtotal={subtotal}
          Shipping={shippingPrice}
          Tax={taxPrice}
          Discount={discountAmount}
        />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export default Checkout;
