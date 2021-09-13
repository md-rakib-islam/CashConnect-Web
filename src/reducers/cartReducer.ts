const CHANGE_CART_QUANTITY = "CHANGE_CART_QUANTITY";

export const cartInitialState = {
  chartQuantity: 0,
};

export type CartItem = number;

export type cartStateType = {
  chartQuantity: CartItem;
};

export type cartActionType = {
  type: typeof CHANGE_CART_QUANTITY;
  payload: CartItem;
};

export const cartReducer: React.Reducer<cartStateType, cartActionType> = (
  state: cartStateType,
  action: cartActionType
) => {
  switch (action.type) {
    case CHANGE_CART_QUANTITY:
      let chartQuantity = state.chartQuantity;
      let cartItem = action.payload;

      return {
        chartQuantity: chartQuantity != cartItem ? cartItem : Math.random(),
      };

    default: {
      return {
        chartQuantity: chartQuantity,
      };
    }
  }
};
