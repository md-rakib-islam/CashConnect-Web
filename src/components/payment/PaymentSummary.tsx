import React from "react";
import { Card1 } from "../Card1";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Typography from "../Typography";

export interface CheckoutSummaryProps {
  Subtotal: string | number;
  Shipping: string | number;
  Tax: string | number;
  Discount: string | number;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  Subtotal,
  Shipping,
  Tax,
  Discount,
}) => {
  return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Subtotal:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            {Subtotal ? `$${Subtotal}` : `_`}
          </Typography>
          <Typography fontWeight="600" fontSize="14px" lineHeight="1">
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Shipping:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            {Shipping ? `$${Shipping}` : `_`}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Tax:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            {Tax ? `$${Tax}` : `_`}
          </Typography>
          <Typography fontWeight="600" fontSize="14px" lineHeight="1">
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
        <Typography color="text.hint">Discount:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            {Discount ? `$${Discount}` : `_`}
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider mb="1rem" />

      <Typography
        fontSize="25px"
        fontWeight="600"
        lineHeight="1"
        textAlign="right"
      >
        {Subtotal ? `$${Subtotal}` : `_`}
      </Typography>
    </Card1>
  );
};

export default CheckoutSummary;
