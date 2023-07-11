import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import { Chip } from "@component/Chip";
import Currency from "@component/Currency";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph, Small } from "@component/Typography";
import {
  BASE_URL,
  Purchase_Items_By_Purchase_Id,
  Purchase_Req_By_Id,
} from "@data/constants";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SellDetails = () => {
  const [purchaseReqItems, setPurchaseReqItems] = useState([]);
  // const [shippingAddress, setShippingAddress] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [placedOn, setPlacedOn] = useState("");
  // const [customerNote, setCustomerNote] = useState("");
  const [paymentMathod, setpaymentMathod] = useState("");
  const [userInfo, setUserInfo] = useState<any>("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`${Purchase_Items_By_Purchase_Id}${id}`)
        .then((res) => {
          console.log("Purchase_Items_By_Purchase_Id", res);
          setPurchaseReqItems(res?.data?.purchase_request_items);
        })
        .catch((err) => {
          console.log("error", err);
        });

      axios.get(`${Purchase_Req_By_Id}${id}`).then((res) => {
        console.log("Purchaseres", res);
        const data = [];
        data.push(res?.data);
        setUserInfo(res?.data);
        setSubTotal(res?.data?.total_price);
        setTotal(res?.data?.total_price);
        // setShippingAddress(res?.data?.street_address);
        // setCustomerNote(res?.data?.vendor_comment);
        // setCustomerNote(res?.data?.vendor_comment);
        setPlacedOn(res?.data?.created_at);

        setShippingFee(0);
        setDiscount(0);
        setpaymentMathod("_");
      });
    }
  }, [id]);

  // console.log("userInfo", userInfo[0]?.contact_no);

  return (
    <div>
      <DashboardPageHeader
        title="Sell Details"
        iconName="bag_filled"
        button={
          <Link href="/vendor/sells">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to sell List
            </Button>
          </Link>
        }
      />
      <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
        <FlexBox
          className="pre"
          flex="0 0 0 !important"
          m="6px"
          alignItems="center"
        >
          <Typography fontSize="14px" color="text.muted" mr="4px">
            Sell ID:
          </Typography>
          <Typography fontSize="14px">{id}</Typography>
        </FlexBox>
        <FlexBox className="pre" m="6px" alignItems="center">
          <Typography fontSize="14px" color="text.muted" mr="4px">
            Placed on:
          </Typography>
          <Typography fontSize="14px">
            {placedOn && format(new Date(placedOn), "MMM dd, yyyy")}
          </Typography>
        </FlexBox>
        {/* <Box maxWidth="160px">
          <Select placeholder="Sell Status" options={sellStatusList} />
        </Box> */}
      </TableRow>
      <Grid
        style={{ marginBottom: "20px", marginLeft: " 0px" }}
        container
        spacing={6}
      >
        <Card>
          <FlexBox>
            <Grid style={{ padding: "20px 30px" }} lg={6} md={6} xs={12}>
              <H5 mt="0px" mb="14px" fontSize="14px">
                Customer Information
              </H5>
              <Paragraph fontSize="11px" my="0px">
                Name: {userInfo?.first_name} {userInfo?.last_name}
              </Paragraph>
              <Paragraph fontSize="11px" my="0px">
                Phone: {userInfo?.contact_no}
              </Paragraph>
              {userInfo?.email && (
                <Paragraph fontSize="11px" my="0px">
                  Email: {userInfo?.email}
                </Paragraph>
              )}
            </Grid>

            <Grid style={{ padding: "20px 30px" }} lg={6} md={6} xs={12}>
              <H5 mt="0px" mb="14px" fontSize="14px">
                Sell Information
              </H5>
              <Paragraph fontSize="11px" my="0px">
                Sell # {userInfo?.invoice_no}
              </Paragraph>
              <Paragraph fontSize="11px" my="0px">
                Sell Date:{" "}
                {userInfo?.request_date &&
                  format(new Date(userInfo?.request_date), "MMM dd, yyyy")}
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
                        userInfo?.purchase_status?.name == "cancelled"
                          ? "red"
                          : "green",
                      fontWeight: 700,
                    }}
                  >
                    {userInfo?.purchase_status?.name}
                  </Small>
                </Chip>
              </Box>
            </Grid>
          </FlexBox>
        </Card>
      </Grid>
      <Card p="0px" mb="30px" overflow="hidden">
        {/* <Box p="1rem 1.5rem 10px">
          <TextField label="Add Product" fullwidth />
        </Box> */}

        <Box py="0.5rem">
          {purchaseReqItems.map((item) => (
            <FlexBox
              px="1rem"
              py="0.5rem"
              flexWrap="wrap"
              alignItems="center"
              key={item?.id}
            >
              <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                <Avatar
                  src={`${BASE_URL}${item?.purchase_request_item_images[0]?.image}`}
                  size={64}
                />
                <Box ml="20px">
                  <H6 my="0px">{item?.name}</H6>
                  <FlexBox alignItems="center"></FlexBox>
                </Box>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted" display="flex">
                  <Currency>{item?.unit_price}</Currency> x {item?.quantity}
                </Typography>
              </FlexBox>
              {/* <FlexBox flex="0 0 0 !important" m="6px" alignItems="center">
                <IconButton size="small">
                  <Icon variant="small">delete</Icon>
                </IconButton>
              </FlexBox> */}
            </FlexBox>
          ))}
        </Box>
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          {/* <Card p="20px 30px" mb="1.5rem">
            <H5 mt="0px" mb="14px">
              Shipping Address
            </H5>
            <Paragraph fontSize="14px" my="0px">
              {shippingAddress}
            </Paragraph>
          </Card> */}

          {/* <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Customer's Note
            </H5>
            <Paragraph fontSize="14px" my="0px">
              {customerNote}
            </Paragraph>
          </Card> */}
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px" mb="1.5rem">
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
              <H6 my="0px">
                {subTotal ? <Currency>{subTotal}</Currency> : "-"}
              </H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
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
              <Typography fontSize="14px" color="text.hint">
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
            <Typography fontSize="14px">Payment by {paymentMathod}</Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

// const sellStatusList = [
//   {
//     label: "Processing",
//     value: "Processing",
//   },
//   {
//     label: "Pending",
//     value: "Pending",
//   },
//   {
//     label: "Delivered",
//     value: "Delivered",
//   },
//   {
//     label: "Cancelled",
//     value: "Cancelled",
//   },
// ];
SellDetails.layout = CustomerDashboardLayout;

export default SellDetails;
