import FlexBox from "@component/FlexBox";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import React from "react";
import DashboardLayout from "@component/layout/FooterLayout";
import ResetPassword from "@component/sessions/ResetPassword";

const resetPassword = () => {
  return (
    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
      <DashboardPageHeader />
      <ResetPassword />
    </FlexBox>
  );
};
resetPassword.layout = DashboardLayout;

export default resetPassword;
