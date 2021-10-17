import { Category_All_With_Child } from "@data/constants";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import useFormattedCategoryData from "../../customHook/useFormattedCategoryData";
import CategoryMenuItem from "./category-menu-item/CategoryMenuItem";
import { StyledCategoryDropdown } from "./CategoryDropdownStyle";
import MegaMenu1 from "./mega-menu/MegaMenu1";

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
  };

  const [navigationData, setNavigationData] = useState([]);
  const [formattedCategoryData] =
    useFormattedCategoryData(navigationData);

  useEffect(() => {
    fetch(`${Category_All_With_Child}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("category", data.categories);
        setNavigationData(data.categories);
      }).catch(() => { });
  }, []);

  console.log("formatedCategory", navigationData);
  return (
    <StyledCategoryDropdown open={open} position={position}>
      {formattedCategoryData?.map((item, index) => {
        let MegaMenu = megaMenu[item.menuComponent];

        return (
          <CategoryMenuItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            caret={!!item.menuData}
            key={item.title}
          >
            {!_.isEmpty(item.menuData?.categories) && (<MegaMenu data={item.menuData} index={index}/>)}
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
