// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import React from "react";
import FlexBox from "../components/FlexBox";
import DashboardLayout from "@component/layout/FooterLayout";

import Login from "../components/sessions/Login";

const LoginPage = () => {
  return (
    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
      {/* <DashboardPageHeader /> */}
      <Login />
    </FlexBox>
  );
};
LoginPage.layout = DashboardLayout;

export default LoginPage;
