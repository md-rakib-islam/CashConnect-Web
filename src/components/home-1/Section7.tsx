import { Category_With_Product_Brand } from "@data/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Section6 from "./Section6";

type fetchedDataType = any


const Section7: React.FC = () => {
  const [fetchedData, setfetchedData] = useState<fetchedDataType>(null)

  useEffect(() => {
    axios.get(`${Category_With_Product_Brand}`).then(res => {
      console.log("Category_With_Product_BrandRes", res.data.categories_with_products_and_brands)
      setfetchedData(res.data.categories_with_products_and_brands)
    })
  }, [])

  console.log("fetchedData", fetchedData)
  return (
    <>
      {
        fetchedData ? (fetchedData?.map((data, key) => (
          <Section6 data={data} key={key}></Section6>
        ))
        )
          : null
      }
    </>
  )
}

export default Section7;
