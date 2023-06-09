//http://192.168.0.172:8001
//http://api.cashconnectbd.com

//base url
export const BASE_URL = "http://192.168.0.151:8001";
export const WS_URL = "192.168.0.151:8001";
// export const BASE_URL = "https://api.cashconnect.com.bd";
// export const BASE_URL = "http://134.119.184.218:8000";

//branch api
export const Branch_All = `${BASE_URL}/branch/api/v1/branch/all/`;
// customer info
export const User_Order_Details = `${BASE_URL}/user/api/v1/get_balance_orderstatus_count_by_userid/`;
export const User_Sell_Details = `${BASE_URL}/purchase_request/api/v1/purchase_request/get_all_purchase_request_counts_of_a_vendor/`;

//brand api
export const Brand_By_Id = `${BASE_URL}/brand/api/v1/brand/`;

export const Brand_Featured = `${BASE_URL}/brand/api/v1/brand/featured_brand/all/`;

export const Brand_All = `${BASE_URL}/brand/api/v1/brand/all/`;

export const Brands_By_Category = `${BASE_URL}/category/api/v1/category/get_all_brands_of_nested_category_products_by_category_id/`;

//catogory api
export const Category_By_Id = `${BASE_URL}/category/api/v1/category/`;

export const Category_All = `${BASE_URL}/category/api/v1/category/all/`;

export const Category_All_Without_Pg = `${BASE_URL}/category/api/v1/category/without_pagination/all/`;

export const Category_All_With_Child = `${BASE_URL}/category/api/v1/categories_tree/all/`;

export const Category_Top_All = `${BASE_URL}/category/api/v1/top_categories/all/`;

export const Category_With_Product_Brand = `${BASE_URL}/category/api/v1/homepage_categories_with_related_products_and_brands/all/`;

export const Category_Wth_Name_Img = `${BASE_URL}/category/api/v1/homepage_categories_with_id_name_image/all/`;

//city api
export const City_All = `${BASE_URL}/city/api/v1/city/without_pagination/all/`;
export const City_All_BY_COUNTRY_ID = `${BASE_URL}/city/api/v1/city/get_city_by_country_id/`;

//country api
export const Country_All = `${BASE_URL}/country/api/v1/country/without_pagination/all/`;

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

export const Customer_Order_Shipping_Address = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/create/`;

export const Customer_Order_Blling_Address = `${BASE_URL}/billingaddress/api/v1/billingaddress/create/`;

export const Customer_Order_Payment = `${BASE_URL}/customerorder/api/v1/customerorder/add_payment_method_and_payment_method_detail/`;

export const Customer_Order_Confirm = `${BASE_URL}/customerorder/api/v1/customerorder/confirm_from_frontend/`;

export const Customer_Order_Invoice = `${BASE_URL}/customerorder/api/v1/customerorder/get_invoice_by_order_id/`;

export const Customer_Order_Pending_Details = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_customer_order_pending_detail/`;

export const Customer_order_Details_For_Status = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_customer_order_detail_with_order_orderitem_shipping/`;

export const Get_Pending_Order_After_Login = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_pending_order_of_an_authenticated_customer/`;

export const Get_Tracking_Order = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_customer_order_by_order_no/`;

//login api
export const LOGIN_URL = `${BASE_URL}/user/api/v1/user/login/`;
export const FACEBOOK_LOGIN_URL = `${BASE_URL}/social/auth/facebook/login/`;
export const GOOGLE_LOGIN_URL = `${BASE_URL}/social/atuh/google/login/`;

//order api
export const order_Status_All = `${BASE_URL}/orderstatus/api/v1/orderstatus/all/`;

export const Order_Details_By_Id = `${BASE_URL}/order/api/v1/order/`;

//product api
export const product_by_categoryId = `${BASE_URL}/product/api/v1/product_using_category_nested/`;

export const Product_by_id = `${BASE_URL}/product/api/v1/product_with_discount/`;

export const Product_Flash_Deals = `${BASE_URL}/product/api/v1/product_with_flashdeal_status_true/all/`;

export const Product_Arrival = `${BASE_URL}/product/api/v1/product_with_arrival_status_true/all/`;

export const Product_Discount = `${BASE_URL}/product/api/v1/product_with_discount_status_true/all/`;

export const Product_Top_Rated = `${BASE_URL}/product/api/v1/product_with_top_rating/all/`;

export const Product_Search = `${BASE_URL}/product/api/v1/product/search/`;

export const Product_For_You = `${BASE_URL}/product/api/v1/product/more_for_you/all/`;

export const Product_Filter = `${BASE_URL}/product/api/v1/product/filter/`;

export const Product_By_BrandId = `${BASE_URL}/product/api/v1/product_using_brand/`;

export const Multiple_Image_By_Id = `${BASE_URL}/productimage/api/v1/productimage/all_productimage_by_product_id/`;

export const Product_Color_By_Product_Id = `${BASE_URL}/productcolor/api/v1/productcolor/get_by_product_id/`;

export const Product_Size_By_Product_Id = `${BASE_URL}/productsize/api/v1/productsize/get_all_by_product_id/`;

export const Product_High_To_Low = `${BASE_URL}/product/api/v1/product/filter_by_category_with_price_high_to_low/`;

export const Product_Low_To_High = `${BASE_URL}/product/api/v1/product/filter_by_category_with_price_low_to_high/`;

export const Product_Discount_By_Id = `${BASE_URL}/discount/api/v1/discount/get_a_discount_by_product_id/`;

export const Product_Detail_By_Id = `${BASE_URL}/product/api/v1/product/`;

//purchase api
export const Purshase_Create = `${BASE_URL}/purchase_request/api/v1/purchase_request/create_vendor_purchase_request/`;

export const Purchase_All_By_Vendor_id = `${BASE_URL}/purchase_request/api/v1/purchase_request/get_all_by_vendor_id/`;

export const Purchase_Items_By_Purchase_Id = `${BASE_URL}/purchase_request/api/v1/purchase_request/get_all_purchase_request_items_with_images_by_purchase_request_id/`;

export const Purchase_Req_By_Id = `${BASE_URL}/purchase_request/api/v1/purchase_request/`;

export const Purchase_Products_By_Vendor_Id = `${BASE_URL}/purchase_request/api/v1/purchase_request/get_all_purchase_request_items_with_images_by_vendor_id/`;

//payment method
export const Mayment_Mathod_All = `${BASE_URL}/paymentmethod/api/v1/paymentmethod/all/`;

export const Customer_Payment_Methods_By_Customer_Id = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/get_all_by_customer_id/`;

