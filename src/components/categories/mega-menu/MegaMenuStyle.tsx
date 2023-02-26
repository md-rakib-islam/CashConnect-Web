import styled from "styled-components";
import { getTheme } from "../../../utils/utils";

interface StyledMegaMenu1Props {
  index: number;
}
interface StyledMegaMenu2Props {
  index: number;
}

export const StyledMegaMenu1 = styled.div<StyledMegaMenu1Props>`
  display: none;
  position: absolute;
  left: 210px;
  right: auto;
  z-index: 99;
  border-radius: none;

  // top: ${({ index }) => (index ? `${index * 40 + 5}px` : "0px")};
  top: 0;

  .title-link,
  .child-link {
    color: inherit;
    font-weight: 400;
    display: block;
    padding: 0.5rem 0px;
  }

  .mega-menu-content {
    padding: 0.5rem 0px;
    margin-left: 1rem;
    background-color: ${getTheme("colors.body.paper")};
    box-shadow: ${getTheme("shadows.6")};
    transition: all 250ms ease-in-out;
  }
`;
export const StyledMegaMenu2 = styled.div<StyledMegaMenu2Props>`
  display: none;
  position: absolute;
  left: 210px;
  right: auto;
  z-index: 99;
  border-radius: none;

  top: ${({ index }) => (index ? `${index * 40 + 5}px` : "0px")};
  // top: 0;

  .title-link,
  .child-link {
    color: inherit;
    font-weight: 400;
    display: block;
    padding: 0.5rem 0px;
  }

  .mega-menu-content {
    padding: 0.5rem 0px;
    margin-left: 1rem;
    background-color: ${getTheme("colors.body.paper")};
    box-shadow: ${getTheme("shadows.6")};
    transition: all 250ms ease-in-out;
  }
`;

export const StyledMegaMenuItem = styled.div`
  .menu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0px 1rem;
    height: 40px;
    min-width: 278px;
    white-space: pre;
    transition: all 250ms ease-in-out;
    color: ${getTheme("colors.text.primary")};

    .title {
      padding-left: 0.75rem;
      flex-grow: 1;
    }
  }

  &:hover {
    .menu-item-link {
      color: ${getTheme("colors.primary.main")};
      background: ${getTheme("colors.primary.light")};
    }
  }
`;
