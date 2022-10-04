import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import NavLink from "@component/nav-link/NavLink";
import { SemiSpan } from "@component/Typography";
import React from "react";
import { StyledMegaMenu1 } from "./MegaMenuStyle";

interface MegaMenuProps {
  data: any | [];
  minWidth?: string | "";
  index: number;
}

const MegaMenu3: React.FC<MegaMenuProps> = ({ data, index }) => {
  console.log("subCategories", data);
  return data?.subCategories.length ? (
    <StyledMegaMenu1 className="mega-menu" index={index}>
      <Card
        style={{ height: "400px", width: "280px", marginRight: "20px" }}
        ml="1rem"
        boxShadow="regular"
      >
        <FlexBox px="1.25rem" py="0.875rem">
          <Box flex="1 1 0">
            {data?.subCategories?.map((item, ind) => (
              <Grid item md={3} key={ind}>
                {item.href ? (
                  <NavLink
                    style={{ whiteSpace: "nowrap" }}
                    className="child-link"
                    href={item.href}
                  >
                    {item.title}
                  </NavLink>
                ) : (
                  <SemiSpan className="title-link">{item.title}</SemiSpan>
                )}
                {/* {item.subCategories?.map((sub, ind) => (
                    <NavLink
                      style={{ whiteSpace: "nowrap" }}
                      key={ind}
                      className="child-link"
                      href={sub.href}
                    >
                      {sub.title}
                    </NavLink>
                  ))} */}
              </Grid>
            ))}
          </Box>
          {/* 
          {data.rightImage && (
            <Link href={rightImage.href}>
              <a>
                <Box position="relative" width="153px" height="100%">
                  <NextImage
                    src={rightImage.imgUrl}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              </a>
            </Link>
          )} */}
        </FlexBox>

        {/* <Link href="/sale-page-2">
          <a>
            <Grid
              container
              spacing={0}
              flexWrap="wrap-reverse"
              containerHeight="100%"
              alignItems="center"
            >
              <Grid item sm={6} xs={12}>
                <Box px="1.25rem">
                  <H3 mb="0.5rem">Big Sale Upto 60% Off</H3>

                  <Typography color="text.muted" mb="0.5rem">
                    Handcrafted from genuine Italian Leather
                  </Typography>

                  <Small
                    fontWeight="700"
                    borderBottom="2px solid"
                    borderColor="primary.main"
                  >
                    SHOP NOW
                  </Small>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FlexBox
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="160px"
                  position="relative"
                >
                  <NextImage
                    layout="fill"
                    objectFit="contain"
                    src="/assets/images/products/paper-bag.png"
                    alt="model"
                  />
                </FlexBox>
              </Grid>
            </Grid>
          </a>
        </Link> */}
      </Card>
    </StyledMegaMenu1>
  ) : null;
};

MegaMenu3.defaultProps = {
  minWidth: "760px",
};

export default MegaMenu3;
