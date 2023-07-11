import { BASE_URL } from "@data/constants";
import _ from "lodash";
function getFormattedProductData2(productData = []) {
  if (_.isArray(productData)) {
    var formattedProductData: any[] = productData?.map((data) => {
      let productUrl = {};

      productUrl = { productUrl: `/product/${data?.id}` };

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
    });
  } else {
    var formattedProductData = [];
  }

  return formattedProductData;
}

export default getFormattedProductData2;
