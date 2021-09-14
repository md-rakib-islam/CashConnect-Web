import { Order_Details_By_Id } from "@data/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import PaymentForm from "../components/payment/PaymentForm";
import PaymentSummary from "../components/payment/PaymentSummary";

const Checkout = () => {
  const [subtotal, setSubtotal] = useState(null);
  const [shippingPrice, setShippingPrice] = useState(null);
  const [taxPrice, setTaxPrice] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(null);

  useEffect(() => {
    const order_Id = localStorage.getItem("OrderId");

    axios.get(`${Order_Details_By_Id}${order_Id}`).then((res) => {
      console.log("orderDetailsRes", res);
      const { data } = res;
      setSubtotal(data.net_amount);
      setShippingPrice(data.shipping_price);
      setTaxPrice(data.tax_price);
      setDiscountAmount(data.discount_amount);
    });
  }, []);

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm Subtotal={subtotal} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary
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
