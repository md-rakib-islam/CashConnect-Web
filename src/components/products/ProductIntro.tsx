import Currency from "@component/Currency";
import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  BASE_URL, Check_Stock, Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Create,
  Customer_Order_Item_By_Product_Id,
  Customer_Order_Remove_Item,
  Multiple_Image_By_Id
} from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactImageMagnify from 'react-image-magnify';
import styled from "styled-components";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Rating from "../rating/Rating";
import { H1, H2, H3, H6, SemiSpan } from "../Typography";

export interface ProductIntroProps {
  imgUrl?: string[];
  title: string;
  price: number;
  id?: string | number;
  brand?: string | number;
  reviewCount?: string | number;
  rating?: number;
  condition: string;
  orginalrice?: number;
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  imgUrl,
  title,
  price,
  id,
  brand,
  reviewCount,
  rating,
  condition,
  orginalrice
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const { state, dispatch } = useAppContext();
  const router = useRouter();

  var routerId = router.query?.id as string;

  const [cartQuantity, setCartQuantity] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [getItemId, setGetItemId] = useState(0);
  const [openLogin, setOpenLogin] = useState(false)
  const [multipleUmg, setMultipleUmg] = useState(imgUrl)
  const [stock, setStock] = useState(true)
  const [_reRender, setreRender] = useState(0)

  const cartCanged = state.cart.chartQuantity;

  const { user_id, order_Id, isLogin, authTOKEN } = useUserInf()

  const width = useWindowSize();
  const isMobile = width < 769;

  const closeLoginTab = () => {
    setOpenLogin(false)
  }

  useEffect(() => {
    axios.get(`${Check_Stock}${id}`).then(res => {
      console.log("res.data.is_in_stock", res.data.is_in_stock)
      if (!res.data.is_in_stock) {
        setStock(false)
      }
    }).catch(() => { console.log("errr") })
  }, [])

  useEffect(() => {
    setMultipleUmg(imgUrl)
    setreRender(Math.random())
  }, [imgUrl])

  useEffect(() => {
    axios.get(`${Multiple_Image_By_Id}${id}`).then(res => {
      console.log("multipleImage", res.data?.product_images)
      let images = []

      images.push(imgUrl)

      res.data?.product_images?.map(data => {
        if (data?.image) {
          images.push(`${BASE_URL}${data?.image}`)
        }
      })
      setMultipleUmg(images)
    }).catch((err) => { console.log("error", err) })
  }, [imgUrl])

