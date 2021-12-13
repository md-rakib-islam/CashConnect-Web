import Accordion from "@component/accordion/Accordion";
import AccordionHeader from "@component/accordion/AccordionHeader";
import Box from "@component/Box";
import Divider from "@component/Divider";
import Grid from "@component/grid/Grid";
import Header from "@component/header/Header";
import Icon from "@component/icon/Icon";
import MobileCategoryImageBox from "@component/mobile-category-nav/MobileCategoryImageBox";
import { MobileCategoryNavStyle } from "@component/mobile-category-nav/MobileCategoryNavStyle";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Typography, { Paragraph } from "@component/Typography";
import useFormattedCategoryData from "@customHook/useFormattedCategoryData";
import { BASE_URL, Category_All_With_Child, Category_Top_All } from "@data/constants";
import axios from "axios";
import _ from "lodash";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

const MobileCategoryNav = () => {
  const [category, setCategory] = useState(null);
  const [suggestedList, setSuggestedList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [formattedCategoryData, setFormattedCategoryData] = useFormattedCategoryData();

  useEffect(() => {
    fetch(`${Category_All_With_Child}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("category", data.categories);
        setFormattedCategoryData(data.categories);
      }).catch((err) => { console.log("error", err) });
  }, []);

  const handleCategoryClick = (cat) => () => {
    let menuData = cat.menuData;
    if (menuData) {
      setSubCategoryList(menuData.categories || menuData);
    } else setSubCategoryList([]);
    setCategory(cat);
  };

  useEffect(() => {
    axios.get(`${Category_Top_All}?page=${1}&size=${6}`).then(res => {
      setSuggestedList(res.data?.categories);
    }).catch((err) => { console.log("error", err) })
  }, []);

  return (
    <MobileCategoryNavStyle>
      <Header className="header" />
      <div className="main-category-holder">
        {formattedCategoryData.map((item) => (
          <Box
            className="main-category-box"
            borderLeft={`${category?.href === item.href ? "3" : "0"}px solid`}
            onClick={handleCategoryClick(item)}
            key={item?.id || item.title}
          >
            <Icon size="28px" mb="0.5rem" src={item.icon}></Icon>
            <Typography
              className="ellipsis"
              textAlign="center"
              fontSize="11px"
              lineHeight="1"
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </div>
      <Box className="container">
        <Typography fontWeight="600" fontSize="15px" mb="1rem">
          Recommended Categories
        </Typography>
        <Box mb="2rem">
          <Grid container spacing={3}>
            {suggestedList.map((item, ind) => (
              <Grid item lg={1} md={2} sm={3} xs={4} key={item?.id || ind}>
                <Link href={`/product/search/product_by_category?categoryId=${item.id}`}>
                  <a>
                    <MobileCategoryImageBox title={item?.name} imgUrl={`${BASE_URL}${item?.image}`} />
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>

        {category?.menuComponent === "MegaMenu1" ? (
          subCategoryList.map((item, ind) => {
            return !_.isEmpty(item.subCategories) ? (
              <Fragment key={item?.id || ind}>
                <Divider />
                <Accordion>
                  <AccordionHeader px="0px" py="10px">
                    <Typography fontWeight="600" fontSize="15px">
                      {item.title}
                    </Typography>
                  </AccordionHeader>
                  <Box mb="2rem" mt="0.5rem">
                    <Grid container spacing={3}>
                      {item.subCategories?.map((item, ind) => (
                        <Grid item lg={1} md={2} sm={3} xs={4} key={item?.id || ind}>
                          <Link href={item?.href}>
                            <a>
                              <MobileCategoryImageBox {...item} />
                            </a>
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Accordion>
              </Fragment>
            ) : (
              <Link href={item.href} key={item?.id || ind}>
                <Paragraph
                  className="cursor-pointer"
                  fontSize="14px"
                  fontWeight="600"
                  py="6px"
                >
                  {item.title}
                </Paragraph>
              </Link>
            )

          })
        ) : (
          <Box mb="2rem">
            <Grid container spacing={3}>
              {subCategoryList.map((item, ind) => (
                <Grid item lg={1} md={2} sm={3} xs={4} key={item?.id || ind}>
                  <Link href={item?.href}>
                    <a>
                      <MobileCategoryImageBox {...item} />
                    </a>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      <MobileNavigationBar />
    </MobileCategoryNavStyle>
  );
};


export default MobileCategoryNav;
