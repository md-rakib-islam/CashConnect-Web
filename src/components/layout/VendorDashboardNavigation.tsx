import Box from "@component/Box";
import useWindowSize from "@hook/useWindowSize";
import { useRouter } from "next/router";
import React from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";

const VendorDashboardNavigation = () => {
  const { pathname } = useRouter();

  const width = useWindowSize();
  const isMobile = width < 769;
  const Router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("UserId");
    localStorage.removeItem("jwt_access_token");
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
    <DashboardNavigationWrapper px="0px" py="1.5rem" color="gray.900">
      {linkList.map((item) => {
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
              <span>{item.title}</span>
            </FlexBox>
            {/* <span>{item.count}</span> */}
          </StyledDashboardNav>
        );
      })}
    </DashboardNavigationWrapper>
  );
};

const linkList = [
  {
    href: "/vendor/dashboard",
    title: "Dashboard",
    iconName: "board",
  },
  {
    href: "/vendor/products",
    title: "Products",
    iconName: "box",
    count: 300,
  },
  {
    href: "/vendor/new-sell",
    title: "New Sell",
    iconName: "upload",
  },
  {
    href: "/vendor/sells",
    title: "Sells",
    iconName: "shopping-cart",
    count: 40,
  },
  {
    href: "/vendor/orders",
    title: "Orders",
    iconName: "bag",
    count: 5,
  },
  {
    href: "/vendor/account-settings",
    title: "Account Settings",
    iconName: "gear-2",
  },
  {
    href: "",
    title: "Log Out",
    iconName: "logout",
  },
];

export default VendorDashboardNavigation;
