import { BASE_URL } from "@data/constants";
function useFormattedProductData(productData, type?: string) {

    let render = 1
    if (typeof productData === "object") {

        console.log("renderHooks", render++)

        var formattedProductData: any[] = productData?.map(data => {
            console.log("formattedProductData", render++)
            let productUrl = {}
            if (type === "Arrivals") {
                productUrl = { productUrl: `/product/${data?.id}` };
            }
            else if (type === "TopRated") {
                productUrl = { productUrl: `/product/${data?.id}` };
            }
            else if (type === "FeaturedBrands") {
                productUrl = { productUrl: `/product/${data?.id}` };
            }

            if (type === "bigdiscount") {

                return {
                    ...productUrl,
                    orginalPrice: Number(data?.product?.unit_price) || null,
                    id: data?.product?.id || null,
                    price: Number(data?.discounted_price) || null,
                    title: data?.product?.name,
                    imgUrl: `${data?.product?.thumbnail ? `${BASE_URL}${data?.product?.thumbnail}` : (data?.product?.image ? `${BASE_URL}${data?.product?.image}` : null)}`,
                    // imgUrl: `${BASE_URL}${data?.product?.thumbnail || data?.product?.image || ""}`,
                    category: data?.product?.category || null,
                    brand: data?.product?.brand || null,
                    rating: data?.product?.rating || null,
                    reviewCount: data?.product?.num_reviews || null,
                    condition: data?.product?.condition || null,
                    off: data?.discount_percent || null
                }
            }
            else {
                return {
                    ...productUrl,
                    id: data?.id || null,
                    price: Number(data?.unit_price) || null,
                    title: data?.name,
                    imgUrl: `${data?.thumbnail ? `${BASE_URL}${data?.thumbnail}` : (data?.image ? `${BASE_URL}${data?.image}` : null)}`,
                    // imgUrl: `${BASE_URL}${data?.thumbnail || data?.image || ""}`,
                    category: data?.category || null,
                    brand: data?.brand || null,
                    rating: data?.rating || null,
                    reviewCount: data?.num_reviews || null,
                    condition: data?.condition || null,
                }
            }
        }
        )
    }
    else {
        var formattedProductData = []
    }

    return [formattedProductData];
}

export default useFormattedProductData;