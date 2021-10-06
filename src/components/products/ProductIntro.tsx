import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  BASE_URL, Brand_By_Id, Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Create,
  Customer_Order_Item_By_Product_Id,
  Customer_Order_Remove_Item
} from "@data/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactImageMagnify from 'react-image-magnify';
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
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  imgUrl,
  title,
  price,
  id,
  brand,
  reviewCount,
  rating,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [brandName, setbrandName] = useState(brand);

  const { dispatch } = useAppContext();
  const router = useRouter();

  var routerId = router.query?.id as string;

  const [cartQuantity, setCartQuantity] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [getItemId, setGetItemId] = useState(0);
  const [openLogin, setOpenLogin] = useState(false)

  const closeLoginTab = () => {
    setOpenLogin(false)
  }

  console.log("brand", brand)

  useEffect(() => {
    const { order_Id } = useUserInf()

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
  }, [getItemId, id,]);

  useEffect(() => {
    if (typeof brand == "number") {
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

  const handleCartAmountChange = (amount, action) => {
    const { user_id, order_Id, isLogin } = useUserInf()

    if (isLogin) {
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
        branch_id: 1,
        user_id: user_id,
      };

      //addToCart
      if (action == "addToCart") {
        console.log("orderData", orderData);
        axios.post(`${Customer_Order_Create}`, orderData).then((res) => {
          console.log("orderRes", res);

          localStorage.setItem("OrderId", res.data.order_details.id);
          setGetItemId(Math.random());
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: Math.random(),
          });
        }).catch(() => { });
      }

      //increase quantity
      else if (action == "increase") {
        axios
          .put(`${Customer_Increase_Quantity}${order_Id}/${itemId}`, orderData)
          .then((res) => {
            console.log("increaseRes", res);
            setGetItemId(Math.random());
          }).catch(() => { });
      }

      //remove
      else if (amount == 0 && action == "decrease") {
        axios
          .delete(`${Customer_Order_Remove_Item}${order_Id}/${itemId}`)
          .then((res) => {
            console.log("removeRes", res);
            setGetItemId(Math.random());
            dispatch({
              type: "CHANGE_CART_QUANTITY",
              payload: Math.random(),
            });
          }).catch(() => { });
      }

      //decrease quantity
      else if (action == "decrease") {
        axios
          .put(`${Customer_decrease_Quantity}${order_Id}/${itemId}`, orderData)
          .then((res) => {
            console.log("decreaseRes", res);
            setGetItemId(Math.random());
          }).catch(() => { });
      }

    }
    else {
      setOpenLogin(true)
    }
  };


  // console.log("productId", id);
  const { isLogin } = useUserInf()
  console.log("Login", isLogin)

  return (
    <>
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />
      <Box overflow="hidden">
        <Grid container justifyContent="center" spacing={16}>
          <Grid item md={6} xs={12} alignItems="center">
            <Box>
              <FlexBox justifyContent="center" mb="50px" >
                <div style={{ width: "300px", height: "auto" }}>
                  <ReactImageMagnify {...{
                    smallImage: {
                      alt: 'Wristwatch by Ted Baker London',
                      isFluidWidth: true,
                      src: imgUrl[selectedImage],
                    },
                    largeImage: {
                      src: imgUrl[selectedImage],
                      width: 1000,
                      height: 1000,
                      style: { background: "black" }
                    },

                  }} />
                </div>

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
              <H6 ml="8px">{brandName || "Unknown"}</H6>
            </FlexBox>

            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Rated:</SemiSpan>
              <Box ml="8px" mr="8px">
                <Rating color="warn" value={rating} outof={5} />
              </Box>
              <H6>({reviewCount})</H6>
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
    </>
  );
};

ProductIntro.defaultProps = {
  imgUrl: [
    "",
    "/assets/images/products/hiclipart.com (16).png",
    "/assets/images/products/hiclipart.com (18).png",
  ],
  title: "Mi Note 11 Pro",
  price: 1100,
};

export default ProductIntro;
