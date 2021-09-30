import Avatar from "@component/avatar/Avatar";
import FlexBox from "@component/FlexBox";
import LazyImage from "@component/LazyImage";
import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  BASE_URL,
  Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Pending_Details,
  Customer_Order_Remove_Item,
  notFoundImg
} from "@data/constants";
// import { CartItem } from "@reducer/cartReducer";
import axios from "axios";
import Link from "next/link";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Button from "../buttons/Button";
import Divider from "../Divider";
import Icon from "../icon/Icon";
import Typography, { H5, Paragraph, Tiny } from "../Typography";
import { StyledMiniCart } from "./MiniCartStyle";

type MiniCartProps = {
  toggleSidenav?: () => void;
};

type CartItem = {
  id: any;
  quantity: any;
  price: any;
  product: any;
};

const MiniCart: React.FC<MiniCartProps> = ({ toggleSidenav }) => {
  const { dispatch } = useAppContext();
  const [cartProductList, setCartProductList] = useState([]);
  const [reloadCart, setReloadCart] = useState(0);
  const [openLogin, setOpenLogin] = useState(false)

  const closeLoginTab = () => {
    setOpenLogin(false)
  }

  const handleCartAmountChange = useCallback(
    (product, action) => () => {
      const { user_id, order_Id, isLogin } = useUserInf()

      if (isLogin) {
        const item_id = product?.id;
        const orderData = {
          product_id: product?.product?.id,
          quantity: 1,
          price: product?.price,
          branch_id: 1,
          user_id: user_id,
        };

        if (action == "remove") {
          axios
            .delete(`${Customer_Order_Remove_Item}${order_Id}/${item_id}`)
            .then(() => {
              setReloadCart(Math.random());
              dispatch({
                type: "CHANGE_CART_QUANTITY",
                payload: Math.random(),
              });
            });
        } else if (action == "increase") {
          axios
            .put(`${Customer_Increase_Quantity}${order_Id}/${item_id}`, orderData)
            .then(() => {
              setReloadCart(Math.random());
            });
        } else if (action == "decrease") {
          axios
            .put(`${Customer_decrease_Quantity}${order_Id}/${item_id}`, orderData)
            .then(() => {
              setReloadCart(Math.random());
            });
        }

      }
      else {
        setOpenLogin(true)
      }
    },
    []
  );

  const getTotalPrice = () => {
    return (
      cartProductList.reduce(
        (accumulator, item) =>
          accumulator + item.product?.unit_price * item.quantity,
        0
      ) || 0
    );
  };

  useEffect(() => {
    const { order_Id } = useUserInf()

    axios.get(`${Customer_Order_Pending_Details}${order_Id}`).then((res) => {
      setCartProductList(res.data.order.order_items);
      console.log("miniCartLisdt", res.data.order.order_items);
    });
  }, [reloadCart]);

  return (
    <>
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />
      <StyledMiniCart>
        <div className="cart-list">
          <FlexBox alignItems="center" m="0px 20px" height="74px">
            <Icon size="1.75rem">bag</Icon>
            <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
              {cartProductList.length} item
            </Typography>
          </FlexBox>

          <Divider />

          {!!!cartProductList.length && (
            <FlexBox
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="calc(100% - 80px)"
            >
              <LazyImage
                src="/assets/images/logos/shopping-bag.svg"
                width="90px"
                height="100%"
              />
              <Paragraph
                mt="1rem"
                color="text.muted"
                textAlign="center"
                maxWidth="200px"
              >
                Your shopping bag is empty. Start shopping
              </Paragraph>
            </FlexBox>
          )}
          {cartProductList.map((item: CartItem) => (
            <Fragment key={item.id}>
              <div className="cart-item">
                <FlexBox alignItems="center" flexDirection="column">
                  <Button
                    variant="outlined"
                    color="primary"
                    padding="5px"
                    size="none"
                    borderColor="primary.light"
                    borderRadius="300px"
                    onClick={handleCartAmountChange(item, "increase")}
                  >
                    <Icon variant="small">plus</Icon>
                  </Button>
                  <Typography fontWeight={600} fontSize="15px" my="3px">
                    {item.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    padding="5px"
                    size="none"
                    borderColor="primary.light"
                    borderRadius="300px"
                    onClick={handleCartAmountChange(item, "decrease")}
                    disabled={item.quantity === 1}
                  >
                    <Icon variant="small">minus</Icon>
                  </Button>
                </FlexBox>

                <Link href={`/product/${item?.product?.id}`}>
                  <a>
                    <Avatar
                      src={
                        item?.product?.thumbnail
                          ? `${BASE_URL}${item?.product?.thumbnail}`
                          : notFoundImg
                      }
                      mx="1rem"
                      alt={item.product?.name}
                      size={76}
                    />
                  </a>
                </Link>

                <div className="product-details">
                  <Link href={`/product/${item.id}`}>
                    <a>
                      <H5 className="title" fontSize="14px">
                        {item.product?.name}
                      </H5>
                    </a>
                  </Link>
                  <Tiny color="text.muted" key={item.id}>
                    ${Number(item.product?.unit_price).toFixed(2)} x{" "}
                    {item.quantity}
                  </Tiny>
                  <Typography
                    fontWeight={600}
                    fontSize="14px"
                    color="primary.main"
                    mt="4px"
                  >
                    ${(item.quantity * item.product?.unit_price).toFixed(2)}
                  </Typography>
                </div>

                <Icon
                  className="clear-icon"
                  size="1rem"
                  ml="1.25rem"
                  onClick={handleCartAmountChange(item, "remove")}
                >
                  close
                </Icon>
              </div>
              <Divider />
            </Fragment>
          ))}
        </div>

        {!!cartProductList.length && (
          <Fragment>
            <Link href="/checkout">
              <Button
                variant="contained"
                color="primary"
                m="1rem 1rem 0.75rem"
                onClick={toggleSidenav}
              >
                <Typography fontWeight={600}>
                  Checkout Now (${getTotalPrice().toFixed(2)})
                </Typography>
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                color="primary"
                variant="outlined"
                m="0px 1rem 0.75rem"
                onClick={toggleSidenav}
              >
                <Typography fontWeight={600}>View Cart</Typography>
              </Button>
            </Link>
          </Fragment>
        )}
      </StyledMiniCart>
    </>
  );
};

MiniCart.defaultProps = {
  toggleSidenav: () => { },
};

export default MiniCart;
