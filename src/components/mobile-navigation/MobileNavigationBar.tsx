import { Chip } from "@component/Chip";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { Customer_Order_Pending_Details } from "@data/constants";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Icon from "../icon/Icon";
import NavLink from "../nav-link/NavLink";
import StyledMobileNavigationBar from "./MobileNavigationBar.style";

const MobileNavigationBar: React.FC = () => {
  const width = useWindowSize();


  const [productQuantity, setProductQuantity] = useState(0);
  const { state } = useAppContext();
  const cartCanged = state.cart.chartQuantity;

  useEffect(() => {
    const { order_Id } = useUserInf()

    if (order_Id) {
      fetch(`${Customer_Order_Pending_Details}${order_Id}`)
        .then((res) => res.json())
        .then((data) => {
          setProductQuantity(data?.order?.order_items?.length);
        }).catch(() => { });
    }
  }, [cartCanged]);

  return (
    width <= 900 && (
      <StyledMobileNavigationBar>
        {list.map((item) => (
          <NavLink className="link" href={item.href} key={item.title}>
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
    )
  );
};

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
    title: "Account",
    icon: "user-2",
    href: "/profile",
  },
];

export default MobileNavigationBar;
