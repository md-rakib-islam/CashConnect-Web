import { Category_All_With_Child } from "@data/constants";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import useFormattedCategoryData from "../../customHook/useFormattedCategoryData";
import CategoryMenuItem from "./category-menu-item/CategoryMenuItem";
import { StyledCategoryDropdown } from "./CategoryDropdownStyle";
import MegaMenu2 from "./mega-menu/MegaMenu2";

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
    MegaMenu1: MegaMenu2,
  };

  const [increaseWidth, setIncreaseWidth] = useState(false);

  const [formattedCategoryData, setFormattedCategoryData] =
    useFormattedCategoryData();

  useEffect(() => {
    fetch(`${Category_All_With_Child}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("category", data.categories);
        setFormattedCategoryData(data.categories);
        localStorage.setItem("categoryLength", data.categories.length);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const setIncreaseWidthMethod = (action) => {
    setIncreaseWidth(action);
  };

  // console.log("formatedCategory", navigationData);
  return (
    <>
      {!_.isEmpty(formattedCategoryData) && (
        <StyledCategoryDropdown
          open={open}
          position={position}
          increaseWidth={increaseWidth}
        >
          <div
            style={{ direction: "ltr" }}
            // onMouseOver={() => setIncreaseWidth(true)}
            // onMouseOut={() => setIncreaseWidth(false)}
          >
            {formattedCategoryData?.map((item, index) => {
              console.log("catagoryyyyyy", item);
              let MegaMenu = megaMenu[item.menuComponent];

              return (
                <CategoryMenuItem
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                  menuData={item.menuData}
                  key={item?.id || item.title}
                  caret={!!item.menuData?.categories?.length}
                  // setIncreaseWidth={setIncreaseWidthMethod}
                  setIncreaseWidthMethod={setIncreaseWidthMethod}
                >
                  {!_.isEmpty(item.menuData?.categories) ? (
                    <MegaMenu data={item.menuData?.categories} index={index} />
                  ) : null}
                </CategoryMenuItem>
              );
            })}
          </div>
        </StyledCategoryDropdown>
      )}
    </>
  );
};

CategoryDropdown.defaultProps = {
  position: "absolute",
};

export default CategoryDropdown;
