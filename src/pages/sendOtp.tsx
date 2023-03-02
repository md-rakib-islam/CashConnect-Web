import FlexBox from "@component/FlexBox";
// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import React from "react";
import DashboardLayout from "@component/layout/FooterLayout";
import SendOtp from "@component/sessions/SendOtp";

const SendOtpPage = () => {
  return (
    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
      {/* <DashboardPageHeader /> */}
      <SendOtp />
    </FlexBox>
  );
};
SendOtpPage.layout = DashboardLayout;

export default SendOtpPage;
