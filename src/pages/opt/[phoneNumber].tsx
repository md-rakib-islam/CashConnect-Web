import FlexBox from "@component/FlexBox";
import Otp from "@component/sessions/Otp";
import React from "react";

const OptPage = () => {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
<Otp/>    
</FlexBox>
  );
};

export default OptPage;
