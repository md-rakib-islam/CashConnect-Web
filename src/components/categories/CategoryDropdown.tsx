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
  increaseWidth?: boolean;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  open,
  position,
}) => {
  const megaMenu = {
    MegaMenu1,
  };

  const [increaseWidth, setIncreaseWidth] = useState(true)

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

  const setIncreaseWidthMethod = (action) => {
    setIncreaseWidth(action)
  }

  console.log("formatedCategory", navigationData);
  return (
    <>
    {!_.isEmpty(formattedCategoryData) && (<StyledCategoryDropdown open={open} position={position} increaseWidth={increaseWidth}>
      <div style={{ direction: "ltr" }}
        // onMouseOver={() => setIncreaseWidth(true)}
        // onMouseOut={() => setIncreaseWidth(false)}
      >
        {formattedCategoryData?.map((item, index) => {
          let MegaMenu = megaMenu[item.menuComponent];

          return (
            <CategoryMenuItem
              title={item.title}
              href={item.href}
              icon={item.icon}
              menuData={item.menuData}
              key={item.title}
            // setIncreaseWidth={setIncreaseWidthMethod}
              setIncreaseWidthMethod={setIncreaseWidthMethod}
            >
              {!_.isEmpty(item.menuData?.categories) ? (<MegaMenu data={item.menuData} index={index} />) : null}
            </CategoryMenuItem>
          );
        })}
      </div>
    </StyledCategoryDropdown>)
    }
    </>
  );
};

CategoryDropdown.defaultProps = {
  position: "absolute",
};

export default CategoryDropdown;
