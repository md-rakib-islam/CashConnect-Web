//http://192.168.0.172:8001
//http://api.cashconnectbd.com

//base url
export const BASE_URL = "http://192.168.0.172:8001";

//branch api
export const Branch_All = `${BASE_URL}/branch/api/v1/branch/all/`;

//brand api
export const Brand_By_Id = `${BASE_URL}/brand/api/v1/brand/`;

export const Brand_Featured = `${BASE_URL}/brand/api/v1/brand/featured_brand/all/`

export const Brand_All = `${BASE_URL}/brand/api/v1/brand/all/`

//catogory api
export const Category_By_Id = `${BASE_URL}/category/api/v1/category/`;

export const Category_All = `${BASE_URL}/category/api/v1/category/all/`

export const Category_All_With_Child = `${BASE_URL}/category/api/v1/categories_tree/all/`;

export const Category_Top_All = `${BASE_URL}/category/api/v1/top_categories/all/`

export const Category_With_Product_Brand = `${BASE_URL}/category/api/v1/homepage_categories_with_related_products_and_brands/all/`

export const Category_Wth_Name_Img = `${BASE_URL}/category/api/v1/homepage_categories_with_id_name_image/all/`

//city api
export const City_All = `${BASE_URL}/city/api/v1/city/all/`;

//country api
export const Country_All = `${BASE_URL}/country/api/v1/country/all/`;

//customer api
export const Customer_type_All = `${BASE_URL}/customer_type/api/v1/customer_type/all/`;

export const Customer_Update = `${BASE_URL}/customer/api/v1/customer/update/`;

export const Customer_Create = `${BASE_URL}/customer/api/v1/customer/create/`;

export const Customer_By_Id = `${BASE_URL}/customer/api/v1/customer/`;

//customer order api
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

export const Customer_order_Details_For_Status = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_customer_order_detail_with_order_orderitem_shipping/`

//login api
export const LOGIN_URL = `${BASE_URL}/user/api/v1/user/login/`

//order api
export const order_Status_All = `${BASE_URL}/orderstatus/api/v1/orderstatus/all/`;

export const Order_Details_By_Id = `${BASE_URL}/order/api/v1/order/`;

//product api
export const product_by_categoryId = `${BASE_URL}/product/api/v1/product_using_category/`;

export const Product_by_id = `${BASE_URL}/product/api/v1/product/`;

export const Product_Flash_Deals = `${BASE_URL}/product/api/v1/product_with_top_selling/all/`

export const Product_Arrival = `${BASE_URL}/product/api/v1/product_with_arrival_status_true/all/`

export const Product_Discount = `${BASE_URL}/product/api/v1/product_with_discount_status_true/all/`

export const Product_Top_Rated = `${BASE_URL}/product/api/v1/product_with_top_rating/all/`

export const Product_Search = `${BASE_URL}/product/api/v1/product/search/`

export const Product_For_You = `${BASE_URL}/product/api/v1/product/more_for_you/all/`

export const Product_Filter = `${BASE_URL}/product/api/v1/product/filter/`

export const Product_By_BrandId = `${BASE_URL}/product/api/v1/product_using_brand/`

export const Multiple_Image_By_Id = `${BASE_URL}/productimage/api/v1/productimage/all_productimage_by_product_id/`

export const Product_Color_By_Product_Id = `${BASE_URL}/productcolor/api/v1/productcolor/get_by_product_id/`

export const Product_Size_By_Product_Id = `${BASE_URL}/productsize/api/v1/productsize/get_by_product_id/`
//purchase api
export const Purshase_Create = `${BASE_URL}/purchase_request/api/v1/purchase_request/create_vendor_purchase_request/`;

export const Purchase_All_By_Vendor_id = `${BASE_URL}/purchase_request/api/v1/purchase_request/get_all_by_vendor_id/`

export const Purchase_Items_By_Purchase_Id = `${BASE_URL}/purchase_request/api/v1/purchase_request/get_all_purchase_request_items_with_images_by_purchase_request_id/`

export const Purchase_Req_By_Id = `${BASE_URL}/purchase_request/api/v1/purchase_request/`


//review_and_rating​ api
export const Review_Create = `${BASE_URL}/review_and_rating/api/v1/review_and_rating/create/`

export const Review_By_Product_Id = `${BASE_URL}/review_and_rating/api/v1/all_review_and_rating_of_a_product/`

//role api
export const Role_All = `${BASE_URL}/roles/api/v1/roles/all/`;

//site settings api
export const Site_Setting_All = `${BASE_URL}/site_settings/api/v1/general_setting/all/`

//shipping address api
export const Shipping_Adress_By_Order_Id = `${BASE_URL}/shippingaddress/api/v1/shippingaddress_using_order_id/`;

export const Shipping_Address_Delete = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/delete/`;

//slider api
export const Slider_All = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/all/`

//stock api
export const Check_Stock = `${BASE_URL}/inventory/api/v1/inventory/check_by_product_id/`

//user api
export const User_By_Id = `${BASE_URL}/user/api/v1/user/`

export const Check_Email = `${BASE_URL}/user/api/v1/user/check_email_when_create/`
export const Check_Email_When_Update = `${BASE_URL}/user/api/v1/user/check_email_when_update/`

export const Check_Primary_Phone = `${BASE_URL}/user/api/v1/user/check_primary_phone_when_create/`
export const Check_Primary_Phone_When_Update = `${BASE_URL}/user/api/v1/user/check_primary_phone_when_update/`

export const Check_Secondary_Phone = `${BASE_URL}/user/api/v1/user/check_secondary_phone_when_create/`
export const Check_Secondary_Phone_When_Update = `${BASE_URL}/user/api/v1/user/check_secondary_phone_when_update/`

export const Check_User_Name = `${BASE_URL}/user/api/v1/user/check_username_when_create/`
export const Check_User_Name_When_Update = `${BASE_URL}/user/api/v1/user/check_username_when_update/`

//thana api
export const Thana_All = `${BASE_URL}/thana/api/v1/thana/all/`;

//vendor api
export const Vendor_Create = `${BASE_URL}/vendor/api/v1/vendor/create/`;

export const Vendor_Update = `${BASE_URL}/vendor/api/v1/vendor/update/`;

export const Vendor_By_Id = `${BASE_URL}/vendor/api/v1/vendor/`;






