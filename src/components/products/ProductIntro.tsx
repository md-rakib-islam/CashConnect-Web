import LazyImage from "@component/LazyImage";
import { useAppContext } from "@context/app/AppContext";
import {
  BASE_URL,
  Brand_By_Id,
  Customer_decrease_Quantity,
  Customer_Order_Create,
  loadingImg,
  notFoundImg,
} from "@data/constants";
import { CartItem } from "@reducer/cartReducer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
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
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  imgUrl,
  title,
  price,
  id,
  brand,
}) => {
  const [brandName, setbrandName] = useState(brand);
  const [selectedImage, setSelectedImage] = useState(0);
  const { state, dispatch } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList;
  const router = useRouter();
  const routerId = router.query.id as string;
  const cartItem = cartList.find(
    (item) => item.id === id || item.id === routerId
  );

  const [cartQuantity, setCartQuantity] = useState(0);

  // const imgUrls = [
  //   "/assets/images/products/headphone.png",
  //   "/assets/images/products/hiclipart.com (16).png",
  //   "/assets/images/products/hiclipart.com (18).png",
  // ];

  // const notFoundImg = "/assets/images/products/notFoundImg.png";

  useEffect(() => {
    if (brand) {
      fetch(`${BASE_URL}${Brand_By_Id}${brand}`)
        .then((res) => res.json())
        .then((data) => {
          setbrandName(data.name);
        })
        .catch(() => {
          setbrandName("Not Found");
        });
    }
  }, [brand]);

  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  };

  const handleCartAmountChange = useCallback(
    (amount, action) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id: id || routerId,
          qty: Math.random(),
        },
      });

      setCartQuantity(amount);

      try {
        var UserId: any = localStorage?.getItem("UserId");
      } catch (err) {
        var UserId: any = 0;
      }

      const dateObj: any = new Date();
      const currentDate =
        dateObj.getFullYear() +
        "-" +
        (dateObj.getMonth() + 1).toString().padStart(2, 0) +
        "-" +
        dateObj.getDate().toString().padStart(2, 0);

      if (action == "order") {
        const orderData = {
          product_id: id || routerId,
          quantity: 1,
          price: price,
          order_date: currentDate,
          branch_id: 1,
          user_id: UserId,
        };

        console.log("orderData", orderData);
        axios.post(`${Customer_Order_Create}`, orderData).then((res) => {
          console.log("orderCreateResData", res.data);
          localStorage.setItem("OrderId", res.data.order_details.id);
          localStorage.setItem("OrderItemId", res.data.order_details.item.id);
        });
      }

      if (action == "decrease") {
        const orderData = {
          product_id: id || routerId,
          quantity: 1,
          price: price,
          order_date: currentDate,
          branch_id: 1,
          user_id: UserId,
        };

        const order_Id = localStorage.getItem("OrderId");
        const item_id = localStorage.getItem("OrderItemId");
        axios
          .post(
            `${Customer_decrease_Quantity}${order_Id}/${item_id}`,
            orderData
          )
          .then((res) => {
            console.log("CorderDecreaseRes", res);
          });
      }
    },
    []
  );

  console.log("productId", id);

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb="50px">
              <LazyImage
                src={
                  imgUrl[selectedImage] != `${BASE_URL}null`
                    ? imgUrl[selectedImage]
                    : notFoundImg
                }
                loader={() =>
                  imgUrl[selectedImage] != `${BASE_URL}null`
                    ? imgUrl[selectedImage]
                    : notFoundImg
                }
                alt={title}
                height="300px"
                width="auto"
                loading="eager"
                objectFit="contain"
              />
            </FlexBox>
            <FlexBox overflow="auto">
              {imgUrl.map((url, ind) => (
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
                  mr={ind === imgUrl.length - 1 ? "auto" : "10px"}
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
          <H1 mb="1rem">{title}</H1>

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Brand:</SemiSpan>
            <H6 ml="8px">{brandName ? brandName : "Unknown"}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Rated:</SemiSpan>
            <Box ml="8px" mr="8px">
              <Rating color="warn" value={4} outof={5} />
            </Box>
            <H6>(50)</H6>
          </FlexBox>

          <Box mb="24px">
            <H2 color="primary.main" mb="4px" lineHeight="1">
              ${Number(price).toFixed(2)}
            </H2>
            <SemiSpan color="inherit">Stock Available</SemiSpan>
          </Box>

          {!cartQuantity ? (
            <Button
              variant="contained"
              size="small"
              color="primary"
              mb="36px"
              onClick={handleCartAmountChange(1, "order")}
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
                onClick={handleCartAmountChange(cartQuantity - 1, "decrease")}
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
                onClick={handleCartAmountChange(cartQuantity + 1, "increase")}
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
                  Mobile Store
                </H6>
              </a>
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

ProductIntro.defaultProps = {
  imgUrl: [
    loadingImg,
    "/assets/images/products/hiclipart.com (16).png",
    "/assets/images/products/hiclipart.com (18).png",
  ],
  title: "Mi Note 11 Pro",
  price: 1100,
};

export default ProductIntro;
