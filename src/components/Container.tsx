import styled from "styled-components";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from "styled-system";
import { layoutConstant } from "utils/constants";

interface SubCategory {
  slider?: boolean;
}
const Container = styled.div<
  LayoutProps &
    ColorProps &
    PositionProps &
    SpaceProps &
    FlexboxProps &
    SubCategory
>`
  max-width: ${(props) =>
    props.slider ? "100%" : layoutConstant.containerWidth};

  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 1199px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  ${color}
  ${position}
  ${flexbox}
  ${layout}
  ${space}
`;

export default Container;
