import React from "react";
import Section6 from "./Section6";

type fetchedDataType = any
interface Section7Props {
  categoryWithProductBrandList: any
}


const Section7: React.FC<Section7Props> = ({ categoryWithProductBrandList }) => {

  return (
    <>
      {
        categoryWithProductBrandList ? (categoryWithProductBrandList?.map((data, key) => (
          <Section6 data={data} key={key}></Section6>
        ))
        )
          : null
      }
    </>
  )
}

export default Section7;