  useEffect(() => {
    if (id) {
      if (order_Id) {
        axios
          .get(`${Customer_Order_Item_By_Product_Id}${order_Id}/${id}`)
          .then((item) => {
            console.log("item", item.data.order_item);
            setItemId(item.data.order_item.id);
            setCartQuantity(item.data.order_item.quantity);
          })
          .catch(() => setCartQuantity(0));
      }
    }
  }, [getItemId, id, cartCanged]);

  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  };

  const handleCartAmountChange = (amount, action) => {

    if (isLogin) {
      const dateObj: any = new Date();
      const currentDate =
        dateObj.getFullYear() +
        "-" +
        (dateObj.getMonth() + 1).toString().padStart(2, 0) +
        "-" +
        dateObj.getDate().toString().padStart(2, 0);

      const orderData = {
        product: id || routerId,
        quantity: 1,
        price: price,
        order_date: currentDate,
        branch: 4,
        user: user_id,
      };

      //addToCart
      if (action == "addToCart") {
        console.log("orderData", orderData);
        axios.post(`${Customer_Order_Create}`, orderData, authTOKEN).then((res) => {
          console.log("orderRes", res);

          localStorage.setItem("OrderId", res.data.order_details.id);
          setGetItemId(Math.random());
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: { chartQuantity: Math.random(), prductId: id || routerId },
          });
        }).catch(() => {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alerType: "error",
              alertValue: "something went wrong",
            }
          })

        });
      }

      //increase quantity
      else if (action == "increase") {
        axios
          .put(`${Customer_Increase_Quantity}${order_Id}/${itemId}`, orderData, authTOKEN)
          .then((res) => {
            console.log("increaseRes", res);
            setGetItemId(Math.random());
            dispatch({
              type: "CHANGE_CART_QUANTITY",
              payload: { chartQuantity: Math.random(), prductId: id || routerId },
            });
          }).catch(() => {
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "error",
                alertValue: "something went wrong",
              }
            })
          });
      }

      //remove
      else if (amount == 0 && action == "decrease") {
        axios
          .delete(`${Customer_Order_Remove_Item}${order_Id}/${itemId}`, authTOKEN)
          .then((res) => {
            console.log("removeRes", res);
            setGetItemId(Math.random());
            dispatch({
              type: "CHANGE_CART_QUANTITY",
              payload: { chartQuantity: Math.random(), prductId: id || routerId },
            });
          }).catch(() => {
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "error",
                alertValue: "something went wrong",
              }
            })
          });
      }

      //decrease quantity
      else if (action == "decrease") {
        axios
          .put(`${Customer_decrease_Quantity}${order_Id}/${itemId}`, orderData, authTOKEN)
          .then((res) => {
            console.log("decreaseRes", res);
            setGetItemId(Math.random());
            dispatch({
              type: "CHANGE_CART_QUANTITY",
              payload: { chartQuantity: Math.random(), prductId: id || routerId },
            });
          }).catch(() => {
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "error",
                alertValue: "something went wrong",
              }
            })
          });
      }

    }
    else {
      if (isMobile) {
        localStorage.setItem("backAfterLogin", `/product/${id}`);
        router.push("/login")
      }
      else {
        setOpenLogin(true)
      }
    }
  };


  return (
    <>
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />
      <Box overflow="visible">
        <Grid container justifyContent="center" spacing={16}>
          <Grid item md={6} xs={12} alignItems="center">
            <Box>
              <FlexBox justifyContent="center" mb="50px" >
                <div style={{ width: "300px", height: "auto" }}>
                  <StyledReactImageMagnify {...{
                    smallImage: {
                      alt: 'Wristwatch by Ted Baker London',
                      isFluidWidth: true,
                      src: multipleUmg[selectedImage],
                    },
                    largeImage: {
                      src: multipleUmg[selectedImage],
                      width: 2000,
                      height: 2000,
                      style: { backgroundColor: "black" },
                    },
                    enlargedImageContainerDimensions: {
                      width: '250%',
                      height: '150%',
                    },
                    enlargedImageContainerStyle: {
                      zIndex: "100",
                    },
                    enlargedImageClassName: "largeImageContainer"
                  }} />
                </div>

              </FlexBox>
              <FlexBox overflow="auto">
                {multipleUmg.map((url, ind) => (
                  <Box
                    size={70}
                    minWidth={70}
                    bg="white"
                    borderRadius="10px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                    border="1px solid"
                    key={ind}
                    ml={ind === 0 && "auto"}
                    mr={ind === multipleUmg.length - 1 ? "auto" : "10px"}
                    borderColor={
                      selectedImage === ind ? "primary.main" : "gray.400"
                    }
                    onClick={handleImageClick(ind)}
                  >
                    <Avatar src={url} borderRadius="10px" size={40} />
                  </Box>
                ))}
              </FlexBox>
            </Box>
          </Grid>

          <Grid item md={6} xs={12} alignItems="center">
            <H1 mb="0.8rem">{title}</H1>

            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Condition:</SemiSpan>
              <H6 ml="8px">{condition || "_"}</H6>
            </FlexBox>

            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Brand:</SemiSpan>
              <H6 ml="8px">{brand || ""}</H6>
            </FlexBox>

            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Rated:</SemiSpan>
              <Box ml="8px" mr="8px">
                <Rating color="warn" value={rating} outof={5} />
              </Box>
              <H6>({reviewCount})</H6>
            </FlexBox>

            <Box mb="24px">
              {!!orginalrice && (
                <H2 color="text.muted" mb="4px" lineHeight="1">
                  <del><Currency>{orginalrice}</Currency></del>
                </H2>
              )}
              <H2 color="primary.main" mb="4px" lineHeight="1">
                <Currency>{Number(price).toFixed(2)}</Currency>
              </H2>
              {stock ? (
                <SemiSpan color="inherit">Stock Available</SemiSpan>
              ) : (
                <SemiSpan fontWeight="bold" ml="5px" color="primary.main">Out Of Stock</SemiSpan>
              )}

            </Box>

            {!cartQuantity ? (
              <Button
                disabled={!stock}
                variant="contained"
                size="small"
                color="primary"
                mb="36px"
                onClick={() => handleCartAmountChange(1, "addToCart")}
              >
                Add to Cart
              </Button>
            ) : (
              <FlexBox alignItems="center" mb="36px">
                <Button
                  p="9px"
                  variant="outlined"
                  size="small"
                  color="primary"
                  // disabled={!stock}
                  onClick={() =>
                    handleCartAmountChange(cartQuantity - 1, "decrease")
                  }
                >
                  <Icon variant="small">minus</Icon>
                </Button>
                <H3 fontWeight="600" mx="20px">
                  {cartQuantity.toString().padStart(2, "0")}
                </H3>
                <Button
                  p="9px"
                  variant="outlined"
                  size="small"
                  color="primary"
                  disabled={!stock}
                  onClick={() =>
                    handleCartAmountChange(cartQuantity + 1, "increase")
                  }
                >
                  <Icon variant="small">plus</Icon>
                </Button>
              </FlexBox>
            )}

            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Sold By:</SemiSpan>
              <Link href="/shop/fdfdsa">
                <a>
                  <H6 lineHeight="1" ml="8px">
                    Local Store
                  </H6>
                </a>
              </Link>
            </FlexBox>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export const StyledReactImageMagnify = styled(ReactImageMagnify)`
  .largeImageContainer {
    background: white;
  }
  `

// ProductIntro.defaultProps = {
//   imgUrl: [
//     "",
//     "/assets/images/products/hiclipart.com (16).png",
//     "/assets/images/products/hiclipart.com (18).png",
//   ],
//   title: "Mi Note 11 Pro",
//   price: 1100,
// };

export default ProductIntro;
