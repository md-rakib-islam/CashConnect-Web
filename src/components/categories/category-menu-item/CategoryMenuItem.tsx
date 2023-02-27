import { H6 } from "@component/Typography";
import _ from "lodash";
import Link from "next/link";
import React from "react";
import Icon from "../../icon/Icon";
import { StyledCategoryMenuItem } from "./CategoryMenuItemStyle";

interface CategoryMenuItemProps {
  href: string;
  icon?: string;
  title: string;
  caret?: boolean;
  menuData?: any;
  setIncreaseWidthMethod?: (action: any) => void;
}

const CategoryMenuItem: React.FC<CategoryMenuItemProps> = ({
  href,
  icon,
  title,
  menuData,
  children,
  caret,
  setIncreaseWidthMethod,
}) => {
  return (
    <div
      onMouseOver={() => {
        !_.isEmpty(menuData?.categories) && setIncreaseWidthMethod(true);
      }}
      onMouseOut={() => {
        !_.isEmpty(menuData?.categories) && setIncreaseWidthMethod(false);
      }}
    >
      <StyledCategoryMenuItem>
        <Link href={href}>
          <div className="category-dropdown-link">
            {icon && <Icon variant="small" src={icon}></Icon>}
            <H6 className="title">{title}</H6>
            {caret && <Icon variant="small">chevron-right</Icon>}
          </div>
        </Link>
        {children}
      </StyledCategoryMenuItem>
    </div>
  );
};

CategoryMenuItem.defaultProps = {
  caret: true,
};

export default CategoryMenuItem;
