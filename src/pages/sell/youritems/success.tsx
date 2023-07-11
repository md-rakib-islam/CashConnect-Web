import Box from "@component/Box";
import Button from "@component/buttons/Button";
import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { useRouter } from "next/router";
import React from "react";

function success() {
  const router = useRouter();

  const clicked = () => {
    router.push("/");
  };
  return (
    <>
      <DashboardPageHeader
        title="Success Sell"
        iconName="bag_filled"
        button={
          <Button
            onClick={clicked}
            color="primary"
            bg="primary.light"
            px="2rem"
          >
            Go Home
          </Button>
        }
      />
      <Box
        boxShadow="1px 1px 5px 2px #ababab"
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "80px",
            textShadow: "1px 1px 0.5px black",
          }}
        >
          <h2 style={{ fontWeight: 600 }}>
            <b
              style={{
                color: "green",
                fontSize: "28px",
                textShadow: "1px 1px 0.5px green",
              }}
            >
              Thanks,
            </b>{" "}
            <br /> Your request has been submitted, <br /> our expert will
            contact with you.
          </h2>
        </div>
      </Box>
    </>
  );
}

success.layout = CustomerDashboardLayout;
export default success;
