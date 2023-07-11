import Box from "@component/Box";
// import useFormattedProductData from "@customHook/useFormattedProductData";
import { Product_Discount } from "@data/constants";
import getFormattedProductData from "@helper/getFormattedProductData";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Carousel from "../carousel/Carousel";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard1 from "../product-cards/ProductCard1";

interface Section2Props {
  bigDiscountList: any[];
}

const Section13: React.FC<Section2Props> = ({ bigDiscountList }) => {
  //old
  // const [bigDiscountLists, setBigDiscountLists] = useFormattedProductData(
  //   []
  // );
  //new
  const [bigDiscountLists, setBigDiscountLists] = useState([]);
  const [page, setPage] = useState(1);
  const [pageEnd, setpageEnd] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(5);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  useEffect(() => {
    setBigDiscountLists(bigDiscountList);
  }, [bigDiscountList]);

  const getMoreItem = () => {
    if (!pageEnd) {
      console.log("bigDiscountList", bigDiscountList);
      axios
        .get(`${Product_Discount}?page=${page + 1}&size=${6}`)
        .then((res) => {
          console.log("res.data.productsbigDiscount", res.data.products);
          const newItem = getFormattedProductData(
            res.data.products,
            "bigdiscount"
          );
          if (res.data.total_pages > 1) {
            const bigDiscountListState = bigDiscountList;
            setBigDiscountLists(bigDiscountListState.concat(newItem));

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

  console.log("bigDiscountLists", bigDiscountLists);

  const product_list = (
    <CategorySectionCreator
      iconName="gift"
      title="Big Discounts"
      // seeMoreLink="product/search/flash_deals_all"
      seeMoreLink=""
    >
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel
          totalSlides={bigDiscountLists?.length}
          visibleSlides={visibleSlides}
          step={visibleSlides}
          getMoreItem={getMoreItem}
          autoPlay={bigDiscountLists.length > 5 ? true : false}
          showArrow={bigDiscountLists.length > 5 ? true : false}
        >
          {bigDiscountLists?.map((item) => (
            <Box py="0.25rem" key={item.id}>
              <ProductCard1 hoverEffect {...item} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );

  const returnableData = _.isEmpty(bigDiscountList) ? null : product_list;

  return returnableData;
};

export default Section13;
