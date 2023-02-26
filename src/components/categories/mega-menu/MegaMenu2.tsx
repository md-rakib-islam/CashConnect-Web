import Card from "@component/Card";
import React from "react";
import CategoryMenuItem from "../category-menu-item/CategoryMenuItem";
import MegaMenu3 from "./MegaMenu3";
import { StyledMegaMenu1 } from "./MegaMenuStyle";

export interface MegaMenu2Props {
  data: {
    [categories: string]: any;
    icon: string;
    href: string;
    title: string;
    menuData?: any;
  }[];
  index: number;
}
export interface MegaMenu {
  data: {
    [categories: string]: any;
    icon: string;
    href: string;
    title: string;
    menuData?: any;
  }[];
  index: number;
}
const MegaMenu2: React.FC<MegaMenu2Props> = ({ data, index }) => {
  const boxHeight = Number(localStorage.getItem("categoryLength")) * 40;

  console.log("categoriesData", data);
  return (
    <StyledMegaMenu1 className="mega-menu" index={index}>
      <Card
        // style={{ height: "600px", borderRadius: "0", top: "0" }}
        style={{ height: `${boxHeight}px`, borderRadius: "0" }}
        ml="1rem"
        py="0.5rem"
        boxShadow="regular"
      >
        {data?.map((item, int) => {
          console.log("item.title", item);
          return (
            <CategoryMenuItem
              title={item.title}
              href={item.href}
              icon={item.icon}
              caret={!!item.subCategories?.length}
              key={item.title}
            >
              {item.subCategories && (
                <MegaMenu3 minWidth="240px" data={item} index={int} />
              )}
            </CategoryMenuItem>
          );
        })}
      </Card>
    </StyledMegaMenu1>
  );
};

export default MegaMenu2;
