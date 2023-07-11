// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import React from "react";
import FlexBox from "../components/FlexBox";
import Signup from "../components/sessions/Signup";
import DashboardLayout from "@component/layout/FooterLayout";

const SignUpPage = () => {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      {/* <DashboardPageHeader /> */}

      <Signup />
    </FlexBox>
  );
};
SignUpPage.layout = DashboardLayout;

export default SignUpPage;
