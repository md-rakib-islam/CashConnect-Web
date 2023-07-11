import systemCss from "@styled-system/css";
import { themeGet } from "@styled-system/theme-get";
import { cloneElement, useEffect, useRef, useState } from "react";
import styled, { CSSProperties } from "styled-components";
import { variant } from "styled-system";

interface Menu2Props {
  direction?: "left" | "right";
  handler: any;
  children: any;
  className?: string;
  style?: CSSProperties;
}

const StyledMenu2 = styled.div<{ direction: string }>(
  systemCss({
    position: "relative",
    transition: "all 250ms ease-in-out",

    ".menu-item-holder": {
      // paddingTop: "0.5rem",
      // paddingBottom: "0.5rem",
      minWidth: "180px",
      position: "absolute",
      // borderRadius: "6px",
      transition: "all 250ms ease-in-out",
      top: "calc(100% + 0.5rem)",
      backgroundColor: themeGet("body.paper", "#ffffff"),
      boxShadow: themeGet("shadows.3", "0 6px 12px rgba(0, 0, 0, 0.16)"),
      zIndex: 100,
    },
  }),
  variant({
    prop: "direction",
    variants: {
      left: {
        ".menu-item-holder": {
          left: 0,
          right: "auto",
        },
      },
      right: {
        ".menu-item-holder": {
          left: "auto",
          right: 0,
        },
      },
    },
  })
);

const Menu2: React.FC<Menu2Props> = ({
  handler,
  children,
  direction,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const popoverRef = useRef(show);
  popoverRef.current = show;

  const handleDocumentClick = () => {
    if (popoverRef.current) {
      setTimeout(() => {
        setShow(false);
      }, 7000);
    }
  };

  const togglePopover = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <StyledMenu2 direction={direction} {...props}>
      {cloneElement(handler, { onClick: togglePopover })}
      {show && <div className="menu-item-holder">{children}</div>}
    </StyledMenu2>
  );
};

Menu2.defaultProps = {
  direction: "left",
};

export default Menu2;
