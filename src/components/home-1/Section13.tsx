import Box from "@component/Box";
// import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
// import Currency from "@component/Currency";
// import HoverBox from "@component/HoverBox";
// import LazyImage from "@component/LazyImage";
import ProductCard1 from "@component/product-cards/ProductCard1";
// import Rating from "@component/rating/Rating";
// import { H4 } from "@component/Typography";
import { Product_Discount } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import _ from "lodash";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
// import { Chip } from "../Chip";

const Section13 = ({ bigDiscountList }) => {
  // const [bigDiscountLists, setbigDiscountLists] = useFormattedProductData(bigDiscountList, "bigdiscount")
  const [bigDiscountLists, setbigDiscountLists] = useState(bigDiscountList);
  const [page, setPage] = useState(1);
  const [pageEnd, setpageEnd] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(4);
    else if (width < 950) setVisibleSlides(6);
    else setVisibleSlides(6);
  }, [width]);

  const getMoreItem = () => {
    if (!pageEnd) {
      console.log("hitGetMoreItem");
      axios
        .get(`${Product_Discount}?page=${page + 1}&size=${6}`)
        .then((res) => {
          if (res.data.total_pages > 1) {
            setbigDiscountLists(bigDiscountLists.concat(res.data.products));
            console.log(bigDiscountLists);
            setPage(page + 1);
          }
          if (res.data.total_pages == page + 1) {
            setpageEnd(true);
          }
        });
    } else {
      console.log("NoMreItem");
    }
  };

  useEffect(() => {
    getMoreItem();
  }, []);
  console.log("bigDiscountLists222", bigDiscountList);

  const big_discount_list = (
    <CategorySectionCreator
      iconName="gift"
      title="Big Discounts"
      // seeMoreLink="product/search/big_discounts_all"
      seeMoreLink=""
    >
      <Box my="-0.25rem">
        <Carousel
          totalSlides={bigDiscountLists?.length}
          visibleSlides={visibleSlides}
          step={visibleSlides}
          getMoreItem={getMoreItem}
        >
          {bigDiscountLists?.map((item) => (
            <Box py="0.25rem" key={item.id}>
              <ProductCard1
                id={item.id}
                imgUrl={item.imgUrl}
                title={item.title}
                rating={item.rating}
                price={item.price}
                off={0}
                key={item.id}
                reviewCount={item.reviewCount}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );

  const returnableData = _.isEmpty(bigDiscountLists) ? null : big_discount_list;

  return returnableData;
};

export default Section13;
