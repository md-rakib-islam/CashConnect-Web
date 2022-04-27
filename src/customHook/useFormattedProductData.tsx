import getFormattedProductData from "@helper/getFormattedProductData";
import _ from "lodash";
import { useEffect, useState } from "react";
function useFormattedProductData(productData = [], type?: string) {
  const [formmattedData, setFormmattedData] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(productData) && _.isArray(productData)) {
      setFormmattedData(getFormattedProductData(productData, type || ""));
    }
  }, [productData]);

  const setFormattedProductData: any = (data: any[], type?: string) => {
    if (_.isArray(data) && !_.isEmpty(data)) {
      setFormmattedData(getFormattedProductData(data, type || ""));
    } else {
      setFormmattedData(getFormattedProductData([], type || ""));
    }
  };

  return [formmattedData, setFormattedProductData];
}

export default useFormattedProductData;
