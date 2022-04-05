import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import React from 'react';
import NewSell from "../vendor/new-sell/index";

function Index() {
  return <NewSell />
}

Index.layout = CustomerDashboardLayout;

export default Index