export const Customer_Payment_Method_Create = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/create/`;

export const Customer_Payment_Method_Update = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/update/`;

export const Customer_Payment_Method_Delete = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/delete/`;

export const Customer_Payment_Maythod_By_Id = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/`;

//purchase status
export const Purchase_Status_all = `${BASE_URL}/purchase_status/api/v1/purchase_status/all/`;

//review_and_rating​ api
export const Review_Create = `${BASE_URL}/review_and_rating/api/v1/review_and_rating/create/`;

export const Review_By_Product_Id = `${BASE_URL}/review_and_rating/api/v1/all_review_and_rating_of_a_product/`;

export const Review_Permission = `${BASE_URL}/review_and_rating/api/v1/review_and_rating/can_user_create_review_and_rating/`;

//role api
export const Role_All = `${BASE_URL}/role/api/v1/role/all/`;

//site settings api
export const Site_Setting_All = `${BASE_URL}/general_setting/api/v1/general_setting/all/`;

//shipping address api
export const Shipping_Adress_By_Order_Id = `${BASE_URL}/shippingaddress/api/v1/shippingaddress_using_order_id/`;

export const Shipping_Address_Delete = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/delete/`;

//slider api
export const Slider_All = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/all/`;

//stock api
export const Check_Stock = `${BASE_URL}/inventory/api/v1/inventory/check_by_product_id/`;

//ticket api
export const Ticket_Create = `${BASE_URL}/ticket/api/v1/ticket/create/`;

export const Ticket_Department_All = `${BASE_URL}/ticket_department/api/v1/ticket_department/all/`;

export const Ticket_Priority_All = `${BASE_URL}/ticket_priority/api/v1/ticket_priority/all/`;

export const Ticket_Status_All = `${BASE_URL}/ticket_status/api/v1/ticket_status/all/`;

export const Ticket_By_User_Id = `${BASE_URL}/ticket/api/v1/ticket/get_all_by_user_id/`;

export const Ticket_Details_Create = `${BASE_URL}/ticket_detail/api/v1/ticket_detail/create/`;

export const Ticket_Details_All = `${BASE_URL}/ticket_detail/api/v1/ticket_detail/get_all_by_ticket_id/`;

//user api
export const User_By_Id = `${BASE_URL}/user/api/v1/user/me`;

export const Check_Email = `${BASE_URL}/user/api/v1/user/check_email_when_create/`;
export const Check_Email_When_Update = `${BASE_URL}/user/api/v1/user/check_email_when_update/`;

export const Check_Primary_Phone = `${BASE_URL}/user/api/v1/user/check_primary_phone_when_create/`;
export const Check_Primary_Phone_When_Update = `${BASE_URL}/user/api/v1/user/check_primary_phone_when_update/`;

export const Check_Secondary_Phone = `${BASE_URL}/user/api/v1/user/check_secondary_phone_when_create/`;
export const Check_Secondary_Phone_When_Update = `${BASE_URL}/user/api/v1/user/check_secondary_phone_when_update/`;

export const Check_User_Name = `${BASE_URL}/user/api/v1/user/check_username_when_create/`;
export const Check_User_Name_When_Update = `${BASE_URL}/user/api/v1/user/check_username_when_update/`;

//thana api
export const Thana_All = `${BASE_URL}/thana/api/v1/thana/without_pagination/all/`;
export const Thana_All_BY_CITY_ID = `${BASE_URL}/thana/api/v1/thana/get_thana_by_city_id/`;

//vendor api
export const Vendor_Create = `${BASE_URL}/vendor/api/v1/vendor/create/`;

export const Vendor_Update = `${BASE_URL}/vendor/api/v1/vendor/update/`;

export const Vendor_By_Id = `${BASE_URL}/vendor/api/v1/vendor/`;

export const New_product_using = `${BASE_URL}/product/api/v1/new_product_using_category_nested/`;
export const Used_product_using = `${BASE_URL}/product/api/v1/used_product_using_category_nested/`;
export const Get_all_parent_category_without_pagination = `${BASE_URL}/category/api/v1/category/get_all_parent_category_without_pagination/`;

// OTP
export const Get_phone_varification_code_by_customer = `${BASE_URL}/customer/api/v1/customer/verify_primary_phone/`;
export const Get_phone_varification_code_by_vendor = `${BASE_URL}/vendor/api/v1/vendor/verify_primary_phone/`;
export const Get_phone_varification_code_for_resend_otp = `${BASE_URL}/user/api/v1/user/get_phone_otp/`;

// resetPasswordOtp
export const Get_phone_varification_code_for_reset_password = `${BASE_URL}/user/api/v1/user/get_phone_otp/`;
// resetPassword
export const Reset_password_with_otp_code = `${BASE_URL}/user/api/v1/user/reset_password/`;

// Message
export const Create_message = `${BASE_URL}/message/api/v1/message/create/`;
