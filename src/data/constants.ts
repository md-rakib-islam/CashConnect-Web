//http://cashconnectbackend.herokuapp.com
//base url
export const BASE_URL = "http://192.168.0.153:8001";

//not found image
export const notFoundImg = "/assets/images/products/notFoundImg.png";

//loding image
export const loadingImg = "/assets/images/products/loadingProduct.png";

try {
  var jwtToken: any = {
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("jwt_access_token"),
    },
  };
} catch (err) {
  jwtToken = {
    headers: {
      "Content-type": "application/json",
    },
  };
}

export const authTOKEN = jwtToken;

try {
  var user_id: any = localStorage?.getItem("UserId");
} catch (err) {
  user_id = 0;
}

//user id
export var UserId = user_id;

//login
export const LOGIN_URL = `${BASE_URL}/users/api/v1/users/login/`;

//category by id
export const Category_By_Id = "/category/api/v1/category/";

//all roles
export const Role_All = `${BASE_URL}/roles/api/v1/roles/all/`;

//all thana
export const Thana_All = `${BASE_URL}/thana/api/v1/thana/all/`;

//all city
export const City_All = `${BASE_URL}/city/api/v1/city/all/`;

//all country
export const Country_All = `${BASE_URL}/country/api/v1/country/all/`;

//all branch
export const Branch_All = `${BASE_URL}/branch/api/v1/branch/all/`;

//customer apis
export const Customer_type_All = `${BASE_URL}/customer_type/api/v1/customer_type/all/`;

export const Customer_Update = `${BASE_URL}/customer/api/v1/customer/update/`;

export const Customer_Create = `${BASE_URL}/customer/api/v1/customer/create/`;

export const Customer_By_Id = `${BASE_URL}/customer/api/v1/customer/`;

//vendor apis
export const Vendor_Create = `${BASE_URL}/vendor/api/v1/vendor/create/`;

export const Vendor_Update = `${BASE_URL}/vendor/api/v1/vendor/update/`;

export const Vendor_By_Id = `${BASE_URL}/vendor/api/v1/vendor/`;

//order apis
export const order_Status_All = `${BASE_URL}/orderstatus/api/v1/orderstatus/all/`;

export const Order_Details_By_Id = `${BASE_URL}/order/api/v1/order/`;

//brand apis
export const Brand_By_Id = "/brand/api/v1/brand/";

export const Brand_Featured = `${BASE_URL}/brand/api/v1/featured_brand/all/`

//customer order apis
export const orders_By_Customer_Id = `${BASE_URL}/customerorder/api/v1/customerorder/get_all_orders_of_a_customer/`;

export const Customer_Order_Create = `${BASE_URL}/customerorder/api/v1/customerorder/create/`;

export const Customer_Order_Remove_Item = `${BASE_URL}/customerorder/api/v1/customerorder_delete_item/`;

export const Customer_Increase_Quantity = `${BASE_URL}/customerorder/api/v1/customerorder_increase_quantity/`;

export const Customer_decrease_Quantity = `${BASE_URL}/customerorder/api/v1/customerorder_decrease_quantity/`;

export const Customer_Order_Details = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_customer_order_detail/`;

export const Customer_Order_Item_By_Product_Id = `${BASE_URL}/customerorder/api/v1/customerorder/get_order_item_by_order_id_and_product_id/`;

export const Customer_Order_Comment = `${BASE_URL}/customerorder/api/v1/customerorder/add_comment/`;

export const Customer_Order_Shipping_Address = `${BASE_URL}/customerorder/api/v1/customerorder/add_shipping_address/`;

export const Customer_Order_Payment = `${BASE_URL}/customerorder/api/v1/customerorder/add_payment_method_and_payment_method_detail/`;

export const Customer_Order_Confirm = `${BASE_URL}/customerorder/api/v1/customerorder/confirm_from_frontend/`;

export const Customer_Order_Pending_Details = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_customer_order_pending_detail/`;

//shipping address
export const Shipping_Adress_By_Order_Id = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/`;

export const Shipping_Address_Delete = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/delete/`;

//purchase apis
export const Purshase_Create = `${BASE_URL}/purchase_request/api/v1/purchase_request/create_seller_purchase_request/`;

//site settings apis
export const Site_Setting_All = `${BASE_URL}/site_settings/api/v1/general_setting/all/`

//review_and_rating​ apis
export const Review_Create = `${BASE_URL}/review_and_rating/api/v1/review_and_rating/create/`

export const Review_Bt_Product_Id = `${BASE_URL}/review_and_rating/api/v1/all_review_and_rating_of_a_product/`

//user apis
export const User_By_Id = `${BASE_URL}/users/api/v1/users/`

//product apis
export const ProductByCategoryId = "/product/api/v1/product_using_category/";

export const Product_by_id = "/product/api/v1/product/";

export const Product_Flash_Deals = `${BASE_URL}/product/api/v1/product_with_top_selling/all/`

export const Product_Arrival = `${BASE_URL}/product/api/v1/product_with_arrival_status_true/all/`

export const Product_Discount = `${BASE_URL}/product/api/v1/product_with_discount_status_true/all/`

export const Product_Top_Rated = `${BASE_URL}/product/api/v1/product_with_top_rating/all/`

//catogory apis
export const Category_All = "/category/api/v1/categories_tree/all/";

export const Category_Top_All = `${BASE_URL}/category/api/v1/top_categories/all/`