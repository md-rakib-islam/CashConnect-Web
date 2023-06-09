import Box from "@component/Box";
// import useFormattedProductData from "@customHook/useFormattedProductData";
import { Product_Flash_Deals } from "@data/constants";
import getFormattedProductData2 from "@helper/getFormattedProductData";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Carousel from "../carousel/Carousel";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard1 from "../product-cards/ProductCard1";

interface Section2Props {
  flashDealsList: any[];
}

const Section2: React.FC<Section2Props> = ({ flashDealsList }) => {
  //old
  // const [flashDealsListLists, setFlashDealsListLists] = useFormattedProductData(
  //   []
  // );
  //new
  const [flashDealsListLists, setFlashDealsListLists] = useState([]);
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
    setFlashDealsListLists(flashDealsList);
  }, [flashDealsList]);

  const getMoreItem = () => {
    if (!pageEnd) {
      console.log("hitGetMoreItem");
      axios
        .get(`${Product_Flash_Deals}?page=${page + 1}&size=${6}`)
        .then((res) => {
          console.log("res.data.products", res.data.products);
          const newItem = getFormattedProductData2(res.data.products);
          if (res.data.total_pages > 1) {
            const flashDealsListState = flashDealsList;
            setFlashDealsListLists(flashDealsListState.concat(newItem));

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

  console.log("flashDealsListLists", flashDealsListLists);

  const product_list = (
    <CategorySectionCreator
      iconName="light"
      title="Flash Deals"
      seeMoreLink="product/search/flash_deals_all"
    >
      <Box mb="-0.25rem">
        <Carousel
          totalSlides={flashDealsListLists?.length}
          visibleSlides={visibleSlides}
          step={visibleSlides}
          getMoreItem={getMoreItem}
          autoPlay={flashDealsListLists.length > 5 ? true : false}
          showArrow={flashDealsListLists.length > 5 ? true : false}
        >
          {flashDealsListLists?.map((item) => (
            <Box py="0.25rem" key={item.id}>
              <ProductCard1 hoverEffect {...item} flash="flash" />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );

  const returnableData = _.isEmpty(flashDealsList) ? null : product_list;

  return returnableData;
};

export default Section2;
