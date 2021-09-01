import { BASE_URL, Category_All } from "@data/constants";
//import navigations from "@data/navigations";
import React, { useEffect, useState } from "react";
import CategoryMenuItem from "./category-menu-item/CategoryMenuItem";
import { StyledCategoryDropdown } from "./CategoryDropdownStyle";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2";
import useFormattedCategoryData from "./useFormattedCategoryData";
import useFormattedNavigationData from "./useFormattedNavigationData.jsx";

export interface CategoryDropdownProps {
  open: boolean;
  position?: "absolute" | "relative";
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  open,
  position,
}) => {
  const megaMenu = {
    MegaMenu1,
    MegaMenu2,
  };

  const [navigationData, setNavigationData] = useState([]);
  const [formattedNavigationData] =
    navigationData != [] ? useFormattedNavigationData(navigationData) : [];
  const [formattedCategoryData] =
    navigationData != [] ? useFormattedCategoryData(navigationData) : [];
  useEffect(() => {
    fetch(`${BASE_URL}${Category_All}`)
      .then((res) => res.json())
      .then((data) => {
        setNavigationData(data.categories);
      });
  }, []);

  console.log("navigationData", navigationData);
  console.log("FormattedNavigationData", formattedNavigationData);

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {formattedNavigationData.map((item) => {
        let MegaMenu = megaMenu[item.menuComponent];

        return (
          <CategoryMenuItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            caret={!!item.menuData}
            key={item.title}
          >
            <MegaMenu data={item.menuData || {}} />
          </CategoryMenuItem>
        );
      })}
    </StyledCategoryDropdown>
  );
};

CategoryDropdown.defaultProps = {
  position: "absolute",
};

export default CategoryDropdown;
