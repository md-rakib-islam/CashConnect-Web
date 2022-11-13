import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import { Chip } from "@component/Chip";
import Currency from "@component/Currency";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph, Small } from "@component/Typography";
import {
  Customer_order_Details_For_Status,
  Customer_Order_Invoice,
} from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import { format } from "date-fns";
import addDays from "date-fns/addDays";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Item from "./Item";

// type OrderStatus = "packaging" | "shipping" | "delivering" | "complete";

const OrderDetails = () => {
  const [orderStatus, setorderStatus] = useState<any>("pending");

  const orderStatusList = [
    "pending",
    "processing",
    "packaging",
    "on_the_way",
    // "delivering",
    "delivered",
  ];
  const stepIconList = [
    { icon: "package-box", name: "Accepted" },
    { icon: "processing", name: "Processing" },
    { icon: "truck-1", name: "In Transit" },
    { icon: "delivery-truck", name: "On the way" },
    { icon: "delivery", name: "Delivered" },

    // "truck",
  ];
  // const statusText = [
  //   "Accepted",

  //   // "truck",

  // ];

  const statusIndex = orderStatusList.indexOf(orderStatus);
  const width = useWindowSize();
  const breakpoint = 340;
  const [productList, setProductList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [paid_by, setPaid_by] = useState("Credit/Debit Card");
  const [orderId, setOrderId] = useState(0);
  const [DeliveredOn, setDeliveredOn] = useState("");
  const [placedOn, setPlacedOn] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [invoice, setInvoice] = useState<any>({});
  const router = useRouter();
  const order_id = router.query?.id;

  useEffect(() => {
    axios
      .get(`${Customer_Order_Invoice}${order_id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("jwt_access_token"),
        },
      })
      .then((res) => {
        console.log("Customer_Order_Invoice", res.data);
        setInvoice(res?.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    if (order_id) {
      axios
        .get(`${Customer_order_Details_For_Status}${order_id}`)
        .then((res) => {
          console.log("CorderDetailsRes", res.data);
          setProductList(res.data.order?.order_items || []);
          setSubTotal(res.data.order?.net_amount || 0);
          setTotal(res.data.order?.net_amount);
          setShippingFee(res.data.order?.shipping_price || 0);
          setDiscount(res.data.order?.discount_amount || 0);
          setPaid_by(res.data.order?.payment_method?.name || "_");
          setOrderId(res.data.order?.id || 0);
          setDeliveredOn(res.data.order?.delivered_at || "");
          setPlacedOn(res.data.order?.created_at || "");
          setPhoneNumber(res.data.order?.user_phone_number || "");
          setorderStatus(res.data.order?.order_status?.name || "");
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [order_id]);

  console.log("invoice", invoice);
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
            <Fragment key={item.icon}>
              <Box position="relative">
                <Avatar
                  size={64}
                  bg={ind <= statusIndex ? "primary.main" : "gray.300"}
                  color={ind <= statusIndex ? "gray.white" : "primary.main"}
                >
                  <Icon size="32px" defaultcolor="currentColor">
                    {item.icon}
                  </Icon>
                </Avatar>

                {ind <= statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar size={22} bg="gray.200" color="success.main">
                      <Icon size="12px" defaultcolor="currentColor">
                        done
                      </Icon>
                    </Avatar>
                  </Box>
                )}
                {orderStatus == "cancelled" && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar size={22} bg="primary.main" color="gray.200">
                      <Icon size="12px" defaultcolor="currentColor">
                        close
                      </Icon>
                    </Avatar>
                  </Box>
                )}
                <H6 color={ind <= statusIndex ? "primary.main" : "gray.500"}>
                  {" "}
                  {item.name}
                </H6>
              </Box>

              {ind < stepIconList.length - 1 && (
                <Box
                  flex={width < breakpoint ? "unset" : "1 1 0"}
                  height={width < breakpoint ? 50 : 4}
                  minWidth={width < breakpoint ? 4 : 50}
                  bg={ind <= statusIndex ? "primary.main" : "gray.300"}
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
            Estimated Delivery Date{" "}
            <b>
              {placedOn &&
                addDays(new Date(placedOn), 3)?.toString()?.slice(0, 15)}
            </b>
          </Typography>
        </FlexBox>
      </Card>

      <Card p="0px" mb="30px" overflow="hidden">
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="11px" color="text.muted" mr="4px">
              Order ID:
            </Typography>
            <Typography fontSize="11px">{orderId}</Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="11px" color="text.muted" mr="4px">
              Placed on:
            </Typography>
            <Typography fontSize="11px">
              {placedOn && format(new Date(placedOn), "MMM dd, yyyy")}
            </Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="11px" color="text.muted" mr="4px">
              Delivered on:
            </Typography>
            <Typography fontSize="11px">
              {DeliveredOn && format(new Date(DeliveredOn), "MMM dd, yyyy")}
            </Typography>
          </FlexBox>
        </TableRow>
      </Card>

      <Card>
        <FlexBox>
          <Grid style={{ padding: "20px 30px" }} item lg={3} md={3} xs={3}>
            <H5 mt="0px" mb="14px" fontSize="14px">
              Customer Information
            </H5>
            <Paragraph fontSize="11px" my="0px">
              Name: {invoice?.billing?.user?.first_name}{" "}
              {invoice?.billing?.user?.last_name}
            </Paragraph>
            <Paragraph fontSize="11px" my="0px">
              Phone: {PhoneNumber}
            </Paragraph>
          </Grid>
          <Grid style={{ padding: "20px 30px" }} item lg={3} md={3} xs={3}>
            <H5 mt="0px" mb="14px" fontSize="14px">
              Billing Address
            </H5>
            <Paragraph fontSize="11px" my="0px">
              Name: {invoice?.billing?.user?.first_name}{" "}
              {invoice?.billing?.user?.last_name}
            </Paragraph>
            <Paragraph fontSize="11px" my="0px">
              Address: {invoice?.billing?.street_address}{" "}
              {invoice?.billing?.thana?.name} {invoice?.billing?.city?.name} -
              {invoice?.billing?.zip_code}
            </Paragraph>
            <Paragraph fontSize="11px" my="0px">
              Phone: {invoice?.billing?.phone}{" "}
            </Paragraph>
            <Paragraph fontSize="11px" my="0px">
              Email: {invoice?.billing?.email}{" "}
            </Paragraph>
          </Grid>
          <Grid style={{ padding: "20px 30px" }} item lg={3} md={3} xs={3}>
            <H5 mt="0px" mb="14px" fontSize="14px">
              Shipping Address
            </H5>
            <Paragraph fontSize="11px" my="0px">
              Name: {invoice?.shipping?.user?.first_name}{" "}
              {invoice?.shipping?.user?.last_name}
            </Paragraph>
            <Paragraph fontSize="11px" my="0px">
              Address: {invoice?.shipping?.street_address}{" "}
              {invoice?.shipping?.thana?.name} {invoice?.shipping?.city?.name} -
              {invoice?.shipping?.zip_code}
            </Paragraph>
            <Paragraph fontSize="11px" my="0px">
              Phone: {invoice?.shipping?.phone}{" "}
            </Paragraph>
            <Paragraph fontSize="11px" my="0px">
              Email: {invoice?.shipping?.email}{" "}
            </Paragraph>
          </Grid>
          <Grid style={{ padding: "20px 30px" }} item lg={3} md={3} xs={3}>
            <H5 mt="0px" mb="14px" fontSize="14px">
              Order Information
            </H5>
            <Paragraph fontSize="11px" my="0px">
              Order # {invoice?.order?.order_no}
            </Paragraph>
            <Paragraph fontSize="11px" my="0px">
              Order Date:{" "}
              {invoice?.order?.order_date &&
                format(new Date(invoice?.order?.order_date), "MMM dd, yyyy")}
            </Paragraph>
            <Box m="6px">
              <Chip
                p="0.25rem 1rem"
                style={{ backgroundColor: "#f5efef" }}
                // bg={`${memoizedGetColor(
                //   invoice?.order?.order_status?.name
                // )}.light`}
              >
                <Small
                  style={{
                    color:
                      invoice?.order?.order_status?.name == "cancelled"
                        ? "red"
                        : "green",
                    fontWeight: 700,
                  }}
                >
                  {invoice?.order?.order_status?.name}
                </Small>
              </Chip>
            </Box>
          </Grid>
        </FlexBox>
      </Card>

      <Grid style={{ marginTop: "20px" }} container spacing={12}>
        <Grid item lg={12} md={12} xs={12}>
          <Card p="20px 30px">
            <Box py="0.5rem">
              {productList.map((item) => (
                <Item item={item} key={item?.id}></Item>
              ))}
            </Box>
            <Divider mb="0.5rem" />
            <Grid
              style={{ marginRight: "0px", marginLeft: "auto" }}
              item
              lg={3}
              md={3}
              xs={3}
            >
              <Box>
                <H5 mt="0px" mb="14px" fontSize="14px">
                  Total Summary
                </H5>
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography fontSize="11px" color="text.hint">
                    Subtotal:
                  </Typography>
                  <H6 my="0px">
                    {subTotal ? <Currency>{subTotal}</Currency> : "-"}
                  </H6>
                </FlexBox>
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography fontSize="11px" color="text.hint">
                    Shipping fee:
                  </Typography>
                  <H6 my="0px">
                    {shippingFee ? <Currency>{shippingFee}</Currency> : "-"}
                  </H6>
                </FlexBox>
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography fontSize="11px" color="text.hint">
                    Discount:
                  </Typography>
                  <H6 my="0px">
                    {discount ? <Currency>{discount}</Currency> : "-"}
                  </H6>
                </FlexBox>

                <Divider mb="0.5rem" />

                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1rem"
                >
                  <H6 my="0px">Total</H6>
                  <H6 my="0px">{total ? <Currency>{total}</Currency> : "-"}</H6>
                </FlexBox>
                <Typography fontSize="11px" style={{ fontWeight: 600 }}>
                  Payment by {paid_by.toUpperCase()}
                </Typography>
              </Box>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

try {
  var user_type: string = localStorage.getItem("userType");
} catch (err) {
  var user_type = "";
}

OrderDetails.layout =
  user_type === "vendor" ? VendorDashboardLayout : CustomerDashboardLayout;

export default OrderDetails;
