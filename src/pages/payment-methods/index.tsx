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
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { BASE_URL, Customer_Payment_Methods_By_Customer_Id, Customer_Payment_Method_Delete, Mayment_Mathod_All } from "@data/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AddressList = () => {

  const [paymentmethods, setPaymentmethods] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [totalPaymentMathod, setTotalPaymentMathod] = useState(0)

  const [reloadMethod, setReloadMethod] = useState(0)

  const router = useRouter()
  const { page, size } = router.query

  const { dispatch } = useAppContext()

  const { user_id, authTOKEN } = useUserInf()

  useEffect(() => {
    console.log("url", `${Mayment_Mathod_All}?page=${page || 1}&size=${size || 10}`)
    axios.get(`${Customer_Payment_Methods_By_Customer_Id}${user_id}?page=${page || 1}&size=${size || 10}`).then(res => {
      console.log("Mayment_Mathod_All", res)
      setPaymentmethods(res?.data?.customer_payment_methods)
      setTotalPage(res?.data?.total_pages)
      setTotalPaymentMathod(res?.data?.total_elements)
    }).catch(() => { })
  }, [page, size, reloadMethod])

  const handleDelete = (id, cardName) => {
    axios.delete(`${Customer_Payment_Method_Delete}${id}`, authTOKEN).then(res => {
      console.log("Customer_Payment_Method_DeleteRes", res)
      setReloadMethod(Math.random())
      dispatch({
        type: "CHANGE_ALERT",
        payload: {
          alertValue: `${cardName} deleted`,
          alerType: "success",
          alertShow: true,
          alertChanged: Math.random()
        }
      })
    }).catch(() => {
      dispatch({
        type: "CHANGE_ALERT",
        payload: {
          alertValue: "sumthing went wrong",
          alerType: "error",
          alertShow: true,
          alertChanged: Math.random()
        }
      })
    })
    console.log(id)
  }

  console.log("paymentmethods", paymentmethods)

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

      {paymentmethods?.map((item, id) => (
        <TableRow key={id} my="1rem" padding="6px 18px">
          <FlexBox alignItems="center" m="6px">
            <Card width="42px" height="28px" mr="10px" elevation={4}>
              <img
                width="100%"
                src={`${BASE_URL}${item?.image}`}
                alt={item.card_holder}
              />
            </Card>
            <H5 className="pre" m="6px">
              {item?.card_holder}
            </H5>
          </FlexBox>
          <Typography className="pre" m="6px">
            {item?.card_number}
          </Typography>
          <Typography className="pre" m="6px">
            {/* {format(new Date(item?.expiry_date), "MMM dd, yyyy")} */}
            {item?.expiry_date}
          </Typography>

          <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={`/payment-methods/${item?.id}`}>
              <Typography
                as="a"
                href={`/payment-methods/${item?.id}`}
                color="inherit"
              >
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small" onClick={() => handleDelete(item.id, item?.card_holder)}>
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
