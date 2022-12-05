import { BASE_URL } from "@data/constants";
import _ from "lodash";
function getFormattedProductData(productData = [], type?: string) {
  if (_.isArray(productData)) {
    var formattedProductData: any[] = productData?.map((data) => {
      let productUrl = {};
      if (type === "Arrivals") {
        productUrl = { productUrl: `/product/${data?.id}` };
      } else if (type === "TopRated") {
        productUrl = { productUrl: `/product/${data?.id}` };
      } else if (type === "FeaturedBrands") {
        productUrl = { productUrl: `/product/${data?.id}` };
      }

      if (type === "bigdiscount") {
        return {
          ...productUrl,
          orginalPrice: Number(data?.product?.unit_price) || null,
          id: data?.product?.id || null,
          price: Number(data?.discounted_price) || null,
          title: data?.product?.name,
          imgUrl: `${
            data?.product?.thumbnail
              ? `${BASE_URL}${data?.product?.thumbnail}`
              : data?.product?.image
              ? `${BASE_URL}${data?.product?.image}`
              : ""
          }`,
          // imgUrl: `${BASE_URL}${data?.product?.thumbnail || data?.product?.image || ""}`,
          category: data?.product?.category || null,
          brand: _.isObject(data?.product?.brand)
            ? data?.product?.brand?.name
            : data?.product?.brand || null,
          rating: data?.product?.rating || null,
          reviewCount: data?.product?.num_reviews || null,
          condition: data?.product?.condition || null,
          off: data?.discount_percent || null,
        };
      } else {
        return {
          ...productUrl,
          id: data?.id || null,
          price: Number(data?.unit_price) || null,
          title: data?.name,
          imgUrl: `${
            data?.thumbnail
              ? `${BASE_URL}${data?.thumbnail}`
              : data?.image
              ? `${BASE_URL}${data?.image}`
              : ""
          }`,
          // imgUrl: `${BASE_URL}${data?.thumbnail || data?.image || ""}`,
          category: data?.category || null,
          brand: _.isObject(data?.brand)
            ? data?.brand?.name
            : data?.brand || null,
          rating: data?.rating || null,
          reviewCount: data?.num_reviews || null,
          condition: data?.condition || null,
        };
      }
    });
  } else {
    var formattedProductData = [];
  }

  return formattedProductData;
}

export default getFormattedProductData;
