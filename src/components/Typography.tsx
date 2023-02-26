import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { Customer_Order_Pending_Details } from "@data/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { CSSProperties } from "styled-components";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flex,
  FlexProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";
import FlexBox from "./FlexBox";

interface CustomProps
  extends TypographyProps,
    SpaceProps,
    ColorProps,
    FlexProps,
    LayoutProps,
    BorderProps {
  ref?: any;
  as?: any;
  title?: string;
  className?: string;
  ellipsis?: boolean;
  style?: CSSProperties;
  onClick?: (e) => void;
  [key: string]: any;
}

const Typography: React.FC<CustomProps> = styled.div<CustomProps>`
  ${(props) =>
    props.ellipsis
      ? `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  `
      : ""}

  ${border}
  ${typography}
  ${space}
  ${color}
  ${flex}
  ${layout}
`;

export const H1: React.FC<CustomProps> = (props) => (
  <Typography as="h1" mb="0" mt="0" fontSize="30px" {...props} />
);
export const H2: React.FC<CustomProps> = (props) => (
  <Typography as="h2" mb="0" mt="0" fontSize="25px" {...props} />
);
export const H3: React.FC<CustomProps> = (props) => (
  <Typography as="h3" mb="0" mt="0" fontSize="20px" {...props} />
);
export const H4: React.FC<CustomProps> = (props) => (
  <Typography
    as="h4"
    mb="0"
    mt="0"
    fontWeight="600"
    fontSize="17px"
    {...props}
  />
);
export const H5: React.FC<CustomProps> = (props) => (
  <Typography
    as="h5"
    mb="0"
    mt="0"
    fontWeight="600"
    fontSize="16px"
    {...props}
  />
);
export const H6: React.FC<CustomProps> = (props) => (
  <Typography
    as="h6"
    mb="0"
    mt="0"
    fontWeight="600"
    fontSize="14px"
    {...props}
  />
);

export const Paragraph: React.FC<CustomProps> = (props) => (
  <Typography as="p" mb="0" mt="0" {...props} />
);

export const Span: React.FC<CustomProps> = (props) => (
  <Typography as="span" fontSize="16px" {...props} />
);
export const SemiSpan: React.FC<CustomProps> = (props) => (
  <Typography as="span" fontSize="14px" color="text.muted" {...props} />
);
export const Small: React.FC<CustomProps> = (props) => (
  <Typography as="span" fontSize="12px" {...props} />
);

export const Tiny: React.FC<CustomProps> = (props) => (
  <Typography as="span" fontSize="10px" {...props} />
);
export const Tiny2: React.FC<CustomProps> = (props) => {
  const [productQuantity, setProductQuantity] = useState<any>(0);
  const { state } = useAppContext();
  const cartCanged = state.cart.chartQuantity;

  const { order_Id } = useUserInf();
  console.log("headerQuantity", productQuantity);

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

  return (
    <>
      {
        <FlexBox
          style={{ display: productQuantity == 0 ? "none" : "flex" }}
          borderRadius="300px"
          bg="error.main"
          px="5px"
          py="2px"
          alignItems="center"
          justifyContent="center"
          ml="-1rem"
          mt="-5px"
        >
          <Typography as="span" fontSize="10px" {...props}>
            {productQuantity?.quantity}
          </Typography>
        </FlexBox>
      }
    </>
  );
};

// const H1 =
export default Typography;
