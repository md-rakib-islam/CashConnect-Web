import styled from "styled-components";
import Box from "../Box";
import FlexBox from "../FlexBox";

type HeaderProps = {
  open: boolean;
};
type AccordionProps = {
  pl?: string;
};

export const AccordionWrapper = styled(Box) <AccordionProps>`
  overflow: hidden;
  cursor: pointer;
  transition: height 250ms ease-in-out;
  paddingLeft: ${({ pl }) => pl};
`;

export const AccordionHeaderWrapper = styled(FlexBox) <HeaderProps>`
  .caret-icon {
    transform: ${({ open }) => (open ? "rotate(90deg)" : "rotate(0deg)")};
    transition: transform 250ms ease-in-out;
  }
`;
