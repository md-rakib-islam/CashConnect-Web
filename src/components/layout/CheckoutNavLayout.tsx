import useUserInf from "@customHook/useUserInf";
import { Customer_Order_Pending_Details } from "@data/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Box from "../Box";
import Container from "../Container";
import Grid from "../grid/Grid";
import Stepper from "../stepper/Stepper";
import AppLayout from "./AppLayout";

const CheckoutNavLayout: React.FC = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [cartProductList, setCartProductList] = useState([]);

  const { order_Id } = useUserInf();

  const router = useRouter();
  const { pathname } = router;
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
          setCartProductList(
            res.data.order?.order_items.length !== 0
              ? res.data.order?.order_items
              : []
          );
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [order_Id]);

  const handleStepChange = (_step, ind) => {
    switch (ind) {
      case 0:
        router.push("/cart");
        break;
      case 1:
        router.push("/checkout");
        break;
      case 2:
        router.push("/payment");
        break;
      case 3:
        router.push("/orders");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/checkout":
        setSelectedStep(2);
        break;
      case "/payment":
        setSelectedStep(3);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <AppLayout>
      <Container my="2rem">
        {cartProductList.length !== 0 ? (
          <Box mb="14px">
            <Grid container spacing={6}>
              <Grid item lg={8} md={8} xs={12}>
                <Stepper
                  stepperList={stepperList}
                  selectedStep={selectedStep}
                  onChange={handleStepChange}
                />
              </Grid>
            </Grid>
          </Box>
        ) : (
          ""
        )}
        {children}
      </Container>
    </AppLayout>
  );
};

const stepperList = [
  {
    title: "Cart",
    disabled: false,
  },
  {
    title: "Details",
    disabled: false,
  },
  {
    title: "Payment",
    disabled: false,
  },
  {
    title: "Confirm",
    disabled: true,
  },
];

export default CheckoutNavLayout;
