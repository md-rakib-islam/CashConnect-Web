import styled from "styled-components";
import { layoutConstant } from "utils/constants";

const StyledHeader = styled.header`
  position: relative;
  z-index: 1;
  height: ${layoutConstant.headerHeight};
  background: #ffffff;
  padding-top: 8px;
  padding-bottom: 8px;

  .logo {
    img {
      display: block;
    }
  }
  .header-name {
    cursor: pointer;
    transition: 0.9s;
  }
  :hover {
    color: #e84262;
    transition: 0.3s;
  }
  .icon-holder {
    span {
      font-size: 12px;
      line-height: 1;
      margin-bottom: 4px;
    }
    h4 {
      margin: 0px;
      font-size: 14px;
      line-height: 1;
      font-weight: 600;
    }
    div {
      margin-left: 6px;
    }
  }

  .user {
    cursor: pointer;
  }
`;

export default StyledHeader;
