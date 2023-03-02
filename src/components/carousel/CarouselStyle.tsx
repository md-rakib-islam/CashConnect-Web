import { deviceSize } from "@utils/constants";
import { CarouselProvider, CarouselProviderProps } from "pure-react-carousel";
import styled from "styled-components";

type StyledCarouselProps = {
  showDots?: boolean;
  showArrowOnHover?: boolean;
  dotColor?: string;
  dotGroupMarginTop?: string;
  spacing?: string;
};

export const StyledCarousel = styled(
  ({
    spacing,
    showDots,
    showArrowOnHover,
    dotGroupMarginTop,
    dotColor,
    ...props
  }: CarouselProviderProps & StyledCarouselProps) => (
    <CarouselProvider {...props} />
  )
)`
  position: relative;
  min-width: 100%;
  min-height: 100%;

  .custom-slider {
    margin-left: calc(-1 * ${({ spacing }) => spacing || "0px"} / 2);
    margin-right: calc(-1 * ${({ spacing }) => spacing || "0px"} / 2);
  }

  .carousel__inner-slide {
    margin: auto;
    width: calc(100% - ${({ spacing }) => spacing || "0px"});
  }

  .arrow-button {
    position: absolute;
    top: calc(
      50% - ${(props) => (props.showDots ? props.dotGroupMarginTop : "0px")}
    );
    transform: translateY(-50%);
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  }

  .right-arrow-class {
    right: -22px;
  }

  .left-arrow-class {
    left: -22px;
  }

  ${(props) =>
    props.showArrowOnHover
      ? `
  [class*="arrow-class"] {
    display: none;
  }

  :hover {
    [class*="arrow-class"] {
      display: unset;
    }
  }

  @media only screen and (max-width: ${deviceSize.sm}px) {
    [class*="arrow-class"] {
      display: block;
    }
  }
  `
      : ""}

  @media only screen and (max-width: 1330px) {
    .right-arrow-class {
      right: 0px;
    }
    .left-arrow-class {
      left: 0px;
    }
  }

  .custom-dot {
    display: flex;
    justify-content: center;
    margin-top: ${(props) => props.dotGroupMarginTop || "0px"};
  }

  .dot {
    position: relative;
    height: 10px;
    width: 10px;
    border-radius: 300px;
    margin: 0.25rem;
    cursor: pointer;
    // border: 1px solid rgb(15 52 96);
    background: #00000038;
  }
  .dot:after {
    position: absolute;
    content: " ";
    height: 10px;
    width: 10px;
    top: 50%;
    left: 50%;
    border-radius: 300px;
    transform: translate(-50%, -50%) scaleX(0);
    background: #e94560;
  }
  .dot-active:after {
    transform: translate(-50%, -50%) scaleX(1);
  }
  @media only screen and (max-width: 900px) {
    .right-arrow-class {
      right: 0px;
    }
    .left-arrow-class {
      left: 0px;
    }
    .custom-dot {
      display: flex !important;
      justify-content: center !important;
      margin-top: -1rem !important;
    }
    .dot {
      position: relative !important;
      height: 6px !important;
      width: 6px !important;
      border-radius: 300px !important;
      margin: 0.099rem !important;
      cursor: pointer !important;
      // border: 1px solid rgb(15 52 96) !important;
      background: #00000038 !important;
    }
    .dot:after {
      position: absolute !important;
      content: " " !important;
      height: 6px !important;
      width: 6px !important;
      top: 50% !important;
      left: 50% !important;
      border-radius: 300px !important;
      transform: translate(-50%, -50%) scaleX(0) !important;
      background: #e94560 !impotant;
    }
    .dot-active:after {
      transform: translate(-50%, -50%) scaleX(1) !important;
    }
  }
`;
