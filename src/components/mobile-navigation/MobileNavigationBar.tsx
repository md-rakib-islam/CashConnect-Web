import { Chip } from "@component/Chip";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { Customer_Order_Pending_Details } from "@data/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Icon from "../icon/Icon";
import NavLink from "../nav-link/NavLink";
import StyledMobileNavigationBar from "./MobileNavigationBar.style";

const MobileNavigationBar: React.FC = () => {
  const width = useWindowSize();
  const [_reRender, setReRender] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const { state } = useAppContext();
  const cartCanged = state.cart.chartQuantity;

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { order_Id, isLogin } = useUserInf();

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleLoadingComplete);
  }, [router.events]);

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
          setProductQuantity(res?.data?.order?.order_items?.length);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [cartCanged, order_Id]);

  try {
    var userID: string = localStorage.getItem("UserId");
  } catch (err) {
    var userID = "";
  }
  useEffect(() => {
    setReRender(Math.random());
  }, [userID]);

  const profileUrl = isLogin ? "/profile" : "/login";

  const list = [
    {
      title: "Home",
      icon: "home",
      href: "/",
    },
    {
      title: "Category",
      icon: "category",
      href: "/mobile-category-nav",
    },
    {
      title: "Cart",
      icon: "bag",
      href: "/cart",
    },
    {
      title: isLogin ? "Account" : "login",
      icon: "user-2",
      href: profileUrl,
    },
  ];

  return (
    width <= 900 && (
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
                height: "50px",
                width: "50px",
                marginTop: "100pz",
              }}
              src="/assets/images/gif/loading.gif"
            />
          </div>
        )}
        <StyledMobileNavigationBar>
          {list.map((item) => (
            <NavLink
              className="link"
              href={item.href}
              key={item.title}
              onClick={() => {
                if (item?.title === "Home") {
                  setLoading(true);
                }
              }}
            >
              <Icon className="icon" variant="small">
                {item.icon}
              </Icon>
              {item.title}

              {item.title === "Cart" && !!productQuantity && (
                <Chip
                  bg="primary.main"
                  position="absolute"
                  color="primary.text"
                  fontWeight="600"
                  px="0.25rem"
                  top="4px"
                  left="calc(50% + 8px)"
                >
                  {productQuantity || 0}
                </Chip>
              )}
            </NavLink>
          ))}
        </StyledMobileNavigationBar>
      </>
    )
  );
};

export default MobileNavigationBar;
