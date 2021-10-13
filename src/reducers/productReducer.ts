export const productDetailsInitialState = {
  productDetails: {
    price: 250,
    name: "Lord 2019",
    imgUrl: "/assets/images/products/Automotive/1.Ford2019.png",
    id: "7222243834583537",
    qty: 1,
    full_desc: "",
    brand: 0,
  },
  productList: [],
};

export type ProductDetailsItem = {
  id?: string | number;
  name?: string;
  qty?: number;
  price?: number;
  imgUrl?: string;
  full_desc?: string;
  brand?: number;
};

export type ProductListItem = {
  id?: string | number;
  name?: string;
  brand?: number;
  price?: number | string;
  imgUrl?: string;
};

export type productDetailsStateType = {
  productDetails: ProductDetailsItem;
};

export type productListStateType = {
  productList: ProductListItem;
};

export const actionType = {
  chageProductList: "CHANGE_PRODUCT_LIST",
  chageProductdetails: "CHANGE_PRODUCT_DETAILS",
};

export type productDetailsActionType = {
  type: "CHANGE_PRODUCT_DETAILS";
  payload: ProductDetailsItem;
};

export type productListActionType = {
  type: "CHANGE_PRODUCT_LIST";
  payload: ProductListItem;
};

export const productDetailsReducer: React.Reducer<
  productDetailsStateType,
  productDetailsActionType
> = (state: productDetailsStateType, action: productDetailsActionType) => {
  switch (action.type) {
    case actionType.chageProductList:
      return {
        ...state,
        productList: action.payload,
      };

    case actionType.chageProductdetails:
      return {
        ...state,
        productDetails: action.payload,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
