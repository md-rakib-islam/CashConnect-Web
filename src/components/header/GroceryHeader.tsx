import IconButton from "@component/buttons/IconButton";
import GrocerySearchBox from "@component/search-box/GrocerySearchBox";
import { Tiny2 } from "@component/Typography";
import { BASE_URL, Site_Setting_All } from "@data/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import MiniCart from "../mini-cart/MiniCart";
import Login from "../sessions/Login";
import Sidenav from "../sidenav/Sidenav";
import StyledHeader from "./HeaderStyle";
import UserLoginDialog from "./UserLoginDialog";

type HeaderProps = {
  isFixed?: boolean;
  className?: string;
};

const GroceryHeader: React.FC<HeaderProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const [logo, setLogo] = useState("")

  useEffect(() => {
    fetch(`${Site_Setting_All}`).then(res => res.json()).then(res => {
      console.log("SiteSettingRes", res.general_settings[0])
      setLogo(res.general_settings[0].logo)
    })
  }, [])

  const cartHandle = (
    <FlexBox ml="20px" alignItems="flex-start">
      <IconButton bg="gray.200" p="12px">
        <Icon size="20px">bag</Icon>
      </IconButton>

      {
        <FlexBox
          borderRadius="300px"
          bg="error.main"
          px="5px"
          py="2px"
          alignItems="center"
          justifyContent="center"
          ml="-1rem"
          mt="-9px"
        >
          {/* this Tiny2 component is a customized version of Tiny */}
          <Tiny2 color="white" fontWeight="600"></Tiny2>
        </FlexBox>
      }
    </FlexBox>
  );

  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <a>
              <img src={`${BASE_URL}${logo}`} alt="logo" height="35" width="100" style={{ borderRadius: "50%" }} />
            </a>
          </Link>
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <GrocerySearchBox />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          <UserLoginDialog
            handle={
              <IconButton ml="1rem" bg="gray.200" p="8px">
                <Icon size="28px">user</Icon>
              </IconButton>
            }
          >
            <Box>
              <Login />
            </Box>
          </UserLoginDialog>

          <Sidenav
            handle={cartHandle}
            position="right"
            open={open}
            width={380}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default GroceryHeader;
