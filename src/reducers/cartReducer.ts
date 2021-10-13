const CHANGE_CART_QUANTITY = "CHANGE_CART_QUANTITY";

export const cartInitialState = {
  chartQuantity: 0,
  prductId: 0,
};

export type CartItem = {
  chartQuantity: number;
  prductId?: any;
};;

export type cartStateType = CartItem

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
      let chartProducId = state.prductId
      let cartItem = action.payload;

      return {
        chartQuantity: cartItem.chartQuantity,
        prductId: cartItem.prductId || 0
      };

    default: {
      return {
        chartQuantity: chartQuantity,
        prductId: chartProducId
      };
    }
  }
};
