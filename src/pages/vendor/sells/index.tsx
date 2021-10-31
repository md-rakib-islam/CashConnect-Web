import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import VendorPurchaseList from "@component/orders/VendorPurchaseList";
import React from "react";

const Orders = () => {
  return (
    <div>
      <DashboardPageHeader title="Sells" iconName="bag_filled" />
      <VendorPurchaseList />
    </div>
  );
};

Orders.layout = VendorDashboardLayout;

export default Orders;
