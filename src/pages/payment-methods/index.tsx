import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import PaginationRow from "@component/pagination/PaginationRow";
import ShowingItemNumber from "@component/pagination/ShowingItemNumber";
import TableRow from "@component/TableRow";
import Typography, { H5, SemiSpan } from "@component/Typography";
import { Mayment_Mathod_All } from "@data/constants";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AddressList = () => {

  const [paymentmethods, setPaymentmethods] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [totalPaymentMathod, setTotalPaymentMathod] = useState(0)

  const router = useRouter()
  const {page, size} = router.query

  useEffect(() => {
    console.log("url", `${Mayment_Mathod_All}?page=${page || 1}&size=${size || 10}`)
    axios.get(`${Mayment_Mathod_All}?page=${page || 1}&size=${size || 10}`).then(res => {
      console.log("Mayment_Mathod_All", res)
      setPaymentmethods(res?.data?.paymentmethods)
      setTotalPage(res?.data?.total_pages)
      setTotalPaymentMathod(res?.data?.total_elements)
    }).catch(() => { })
  }, [page, size])

  return (
    <div>
      <DashboardPageHeader
        title="Payment Methods"
        iconName="credit-card_filled"
        button={
          <Link href="/payment-methods/add">
            <a>
              <Button color="primary" bg="primary.light" px="2rem">
                Add New Payment Method
              </Button>
            </a>
          </Link>
        }
      />

      {paymentmethods.map((item, id) => (
        <TableRow key={id} my="1rem" padding="6px 18px">
          <FlexBox alignItems="center" m="6px">
            <Card width="42px" height="28px" mr="10px" elevation={4}>
              <img
                width="100%"
                src={`/assets/images/payment-methods/Mastercard.svg`}
                alt={item.payment_method}
              />
            </Card>
            <H5 className="pre" m="6px">
              {item?.name}
            </H5>
          </FlexBox>
          <Typography className="pre" m="6px">
          1234 **** **** ****
          </Typography>
          <Typography className="pre" m="6px">
            {format(new Date(item?.created_at), "MMM dd, yyyy")}
          </Typography>

          <Typography className="pre" textAlign="center" color="text.muted">
            <Link href="/payment-methods/xkssThds6h37sd">
              <Typography
                as="a"
                href="/payment-methods/xkssThds6h37sd"
                color="inherit"
              >
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
          </Typography>
        </TableRow>
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing <ShowingItemNumber initialNumber={10} totalItem={totalPaymentMathod} /> of {totalPaymentMathod} Payment Mathods</SemiSpan>

        <Pagination pageCount={totalPage} />

        <PaginationRow product_per_page_option={product_per_page_options} name="Payment Mathod" />
      </FlexBox>
    </div>
  );
};

const product_per_page_options = [
  { id: 10, name: 10 },
  { id: 30, name: 30 },
  { id: 50, name: 50 },
]

// const orderList = [
//   {
//     orderNo: "1050017AS",
//     exp: "08 / 2022",
//     payment_method: "Amex",
//     card_no: "1234 **** **** ****",
//   },
//   {
//     orderNo: "1050017AS",
//     exp: "10 / 2025",
//     payment_method: "Mastercard",
//     card_no: "1234 **** **** ****",
//   },
//   {
//     orderNo: "1050017AS",
//     exp: "N/A",
//     payment_method: "PayPal",
//     card_no: "ui-lib@email.com",
//   },
//   {
//     orderNo: "1050017AS",
//     exp: "08 / 2022",
//     payment_method: "Visa",
//     card_no: "1234 **** **** ****",
//   },
// ];

AddressList.layout = DashboardLayout;

export default AddressList;
