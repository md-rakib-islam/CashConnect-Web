import styled from "styled-components";
import { getTheme } from "../../utils/utils";

const StyledNavbar = styled.div`
  position: relative;
  height: 45px;
  background: rgb(232 66 98);
  box-shadow: ${getTheme("shadows.regular")};
  .button-category {
    height: 35px;
  }
  .nav-link {
    font-size: 14px;
    margin-right: 32px;
    font-weight: 800;
    color: #ffffff;
    cursor: pointer;
    :hover {
      font-weight: 800;
      color: rgba(15, 52, 96, 1) !important;
    }
  }
  .nav-link:last-child {
    margin-right: 0px;
  }

  .root-child {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 5;
  }
  .root:hover {
    .root-child {
      display: block;
    }
  }

  .child {
    display: none;
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 5;
  }
  .parent:hover > .child {
    display: block;
  }

  .dropdown-icon {
    color: ${getTheme("colors.text.muted")};
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

export default StyledNavbar;
