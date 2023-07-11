import FlexBox from "@component/FlexBox";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Otp from "@component/sessions/Otp";
import React from "react";
import DashboardLayout from "@component/layout/FooterLayout";

const OptPage = () => {
  return (
    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
      <DashboardPageHeader />

      <Otp />
    </FlexBox>
  );
};
OptPage.layout = DashboardLayout;

export default OptPage;
