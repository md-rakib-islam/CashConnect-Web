import { orders_By_Customer_Id } from "@data/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import DashboardPageHeader from "../layout/DashboardPageHeader";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";
import { H5 } from "../Typography";
import OrderRow from "./OrderRow";

export interface CustomerOrderListProps {}

const CustomerOrderList: React.FC<CustomerOrderListProps> = () => {
  const [ordersList, setorderList] = useState([]);

  // try {
  var UserId: any = localStorage?.getItem("UserId");
  // } catch (err) {
  //   UserId = 0;
  // }

  // try {
  var authTOKEN = {
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("jwt_access_token"),
    },
  };
  // } catch (err) {
  //   authTOKEN = null;
  // }

  useEffect(() => {
    axios
      .get(`${orders_By_Customer_Id}${UserId}`, authTOKEN)
      .then((orders: any) => {
        console.log("orderRes", orders);
        let Orders = [];
        orders?.data?.map((order) => {
          let Order: any = {};
          Order.order_no = order.order_no;
          Order.order_status = order.order_status;
          Order.paid_at = order.paid_at;
          Order.net_amount = order.net_amount;
          Order.href = `/orders/${order.id}`;

          Orders.push(Order);
        });
        setorderList(Orders);
        console.log("Orders", Orders);
      });
  }, [UserId]);

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

      {ordersList.map((item, ind) => (
        <OrderRow item={item} key={ind} />
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox>
    </div>
  );
};

export default CustomerOrderList;
