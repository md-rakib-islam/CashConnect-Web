import LazyImage from "@component/LazyImage";
import { useAppContext } from "@context/app/AppContext";
import {
  BASE_URL,
  Brand_By_Id,
  Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Create,
  Customer_Order_Item_By_Product_Id,
  Customer_Order_Remove_Item,
  loadingImg,
  notFoundImg,
} from "@data/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  const { dispatch } = useAppContext();
  const router = useRouter();
  const routerId = router.query.id as string;

  const [cartQuantity, setCartQuantity] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [getItemId, setGetItemId] = useState(0);

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

  useEffect(() => {
    const order_Id = localStorage.getItem("OrderId");

    if (id) {
      axios
        .get(`${Customer_Order_Item_By_Product_Id}${order_Id}/${id}`)
        .then((item) => {
          console.log("item", item.data.order_item);
          setItemId(item.data.order_item.id);
          setCartQuantity(item.data.order_item.quantity);
        })
        .catch(() => setCartQuantity(0));
    } else {
      setGetItemId(Math.random());
    }
  }, [getItemId]);

  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  };

  const handleCartAmountChange = (amount, action) => {
    var UserId: any = localStorage?.getItem("UserId");

    const dateObj: any = new Date();
    const currentDate =
      dateObj.getFullYear() +
      "-" +
      (dateObj.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      dateObj.getDate().toString().padStart(2, 0);

    const orderData = {
      product_id: id || routerId,
      quantity: 1,
      price: price,
      order_date: currentDate,
      branch_id: 2,
      user_id: UserId,
    };

    const order_Id = localStorage.getItem("OrderId");

    if (action == "order") {
      if (UserId) {
        console.log("orderData", orderData);
        axios.post(`${Customer_Order_Create}`, orderData).then((res) => {
          console.log("orderRes", res);

          localStorage.setItem("OrderId", res.data.order_details.id);
          setGetItemId(Math.random());
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: Math.random(),
          });
        });
      } else {
        localStorage.setItem("backAfterLogin", `product/${id}`);
        router.push({
          pathname: "/login",
        });
      }
    } else if (action == "increase") {
      axios
        .put(`${Customer_Increase_Quantity}${order_Id}/${itemId}`, orderData)
        .then((res) => {
          console.log("increaseRes", res);
          setGetItemId(Math.random());
        });
    } else if (amount == 0 && action == "decrease") {
      axios
        .delete(`${Customer_Order_Remove_Item}${order_Id}/${itemId}`)
        .then((res) => {
          console.log("removeRes", res);
          setCartQuantity(0);
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: Math.random(),
          });
        });
    } else if (action == "decrease") {
      axios
        .put(`${Customer_decrease_Quantity}${order_Id}/${itemId}`, orderData)
        .then((res) => {
          console.log("decreaseRes", res);
          setGetItemId(Math.random());
        });
    }
  };

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
              onClick={() => handleCartAmountChange(1, "order")}
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
