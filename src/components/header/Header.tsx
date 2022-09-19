import IconButton from "@component/buttons/IconButton";
import Image from "@component/Image";
import Menu from "@component/Menu";
import MenuItem from "@component/MenuItem";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { Site_Setting_All } from "@data/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Categories from "../categories/Categories";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import MiniCart from "../mini-cart/MiniCart";
import SearchBox from "../search-box/SearchBox";
import Sidenav from "../sidenav/Sidenav";
import Typography, { Tiny2 } from "../Typography";
import StyledHeader from "./HeaderStyle";

type HeaderProps = {
  isFixed?: boolean;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ isFixed, className }) => {
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const [_reRender, setReRender] = useState(0);

  const { dispatch } = useAppContext();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { isLogin } = useUserInf();

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleLoadingComplete);
  }, [router.events]);

  useEffect(() => {
    fetch(`${Site_Setting_All}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("SiteSettingRes", res.general_settings[0]);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("UserId");
    localStorage.removeItem("jwt_access_token");
    localStorage.removeItem("OrderId");
    localStorage.removeItem("userType");

    window.dispatchEvent(new CustomEvent("storage", { detail: "" }));

    dispatch({
      type: "CHANGE_ALERT",
      payload: {
        alertValue: "logout success",
      },
    });
    Router.push("/");
  };

  const Router = useRouter();

  const goToFrofile = () => {
    const user_type: string = localStorage.getItem("userType");
    if (user_type == "vendor") {
      Router.push("/vendor/dashboard");
    } else {
      Router.push("/profile");
    }
  };
  const login = () => {
    router
      .replace({
        pathname: "/login",
      })
      .then(() => router.reload());
  };

  try {
    var userID: string = localStorage.getItem("UserId");
  } catch (err) {
    var userID = "";
  }
  useEffect(() => {
    setReRender(Math.random());
  }, [userID]);

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
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: " rgb(0 0 0 / 50%)",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <img
            style={{
              height: "100px",
              width: "100px",
              marginTop: "100pz",
            }}
            src="/assets/images/gif/loading.gif"
          />
        </div>
      )}
      <StyledHeader className={className}>
        <Container
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="100%"
        >
          <FlexBox className="logo" alignItems="center" mr="1rem">
            <Link href="/">
              <a onClick={() => setLoading(true)}>
                <Image
                  src="/assets/images/logos/main_logo.png"
                  alt="logo"
                  height="45"
                  width="160px"
                />
              </a>
            </Link>

            {isFixed && (
              <div className="category-holder">
                <Categories>
                  <FlexBox color="text.hint" alignItems="center" ml="1rem">
                    <Icon>categories</Icon>
                    <Icon>arrow-down-filled</Icon>
                  </FlexBox>
                </Categories>
              </div>
            )}
          </FlexBox>

          <FlexBox justifyContent="center" flex="1 1 0">
            <SearchBox />
          </FlexBox>

          <FlexBox className="header-right" alignItems="center">
            {!isLogin ? (
              <IconButton onClick={login} ml="1rem" bg="gray.200" p="8px">
                <Icon size="28px">user</Icon>
              </IconButton>
            ) : (
              <>
                <Menu
                  direction="left"
                  handler={
                    <IconButton ml="1rem" bg="gray.200" p="8px">
                      <Icon size="25px">settingsAccount</Icon>
                    </IconButton>
                  }
                >
                  <MenuItem p="2px">
                    <div
                      style={{
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flexStart",
                        cursor: "pointer",
                      }}
                      onClick={() => goToFrofile()}
                    >
                      <Icon size="30px" ml="5px">
                        user
                      </Icon>
                      <Typography fontWeight="600" fontSize="16px" ml="5px">
                        Profile
                      </Typography>
                    </div>
                  </MenuItem>

                  <MenuItem p="2px">
                    <div
                      style={{
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flexStart",
                        cursor: "pointer",
                      }}
                      onClick={() => handleLogout()}
                    >
                      <Icon size="23px" ml="8px">
                        logout
                      </Icon>
                      <Typography fontWeight="600" fontSize="16px" ml="10px">
                        Logout
                      </Typography>
                    </div>
                  </MenuItem>
                </Menu>
              </>
            )}

            {!isLogin && (
              <Link href="/signup">
                <IconButton ml="1rem" bg="gray.200" p="8px">
                  <Icon size="25px">register</Icon>
                </IconButton>
              </Link>
            )}

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
    </>
  );
};

export default Header;

export const CustomMenu = styled(Menu)``;
