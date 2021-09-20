import { BASE_URL } from "@data/constants";
function useFormattedProductData(productData) {

    const formattedProductData = productData.map(data => {
        return {
            price: Number(data?.unit_price),
            title: data?.name,
            imgUrl: `${BASE_URL}${data.thumbnail}`,
            category: data?.category,
            id: data?.id,
            brand: data?.brand,
            rating: data?.rating,
        }
    }
    )

    return [formattedProductData];
}

export default useFormattedProductData;