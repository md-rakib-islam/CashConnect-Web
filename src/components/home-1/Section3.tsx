import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
import { BASE_URL } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard6 from "../product-cards/ProductCard6";


const Section3 = ({ topCategoryList }) => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);

  console.log("topCategorys", topCategoryList)
  const category_list = (
    <CategorySectionCreator
      iconName="categories"
      title="Top Categories"
      seeMoreLink="/product/search/view_all/top_category"
    >
      <Carousel totalSlides={topCategoryList.length} visibleSlides={visibleSlides}>
        {topCategoryList.map((item) => (
          <a>
            <Card p="1rem">
              <ProductCard6
                title={item?.name}
                subtitle={"3k orders in this week"}
                imgUrl={`${BASE_URL}${item?.image}`}
              />
            </Card>
          </a>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );

  const returnableData = _.isEmpty(topCategoryList) ? null : category_list

  return returnableData
};

export default Section3;
