// import Carousel from "@component/carousel/Carousel";
import Carousel2 from "@component/carouselImg/Carousel2";
import Carousel3 from "@component/carouselImg2/Carousel3";
import Currency from "@component/Currency";
import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  BASE_URL,
  Check_Stock,
  Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Create,
  Customer_Order_Item_By_Product_Id,
  Customer_Order_Remove_Item,
  Multiple_Image_By_Id,
  Product_Detail_By_Id,
  Product_Discount_By_Id,
  Product_Size_By_Product_Id,
  // Product_Size_By_Product_Id,
} from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
// import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import styled from "styled-components";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Rating from "../rating/Rating";
import Typography, { H1, H2, H3, H6, SemiSpan } from "../Typography";

const parse = require("html-react-parser");

export interface ProductIntroProps {
  imgUrl?: string[];
  title: string;
  price: number;
  id?: string | number;
  brand?: string | number;
  reviewCount?: string | number;
  rating?: number;
  condition: string;
  short_desc: string;
  orginalprice?: number;
  parse: string;
  eye: boolean;
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  title,
  imgUrl,
  price,
  id,
  brand,
  reviewCount,
  rating,
  condition,
  short_desc,
  orginalprice,
  eye,
}) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  // const [visibleSlides, setVisibleSlides] = useState(6);

  const { state, dispatch } = useAppContext();
  const router = useRouter();

  var routerId = router.query?.id as string;

  console.log("orginalprice", orginalprice);

  const [cartQuantity, setCartQuantity] = useState(0);
  const [defaultCartQuantity, setDefaultCartQuantity] = useState(1);
  const [itemId, setItemId] = useState(0);
  const [getItemId, setGetItemId] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const [colorImages, setColorImages] = useState([]);
  const [multipleUmg, setMultipleUmg] = useState([]);
  const [_reRender, setreRender] = useState(0);
  const [discount, setDiscount] = useState();

  const [stock, setStock] = useState(true);
  const [stockQuantity, setStockQuantity] = useState();
  const [productCode, setProductCode] = useState("");
  const [color, setColor] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [visibleSlides, setVisibleSlides] = useState(5);

  // const [_reRender, setreRender] = useState(0);
  // const [multipleUmg, setMultipleUmg] = useState([]);

  // console.log("stockQuantity", stockQuantity);
  const cartCanged = state.cart.chartQuantity;

  const { user_id, order_Id, isLogin, authTOKEN } = useUserInf();

  const width = useWindowSize();
  const isMobile = width < 769;

  const closeLoginTab = () => {
    setOpenLogin(false);
  };
  useEffect(() => {
    if (width < 370) setVisibleSlides(4);
    else if (width < 650) setVisibleSlides(4);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  useEffect(() => {
    axios
      .get(`${Check_Stock}${id}`)
      .then((res) => {
        console.log("res.data.is_in_stock", res.data.in_stock);
        setStockQuantity(res.data.in_stock);
        if (res.data.is_in_stock === false) {
          setStock(false);
        }
      })
      .catch(() => {
        console.log("errr");
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${Product_Discount_By_Id}${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("jwt_access_token"),
        },
      })
      .then((res) => {
        console.log("ProductDiscount", res);
        setDiscount(res.data?.discounts?.discounted_price);
        //  if (res.data.discounts?.discounted_price) {
        //    setsellablePrice(res.data.discounts?.discounted_price);
        //    setorginalPrice(Number(res.data.discounts?.product.unit_price));
        //    setdiscountedPercent(res.data.discounts?.discount_percent);
        //  }
      });
  }, [id]);
  useEffect(() => {
    axios
      .get(`${Product_Detail_By_Id}${id}`)
      .then((res) => {
        console.log("res.data.code", res.data);

        setProductCode(res.data.product_code);
      })
      .catch(() => {
        console.log("errr");
      });
  }, [id]);

  useEffect(() => {
    // setMultipleUmg(imgUrl);
    setreRender(Math.random());
  }, [imgUrl]);

  useEffect(() => {
    axios
      .get(`${Multiple_Image_By_Id}${id}`)
      .then((res) => {
        console.log("multipleImage", res.data?.product_images);
        let images = [];
        let colors = [];
        let mainImg = [];

        // mainImg.push(imgUrl);

        res.data?.product_images?.map((data) => {
          if (data?.color) {
            images.push(`${BASE_URL}${data?.image}`);
          }
        });
        res.data?.product_images?.map((data) => {
          mainImg.push(`${BASE_URL}${data?.image}`);
        });
        res.data?.product_images?.map((data) => {
          if (data?.color?.name) {
            colors.push(data?.color);
          }
        });

        setColor(colors);
        setMultipleUmg(mainImg);
        setColorImages(images);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [id]);

  // for size
  useEffect(() => {
    axios
      .get(`${Product_Size_By_Product_Id}${id}`)
      .then((res) => {
        console.log("multipleSize", res.data.product_sizes[0]);
        let sizes = [];

        // images.push(imgUrl);

        res.data?.product_sizes[0]?.size.map((data) => {
          console.log("sizeData", data);

          sizes.push(data);
        });

        setSizes(sizes);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [id]);

  useEffect(() => {
    if (id) {
      if (order_Id) {
        axios
          .get(
            `${Customer_Order_Item_By_Product_Id}${order_Id}/${id}`,
            authTOKEN
          )
          .then((item) => {
            console.log("item", item.data.order_item);
            setItemId(item.data.order_item.id);
            setCartQuantity(item.data.order_item.quantity);
          })
          .catch(() => setCartQuantity(0));
      }
    }
  }, [order_Id, getItemId, id, cartCanged]);

  const handleThunmbnailClick = (ind) => () => {
    console.log("clickedImage", ind);
    setSelectedThumbnail(ind);
    setSelectedImage(0);
  };
  const handleImageClick = (ind) => () => {
    console.log("clickedImage", ind);
    setSelectedImage(ind);
    setSelectedThumbnail(ind);
  };
  const handleSizeClick = (ind) => () => {
    console.log("clickedSize", ind);
    setSelectedSize(ind);
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
        quantity: defaultCartQuantity,
        price: price,
        order_date: currentDate,
        branch: 1,
        color: color[selectedImage]?.id,
        size: sizes[selectedSize]?.id,

        user: user_id,
      };

      //addToCart
      if (action == "addToCart") {
        console.log("orderData", orderData);
        axios
          .post(`${Customer_Order_Create}`, orderData, authTOKEN)
          .then((res) => {
            console.log("orderRes", res);

            localStorage.setItem("OrderId", res.data.order_details.id);
            window.dispatchEvent(
              new CustomEvent("storage", {
                detail: { name: "setted order id" },
              })
            );
            setGetItemId(Math.random());
            dispatch({
              type: "CHANGE_CART_QUANTITY",
              payload: {
                chartQuantity: Math.random(),
                prductId: id || routerId,
              },
            });
          })
          .catch(() => {
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "error",
                alertValue: "something went wronggggg",
              },
            });
          });
      }

      //increase quantity
      else if (action == "increase") {
        axios
          .put(
            `${Customer_Increase_Quantity}${order_Id}/${itemId}`,
            orderData,
            authTOKEN
          )
          .then((res) => {
            console.log("increaseRes", res);
            setGetItemId(Math.random());
            dispatch({
              type: "CHANGE_CART_QUANTITY",
              payload: {
                chartQuantity: Math.random(),
                prductId: id || routerId,
              },
            });
          })
          .catch(() => {
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "error",
                alertValue: "something went wrong",
              },
            });
          });
      }

      //remove
      else if (amount == 0 && action == "decrease") {
        axios
          .delete(
            `${Customer_Order_Remove_Item}${order_Id}/${itemId}`,
            authTOKEN
          )
          .then((res) => {
            console.log("removeRes", res);
            setGetItemId(Math.random());
            dispatch({
              type: "CHANGE_CART_QUANTITY",
              payload: {
                chartQuantity: Math.random(),
                prductId: id || routerId,
              },
            });
          })
          .catch(() => {
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "error",
                alertValue: "something went wrong",
              },
            });
          });
      }

      //decrease quantity
      else if (action == "decrease") {
        axios
          .put(
            `${Customer_decrease_Quantity}${order_Id}/${itemId}`,
            orderData,
            authTOKEN
          )
          .then((res) => {
            console.log("decreaseRes", res);
            setGetItemId(Math.random());
            dispatch({
              type: "CHANGE_CART_QUANTITY",
              payload: {
                chartQuantity: Math.random(),
                prductId: id || routerId,
              },
            });
          })
          .catch(() => {
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "error",
                alertValue: "something went wrong",
              },
            });
          });
      }
    } else {
      if (isMobile) {
        localStorage.setItem("backAfterLogin", `/product/${id}`);
        router.push("/login");
      } else {
        // setOpenLogin(true);
        router.push("/login");
        localStorage.setItem("backAfterLogin", `/product/${id}`);
      }
    }
  };
  const handleBuyNow = (action) => {
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
        quantity: defaultCartQuantity,
        price: price,
        order_date: currentDate,
        branch: 1,
        color: color[selectedImage]?.id,
        size: sizes[selectedSize]?.id,
        user: user_id,
      };

      //addToCart
      if (action == "addToCart") {
        console.log("orderData", orderData);
        axios
          .post(`${Customer_Order_Create}`, orderData, authTOKEN)
          .then((res) => {
            console.log("orderRes", res);

            localStorage.setItem("OrderId", res.data.order_details.id);
            window.dispatchEvent(
              new CustomEvent("storage", {
                detail: { name: "setted order id" },
              })
            );
            setGetItemId(Math.random());
            dispatch({
              type: "CHANGE_CART_QUANTITY",
              payload: {
                chartQuantity: Math.random(),
                prductId: id || routerId,
              },
            });
            router.push("/checkout");
          })
          .catch(() => {
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alerType: "error",
                alertValue: "something went wrong",
              },
            });
          });
      }
    } else {
      if (isMobile) {
        localStorage.setItem("backAfterLogin", `/product/${id}`);
        router.push("/login");
      } else {
        // setOpenLogin(true);
        router.push("/login");
        localStorage.setItem("backAfterLogin", `/checkout`);
      }
    }
  };

  console.log("orginalprice", orginalprice);
  return (
    <>
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />
      <Box overflow="visible">
        <Grid container justifyContent="center" spacing={16}>
          <Grid item md={5} xs={12} alignItems="center">
            <Box>
              <FlexBox justifyContent="center" mb="50px">
                <div style={{ width: "300px", height: "auto" }}>
                  <StyledReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src: selectedThumbnail
                          ? multipleUmg[selectedThumbnail]
                          : selectedImage
                          ? colorImages[selectedImage]
                          : multipleUmg[selectedThumbnail],
                      },
                      largeImage: {
                        src: selectedThumbnail
                          ? multipleUmg[selectedThumbnail]
                          : selectedImage
                          ? colorImages[selectedImage]
                          : multipleUmg[selectedThumbnail],
                        width: eye === true ? 500 : 1000,
                        height: eye === true ? 500 : 1000,
                        style: { backgroundColor: "black" },
                      },
                      enlargedImageContainerDimensions: {
                        width: eye === true ? "170%" : "250%",
                        height: eye === true ? "100%" : "120%",
                      },
                      enlargedImageContainerStyle: {
                        zIndex: "100",
                      },
                      enlargedImageClassName: "largeImageContainer",
                    }}
                  />

                  {/* {colorImages[selectedImage] && (
                    <StyledReactImageMagnify
                      {...{
                        smallImage: {
                          alt: "Wristwatch by Ted Baker London",
                          isFluidWidth: true,
                          src: colorImages[selectedImage],
                          // multipleUmg[selectedThumbnail],
                        },
                        largeImage: {
                          src: colorImages[selectedImage],
                          // multipleUmg[selectedThumbnail],
                          width: 1000,
                          height: 1000,
                          style: { backgroundColor: "black" },
                        },
                        enlargedImageContainerDimensions: {
                          width: "250%",
                          height: "150%",
                        },
                        enlargedImageContainerStyle: {
                          zIndex: "100",
                        },
                        enlargedImageClassName: "largeImageContainer",
                      }}
                    />
                  )} */}
                </div>
              </FlexBox>

              <FlexBox margin="auto" maxWidth={260}>
                {/* <Carousel
                  totalSlides={multipleUmg.length}
                  visibleSlides={visibleSlides}
                  step={visibleSlides}
                  // getMoreItem={getMoreItem}
                > */}
                <Carousel2
                  totalSlides={multipleUmg?.length}
                  visibleSlides={visibleSlides}
                  step={visibleSlides}
                  showArrow={multipleUmg?.length > 5 ? true : false}
                >
                  {multipleUmg.map((url, ind) => (
                    <Box
                      size={50}
                      minWidth={50}
                      bg="white"
                      borderRadius="5px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      cursor="pointer"
                      border="1px solid"
                      key={url}
                      ml={ind === 0 && "auto"}
                      mr={ind === multipleUmg.length - 1 ? "auto" : "10px"}
                      borderColor={
                        selectedThumbnail === ind ? "primary.main" : "gray.400"
                      }
                      onClick={handleThunmbnailClick(ind)}
                    >
                      <Avatar src={url} borderRadius="5px" size={40} />
                    </Box>
                  ))}
                </Carousel2>
                {/* </Carousel> */}
              </FlexBox>
            </Box>
          </Grid>

          <Grid item md={7} xs={12} alignItems="center">
            <H1 style={{ fontSize: "20px" }}>{title}</H1>

            <FlexBox alignItems="center">
              <Typography>{short_desc ? parse(short_desc) : "_"}</Typography>
            </FlexBox>
            <FlexBox alignItems="center">
              <SemiSpan>Code:</SemiSpan>
              <H6 ml="8px">{productCode || "_"}</H6>
            </FlexBox>
            <FlexBox alignItems="center">
              <SemiSpan>Condition:</SemiSpan>
              <H6 ml="8px">{condition.toLocaleUpperCase() || "_"}</H6>
            </FlexBox>

            <FlexBox alignItems="center">
              <SemiSpan>Brand:</SemiSpan>
              <H6 ml="8px">{brand || ""}</H6>
            </FlexBox>

            <FlexBox alignItems="center">
              <SemiSpan>Rated:</SemiSpan>
              <Box ml="8px" mr="8px">
                <Rating color="warn" value={rating} outof={5} />
              </Box>
              <H6>({reviewCount})</H6>
            </FlexBox>

            <Box>
              {discount ? (
                <>
                  <H2
                    style={{ fontSize: "20px" }}
                    color="primary.main"
                    lineHeight="1"
                  >
                    <Currency>{Number(price).toFixed(2)}</Currency>
                  </H2>
                  <H2
                    style={{ fontSize: "20px" }}
                    color="text.muted"
                    lineHeight="1"
                  >
                    <del>
                      <Currency>{orginalprice}</Currency>
                    </del>
                  </H2>
                </>
              ) : (
                <H2
                  style={{ fontSize: "20px" }}
                  color="primary.main"
                  lineHeight="1"
                >
                  <Currency>{orginalprice ? orginalprice : price}</Currency>
                </H2>
              )}

              {stock ? (
                <SemiSpan fontWeight="bold" ml="5px" color="inherit">
                  Stock Available
                </SemiSpan>
              ) : (
                <SemiSpan fontWeight="bold" ml="5px" color="primary.main">
                  Out Of Stock
                </SemiSpan>
              )}
            </Box>

            <FlexBox alignItems="center">
              <SemiSpan
                style={{ display: color.length === 0 ? "none" : "block" }}
              >
                Color Family:
              </SemiSpan>
              <H6
                ml="8px"
                style={{ display: color.length === 0 ? "none" : "block" }}
              >
                {color[selectedImage]?.name || ""}
              </H6>
            </FlexBox>

            <Box
              style={{ display: color.length === 0 ? "none" : "block" }}
              ml="40px"
              maxWidth={250}
            >
              <Carousel3
                totalSlides={multipleUmg?.length}
                visibleSlides={visibleSlides}
                step={visibleSlides}
                showArrow={multipleUmg?.length > 5 ? true : false}
              >
                {colorImages.map((url, ind) => (
                  <Box
                    style={{ display: color.length === 0 ? "none" : "block" }}
                    size={40}
                    minWidth={40}
                    bg="white"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                    border="1px solid"
                    key={url}
                    ml={ind === 0 && "auto"}
                    mr={ind === colorImages.length - 1 ? "auto" : "10px"}
                    borderColor={
                      selectedImage === ind ? "primary.main" : "gray.400"
                    }
                    onClick={handleImageClick(ind)}
                  >
                    <Avatar src={url} size={35} borderRadius="5px" />
                  </Box>
                ))}
              </Carousel3>
            </Box>
            <FlexBox overflow="auto">
              <SemiSpan
                style={{
                  display: sizes.length === 0 ? "none" : "block",
                  marginRight: "10px",
                  marginTop: "15px",
                }}
              >
                Size:
              </SemiSpan>
              {sizes.map((size, ind) => (
                <Box
                  size={50}
                  minWidth={50}
                  bg="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  border="1px solid"
                  key={ind}
                  // ml={ind === 0 && "auto"}
                  mr={ind === sizes.length - 1 ? "auto" : "10px"}
                  borderColor={
                    selectedSize === ind ? "primary.main" : "gray.400"
                  }
                  onClick={handleSizeClick(ind)}
                >
                  <H6 style={{ display: size.length === 0 ? "none" : "block" }}>
                    {size.name || ""}
                  </H6>
                </Box>
              ))}
            </FlexBox>
            {!cartQuantity && (
              <FlexBox mt="1rem" alignItems="center">
                <SemiSpan
                  style={{
                    marginRight: "10px",
                    // marginTop: "15px",
                  }}
                >
                  Quantity:{" "}
                </SemiSpan>
                <Button
                  p="9px"
                  variant="outlined"
                  size="small"
                  color="primary"
                  disabled={!stock || defaultCartQuantity == 1}
                  onClick={() =>
                    setDefaultCartQuantity(defaultCartQuantity - 1)
                  }
                >
                  <Icon variant="small">minus</Icon>
                </Button>
                <H3 fontWeight="600" mx="20px">
                  {defaultCartQuantity.toString().padStart(2, "0")}
                </H3>
                <Button
                  p="9px"
                  variant="outlined"
                  size="small"
                  color="primary"
                  disabled={!stock || defaultCartQuantity == stockQuantity}
                  onClick={() =>
                    setDefaultCartQuantity(defaultCartQuantity + 1)
                  }
                >
                  <Icon variant="small">plus</Icon>
                </Button>
              </FlexBox>
            )}

            {!cartQuantity ? (
              <FlexBox mt="1rem" alignItems="center">
                <Button
                  disabled={!stock}
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => handleCartAmountChange(1, "addToCart")}
                >
                  Add to Cart
                </Button>
                <Button
                  disabled={!stock}
                  variant="contained"
                  size="small"
                  color="primary"
                  marginLeft="15px"
                  onClick={() => handleBuyNow("addToCart")}
                >
                  Buy Now
                </Button>
              </FlexBox>
            ) : (
              <FlexBox mt="1rem" alignItems="center">
                <SemiSpan
                  style={{
                    marginRight: "10px",
                    // marginTop: "15px",
                  }}
                >
                  Quantity:{" "}
                </SemiSpan>
                <Button
                  p="9px"
                  variant="outlined"
                  size="small"
                  color="primary"
                  disabled={!stock || cartQuantity == 1}
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
                  disabled={!stock || cartQuantity == stockQuantity}
                  onClick={() =>
                    handleCartAmountChange(cartQuantity + 1, "increase")
                  }
                >
                  <Icon variant="small">plus</Icon>
                </Button>
              </FlexBox>
            )}

            {/* <FlexBox alignItems="center" >
              <SemiSpan>Sold By:</SemiSpan>
              <Link href="/shop/fdfdsa">
                <a>
                  <H6 lineHeight="1" ml="8px">
                    Local Store
                  </H6>
                </a>
              </Link>
            </FlexBox> */}
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
`;

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
