import { BASE_URL } from "@data/constants";
function useFormattedProductData(productData, type?: string) {

    const formattedProductData = productData.map(data => {
        let productUrl = {}
        if (type == "Arrivals") {
            productUrl = { productUrl: `/product/${data?.id}` };
        }
        else if (type == "TopRated") {
            productUrl = { productUrl: `/product/${data?.id}` };
        }
        else if (type == "FeaturedBrands") {
            productUrl = { productUrl: `/product/${data?.id}` };
        }
        return {
            ...productUrl,
            id: data?.id,
            price: Number(data?.unit_price),
            title: data?.name,
            imgUrl: `${BASE_URL}${data?.thumbnail || data?.image}`,
            category: data?.category,
            brand: data?.brand,
            rating: data?.rating,
            reviewCount: data?.numReviews,
        }
    }
    )

    return [formattedProductData];
}

export default useFormattedProductData;