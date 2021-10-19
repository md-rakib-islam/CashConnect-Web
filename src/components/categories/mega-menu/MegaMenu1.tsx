import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import NavLink from "@component/nav-link/NavLink";
import { SemiSpan } from "@component/Typography";
import React from "react";
import { StyledMegaMenu1 } from "./MegaMenuStyle";


interface SubCategory {
  title: string;
  href: string;
}

interface Category {
  title: string;
  href?: string;
  subCategories: SubCategory[];
}

interface MegaMenu {
  categories: Category[];
}

interface MegaMenuProps {
  data: MegaMenu;
  minWidth?: string;
  index: number;
}

const MegaMenu1: React.FC<MegaMenuProps> = ({
  data: { categories },
  minWidth,
  index,
}) => {

  console.log("index", index)

  return categories ? (
    <StyledMegaMenu1 className="mega-menu" index={index}>
      <Card ml="1rem" minWidth={minWidth} boxShadow="regular">
        <FlexBox px="1.25rem" py="0.875rem">
          <Box flex="1 1 0">
            <Grid container spacing={4}>
              {categories?.map((item, ind) => (
                <Grid item md={3} key={ind}>
                  {item.href ? (
                    <NavLink className="title-link" href={item.href}>
                      {item.title}
                    </NavLink>
                  ) : (
                    <SemiSpan className="title-link">{item.title}</SemiSpan>
                  )}
                  {item.subCategories?.map((sub) => (
                    <NavLink className="child-link" href={sub.href}>
                      {sub.title}
                    </NavLink>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Box>
        </FlexBox>
      </Card>
    </StyledMegaMenu1>
  ) : null;
};

MegaMenu1.defaultProps = {
  minWidth: "760px",
};

export default MegaMenu1;
