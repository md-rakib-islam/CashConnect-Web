import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorPurchaseList from "@component/orders/VendorPurchaseList";
import React from "react";

const Sells = () => {
  return (
    <div>
      <DashboardPageHeader title="Sells" iconName="bag_filled" />
      <VendorPurchaseList />
    </div>
  );
};

Sells.layout = CustomerDashboardLayout;

export default Sells;
