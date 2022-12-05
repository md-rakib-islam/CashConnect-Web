import Box from "@component/Box";
import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
import Currency from "@component/Currency";
import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import { H4 } from "@component/Typography";
import { Product_Discount } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import _ from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import { Chip } from "../Chip";

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
            <Box py="0.25rem" key={item.id} style={{ height: "100%" }}>
              <Card p="1rem" style={{ height: "100%" }}>
                <Link href={`/product/${item.id}`}>
                  <a style={{ position: "relative" }}>
                    {!!item?.off && (
                      <Chip
                        position="absolute"
                        bg="primary.main"
                        color="primary.text"
                        fontSize="10px"
                        fontWeight="600"
                        p="5px 10px"
                        top="10px"
                        left="10px"
                        zIndex={1}
                      >
                        {/* {item?.off}% off */}
                        <pre
                          style={{ margin: "0px" }}
                        >{`${item?.off}% off`}</pre>
                      </Chip>
                    )}
                    <HoverBox borderRadius={8} mb="0.5rem">
                      <LazyImage
                        src={
                          item.imgUrl
                            ? item.imgUrl
                            : "/assets/images/logos/shopping-bag.svg"
                        }
                        loader={() => item.imgUrl}
                        width="100%"
                        height="auto"
                        layout="responsive"
                        alt={item.title}
                      />
                    </HoverBox>
                    <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
                      {item.title.slice(0, 40)}
                    </H4>

                    <FlexBox>
                      <H4
                        fontWeight="600"
                        fontSize="14px"
                        color="primary.main"
                        mr="0.5rem"
                      >
                        <Currency>
                          {Math.ceil(item.price).toLocaleString()}
                        </Currency>
                      </H4>

                      <H4 fontWeight="600" fontSize="14px" color="text.muted">
                        <del>
                          <Currency>
                            {Math.ceil(item.orginalPrice).toLocaleString()}
                          </Currency>
                        </del>
                      </H4>
                    </FlexBox>

                    <H4
                      display="flex"
                      className="title"
                      fontSize="14px"
                      fontWeight="600"
                      color={
                        item?.condition === "new" ||
                        item?.condition === "New" ||
                        item?.condition === "NEW"
                          ? "primary.main"
                          : "secondary.main"
                      }
                    >
                      {item?.condition || ""}
                    </H4>
                  </a>
                </Link>
              </Card>
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
