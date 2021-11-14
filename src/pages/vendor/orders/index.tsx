import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import CustomerOrderList from "@component/orders/CustomerOrderList";
import React from "react";

const Orders = () => {
  return <CustomerOrderList />;
};

Orders.layout = VendorDashboardLayout;

export default Orders;
