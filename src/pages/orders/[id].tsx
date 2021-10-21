import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Currency from "@component/Currency";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import useFormettedDate from "@customHook/useFormettedDate";
import { Customer_order_Details_For_Status } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Item from "./Item";


type OrderStatus = "packaging" | "shipping" | "delivering" | "complete";

const OrderDetails = () => {
  const orderStatus: OrderStatus = "shipping";
  const orderStatusList = ["packaging", "shipping", "delivering", "complete"];
  const stepIconList = ["package-box", "truck-1", "delivery"];

  const statusIndex = orderStatusList.indexOf(orderStatus);
  const width = useWindowSize();
  const breakpoint = 350;

  const [productList, setProductList] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [shippingFee, setShippingFee] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [paid_by, setPaid_by] = useState("Credit/Debit Card")
  const [orderId, setOrderId] = useState(0)
  const [DeliveredOn, setDeliveredOn] = useState("")
  const [placedOn, setPlacedOn] = useState("")
  const [shippingAddress, setshippingAddress] = useState("")

  const router = useRouter()
  const order_id = router.query?.id

  useEffect(() => {
    if (order_id) {
      axios.get(`${Customer_order_Details_For_Status}${order_id}`).then((res) => {
        console.log("CorderDetailsRes", res.data);
        setProductList(res.data.order?.order_items);
        setSubTotal(res.data.order?.net_amount);
        setTotal(res.data.order?.net_amount);
        setShippingFee(res.data.order?.shipping_price)
        setDiscount(res.data.order?.discount_amount)
        setPaid_by(res.data.order?.payment_method)
        setOrderId(res.data.order?.id)
        setDeliveredOn(res.data.order?.delivered_at)
        setPlacedOn(res.data.order?.created_at)
        setshippingAddress(res.data.order?.shipping_address?.street_address)
      }).catch(() => { });
    }
  }, [order_id]);

  // console.log("productList", productList)
  return (
    <div>
      <DashboardPageHeader
        title="Order Details"
        iconName="bag_filled"
        button={
          <Button color="primary" bg="primary.light" px="2rem">
            Order Again
          </Button>
        }
      />

      <Card p="2rem 1.5rem" mb="30px">
        <FlexBox
          flexDirection={width < breakpoint ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          my="2rem"
        >
          {stepIconList.map((item, ind) => (
            <Fragment key={item}>
              <Box position="relative">
                <Avatar
                  size={64}
                  bg={ind <= statusIndex ? "primary.main" : "gray.300"}
                  color={ind <= statusIndex ? "gray.white" : "primary.main"}
                >
                  <Icon size="32px" defaultcolor="currentColor">
                    {item}
                  </Icon>
                </Avatar>
                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar size={22} bg="gray.200" color="success.main">
                      <Icon size="12px" defaultcolor="currentColor">
                        done
                      </Icon>
                    </Avatar>
                  </Box>
                )}
              </Box>
              {ind < stepIconList.length - 1 && (
                <Box
                  flex={width < breakpoint ? "unset" : "1 1 0"}
                  height={width < breakpoint ? 50 : 4}
                  minWidth={width < breakpoint ? 4 : 50}
                  bg={ind < statusIndex ? "primary.main" : "gray.300"}
                />
              )}
            </Fragment>
          ))}
        </FlexBox>

        <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            borderRadius="300px"
            bg="primary.light"
            color="primary.main"
            textAlign="center"
          >
            Estimated Delivery Date <b>{placedOn && useFormettedDate(placedOn, 3)}</b>
          </Typography>
        </FlexBox>
      </Card>

      <Card p="0px" mb="30px" overflow="hidden">
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Order ID:
            </Typography>
            <Typography fontSize="14px">{orderId}</Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Placed on:
            </Typography>
            <Typography fontSize="14px">
              {placedOn && useFormettedDate(placedOn)}
            </Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Delivered on:
            </Typography>
            <Typography fontSize="14px">
              {DeliveredOn && useFormettedDate(DeliveredOn)}
            </Typography>
          </FlexBox>
        </TableRow>

        <Box py="0.5rem">
          {productList.map((item) => <Item item={item}></Item>)}
        </Box>
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Shipping Address
            </H5>
            <Paragraph fontSize="14px" my="0px">
              {shippingAddress}
            </Paragraph>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Total Summary
            </H5>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Subtotal:
              </Typography>
              <H6 my="0px">{subTotal ? (<Currency>{subTotal}</Currency>) : "-"}</H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Shipping fee:
              </Typography>
              <H6 my="0px">{shippingFee ? (<Currency>{shippingFee}</Currency>) : "-"}</H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Discount:
              </Typography>
              <H6 my="0px">{discount ? (<Currency>{discount}</Currency>) : "-"}</H6>
            </FlexBox>

            <Divider mb="0.5rem" />

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <H6 my="0px">Total</H6>
              <H6 my="0px">{total ? (<Currency>{total}</Currency>) : "-"}</H6>
            </FlexBox>
            <Typography fontSize="14px">Paid by {paid_by}</Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

OrderDetails.layout = DashboardLayout;

export default OrderDetails;
