import PaginationRow from "@component/pagination/PaginationRow";
import ShowingItemNumber from "@component/pagination/ShowingItemNumber";
import useUserInf from "@customHook/useUserInf";
import { orders_By_Customer_Id } from "@data/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import DashboardPageHeader from "../layout/DashboardPageHeader";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";
import { H5, SemiSpan } from "../Typography";
import OrderRow from "./OrderRow";

export interface CustomerOrderListProps { }

const CustomerOrderList: React.FC<CustomerOrderListProps> = () => {
  const [ordersList, setorderList] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  const { user_id, authTOKEN } = useUserInf()

  const router = useRouter()

  const { size, page } = router.query

  const product_per_page_options = [
    { id: 10, name: 10 },
    { id: 30, name: 30 },
    { id: 50, name: 50 },
  ]

  useEffect(() => {
    axios
      .get(`${orders_By_Customer_Id}${user_id}?size=${size || 10}&page=${page || 1}`, authTOKEN)
      .then((orders: any) => {
        console.log("orderRes", orders);
        let Orders = [];
        orders?.data?.orders?.map((order) => {
          let Order: any = {};
          Order.order_no = order.order_no;
          Order.order_status = order.order_status;
          Order.paid_at = order.paid_at;
          Order.net_amount = order.net_amount;
          Order.href = `/orders/${order.id}`;

          Orders.push(Order);
        });
        setorderList(Orders);
        setTotalOrder(orders?.data?.total_elements);
        setTotalPage(orders?.data?.total_pages);
        console.log("Orders", orders?.data?.orders);
      }).catch((err) => { console.log("error", err) });
  }, [user_id, size, page]);

  console.log("ordersList", ordersList);
  return (
    <div>
      <DashboardPageHeader title="My Orders" iconName="bag_filled" />

      <Hidden down={769}>
        <TableRow padding="0px 18px" boxShadow="none" bg="none">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Order #
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Status
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Date purchased
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Total
          </H5>
          <H5
            flex="0 0 0 !important"
            color="text.muted"
            px="22px"
            my="0px"
          ></H5>
        </TableRow>
      </Hidden>

      {ordersList?.map((item, ind) => (
        <OrderRow item={item} key={item?.id || ind} />
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing <ShowingItemNumber initialNumber={10} totalItem={totalOrder} /> of {totalOrder} Orders</SemiSpan>

        <Pagination pageCount={totalPage} />

        <PaginationRow product_per_page_option={product_per_page_options} name="Order" />
      </FlexBox>
    </div>
  );
};

export default CustomerOrderList;
