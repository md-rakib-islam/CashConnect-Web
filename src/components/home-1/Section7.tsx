import React from "react";
import Section6 from "./Section6";
import _ from "lodash"

interface Section7Props {
  categoryWithProductBrandList: any
}



const Section7: React.FC<Section7Props> = ({ categoryWithProductBrandList }) => {

  return (
    <>
      {
        categoryWithProductBrandList ? (categoryWithProductBrandList?.map((data, key) => {
          return !_.isEmpty(data.products) && (<Section6 data={data} key={key}></Section6>)
        })
        )
          : null
      }
    </>
  )
}

export default Section7;
