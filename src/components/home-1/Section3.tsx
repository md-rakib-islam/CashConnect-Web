import Box from "@component/Box";
import Carousel from "@component/carousel4/Carousel";
import { BASE_URL, Category_Top_All } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import _ from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard6 from "../product-cards/ProductCard6";

const Section3 = ({ topCategoryList }) => {
  const [topCategoryLists, settopCategoryLists] = useState(topCategoryList);
  const [page, setPage] = useState(1);
  const [pageEnd, setpageEnd] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(8);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(8);
  }, [width]);

  const getMoreItem = () => {
    if (!pageEnd) {
      console.log("hitGetMoreItem");
      axios
        .get(`${Category_Top_All}?page=${page + 1}&size=${6}`)
        .then((res) => {
          console.log("hitGetMoreItem", res.data);

          if (res.data.total_pages > 1) {
            const topCategoryListState = topCategoryLists;
            var topCategoryListAll = topCategoryListState.concat(
              res.data.categories
            );
            settopCategoryLists(topCategoryListAll);
            console.log(topCategoryListAll);
            setPage(page + 1);
          }
          if (res.data.total_pages == page + 1) {
            setpageEnd(true);
          }
        });
    } else {
      console.log("noMoreItem");
    }
  };

  useEffect(() => {
    getMoreItem();
  }, []);

  console.log("topCategorys", topCategoryLists);
  const category_list = (
    <CategorySectionCreator
      iconName="categories"
      title="Top Categories"
      seeMoreLink="/product/search/view_all/top_category"
    >
      <Carousel
        totalSlides={topCategoryLists.length}
        visibleSlides={visibleSlides}
        step={visibleSlides}
        getMoreItem={getMoreItem}
        spacing="0.5rem"
        autoPlay={topCategoryLists.length > 5 ? true : false}
        showArrow={topCategoryLists.length > 5 ? true : false}
      >
        {topCategoryLists.map((item) => (
          <Link
            href={`product/search/product_by_category?categoryId=${item?.id}`}
            key={item?.id}
          >
            <a>
              <Box
                p="0 1rem 0 1rem"
                style={{
                  height: "150px",
                  display: "flex",
                }}
              >
                <ProductCard6
                  title={item?.name}
                  subtitle={"3k orders in this week"}
                  imgUrl={`${BASE_URL}${item?.image}`}
                />
              </Box>
            </a>
          </Link>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );

  const returnableData = _.isEmpty(topCategoryList) ? null : category_list;

  return returnableData;
};

export default Section3;
