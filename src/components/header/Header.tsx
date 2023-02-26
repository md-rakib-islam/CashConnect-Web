import IconButton from "@component/buttons/IconButton";
import Image from "@component/Image";
import Menu from "@component/Menu";
import MenuItem from "@component/MenuItem";
import Navbar from "@component/navbar/Navbar";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  BASE_URL,
  Customer_Order_Pending_Details,
  Site_Setting_All,
  User_By_Id,
} from "@data/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import MiniCart from "../mini-cart/MiniCart";
import SearchBox from "../search-box/SearchBox";
import Sidenav from "../sidenav/Sidenav";
import Typography, { H5, Tiny2 } from "../Typography";
import StyledHeader from "./HeaderStyle";

type HeaderProps = {
  // isFixed?: boolean;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const [_reRender, setReRender] = useState(0);

  const { dispatch } = useAppContext();

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [productQuantity, setProductQuantity] = useState<any>();
  const { state } = useAppContext();

  const cartCanged = state.cart.chartQuantity;

  const { isLogin, order_Id } = useUserInf();
  const [preViewImg, setpreViewImg] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (order_Id) {
      axios
        .get(`${Customer_Order_Pending_Details}${order_Id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("jwt_access_token"),
          },
        })
        .then((res) => {
          setProductQuantity(
            res?.data?.order?.order_items?.find(
              (e: { quantity: any }) => e.quantity
            )
          );
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [cartCanged, order_Id]);

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
  useEffect(() => {
    if (isLogin) {
      axios
        .get(`${User_By_Id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("jwt_access_token"),
          },
        })
        .then((res) => {
          console.log("resUseerForHeader", preViewImg);
          setfirst_name(res?.data?.first_name);
          setlast_name(res?.data?.last_name);
          setpreViewImg(
            `${res?.data?.image ? BASE_URL : "/no_image.png"}${
              res?.data?.image ? res?.data?.image : ""
            }`
          );
          console.log("resUseerForHeader", preViewImg);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [isLogin]);

  const handleLogout = () => {
    localStorage.removeItem("UserId");
    localStorage.removeItem("jwt_access_token");
    sessionStorage.removeItem("fbssls_5515163185212209");
    localStorage.removeItem("OrderId");
    localStorage.removeItem("userType");

    window.dispatchEvent(new CustomEvent("storage", { detail: "" }));

    dispatch({
      type: "CHANGE_ALERT",
      payload: {
        alertValue: "logout success...",
        alerType: "successLogin",
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
    router.replace({
      pathname: "/login",
    });
  };

  try {
    var userID: string = localStorage.getItem("UserId");
  } catch (err) {
    var userID = "";
  }
  useEffect(() => {
    setReRender(Math.random());
  }, [userID]);

  console.log("productQuantity", productQuantity?.quantity);
  const cartHandle = (
    <FlexBox ml="20px" alignItems="flex-start">
      <IconButton bg="gray.200" p="12px">
        <Icon style={{ color: "#e84262" }} size="20px">
          bag
        </Icon>
      </IconButton>
      {/* this Tiny2 component is a customized version of Tiny */}

      <Tiny2 color="white" fontWeight="600"></Tiny2>
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

            {/* {isFixed && (
              <div className="category-holder">
                <Categories>
                  <FlexBox color="text.hint" alignItems="center" ml="1rem">
                    <Icon>categories</Icon>
                    <Icon>arrow-down-filled</Icon>
                  </FlexBox>
                </Categories>
              </div>
            )} */}
          </FlexBox>

          <FlexBox justifyContent="center" flex="1 1 0">
            <SearchBox />
          </FlexBox>

          <FlexBox className="header-right" alignItems="center">
            {!isLogin ? (
              <IconButton onClick={login} ml="1rem" bg="gray.200" p="8px">
                <Icon style={{ color: "#e84262" }} size="28px">
                  user
                </Icon>
              </IconButton>
            ) : (
              <>
                <H5
                  className="header-name"
                  ml={"1rem"}
                  my="0px"
                >{`${first_name} ${last_name}`}</H5>
                <Menu
                  direction="left"
                  handler={
                    <IconButton ml="1rem" bg="gray.200" p="8px">
                      <Icon style={{ color: "#e84262" }} size="25px">
                        settingsAccount
                      </Icon>
                    </IconButton>
                  }
                >
                  {/* <MenuItem p="2px">
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
                      <Avatar src={preViewImg} size={40} />
                      
                    </div>
                  </MenuItem> */}
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
                      <Icon style={{ color: "#e84262" }} size="30px" ml="5px">
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
                      <Icon style={{ color: "#e84262" }} size="23px" ml="8px">
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
                  <Icon style={{ color: "#e84262" }} size="25px">
                    register
                  </Icon>
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
      <Navbar navListOpen={false} />
    </>
  );
};

export default Header;

export const CustomMenu = styled(Menu)``;
