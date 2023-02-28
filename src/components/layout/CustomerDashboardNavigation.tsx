import Box from "@component/Box";
import useWindowSize from "@hook/useWindowSize";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import { H5 } from "../Typography";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";

const CustomerDashboardNavigation = () => {
  const { pathname } = useRouter();

  const Router = useRouter();

  const width = useWindowSize();
  const isMobile = width < 769;

  const handleLogout = () => {
    localStorage.removeItem("UserId");
    localStorage.removeItem("jwt_access_token");
    sessionStorage.removeItem("fbssls_5515163185212209");
    localStorage.removeItem("OrderId");
    localStorage.removeItem("userType");

    // dispatch({
    //   type: "CHANGE_ALERT",
    //   payload: {
    //     alertValue: "logout success",
    //   }
    // })
    Router.push("/");
  };

  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900">
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <H5 p="26px 30px 1rem" color="text.muted" fontSize="14px">
            {item.title}
          </H5>
          {item.list.map((item) => {
            return !isMobile && item.title === "Log Out" ? null : (
              <StyledDashboardNav
                isCurrentPath={pathname.includes(item.href)}
                href={item.href}
                key={item.title}
                px="1.5rem"
                mb="1.25rem"
                onClick={() => {
                  if (item.title === "Log Out") {
                    handleLogout();
                  }
                }}
              >
                <FlexBox alignItems="center">
                  <Box className="dashboard-nav-icon-holder">
                    <Icon variant="small" defaultcolor="currentColor" mr="10px">
                      {item.iconName}
                    </Icon>
                  </Box>

                  <H5 className="dashboard-nav-title">{item.title}</H5>
                </FlexBox>
              </StyledDashboardNav>
            );
          })}
        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
};

const linkList = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/orders",
        title: "Orders",
        iconName: "bag",
        count: 5,
      },
      {
        href: "/wish-list",
        title: "Wishlist",
        iconName: "heart",
        count: 19,
      },
      {
        href: "/support-tickets",
        title: "Support Tickets",
        iconName: "customer-service",
        count: 1,
      },
      {
        href: "/new-sell",
        title: "New Sell",
        iconName: "upload",
      },
      {
        href: "/sells",
        title: "Sells",
        iconName: "shopping-cart",
        count: 40,
      },
    ],
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      {
        href: "/profile",
        title: "Profile Info",
        iconName: "user",
        count: 3,
      },
      {
        href: "/address",
        title: "Addresses",
        iconName: "pin",
        count: 16,
      },
      {
        href: "/payment-methods",
        title: "Payment Methods",
        iconName: "credit-card",
        count: 4,
      },
      {
        href: "",
        title: "Log Out",
        iconName: "logout",
      },
    ],
  },
];

export default CustomerDashboardNavigation;
