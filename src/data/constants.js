//http://cashconnectbackend.herokuapp.com
//base url
export const BASE_URL = "http://192.168.0.17:8001";

//not found image
export const notFoundImg = "/assets/images/products/notFoundImg.png";

//loding image
export const loadingImg = "/assets/images/products/loadingProduct.png";

//jwt authTOKEN
// try {
//   var jwtToken = {
//     headers: {
//       "Content-type": "application/json",
//       Authorization: localStorage.getItem("jwt_access_token"),
//     },
//   };
// } catch (err) {
//   jwtToken = {
//     headers: {
//       "Content-type": "application/json",
//     },
//   };
// }

// export const authTOKEN = jwtToken;

// try {
//   var user_id = localStorage?.getItem("UserId");
// } catch (err) {
//   user_id = 0;
// }

// //user id
// export var UserId = user_id;

//login
export const LOGIN_URL = `${BASE_URL}/users/api/v1/users/login/`;

//ProductByCategoryId
export const ProductByCategoryId = "/product/api/v1/product_using_category/";

//product all
export const Category_All = "/category/api/v1/categories_tree/all/";

//product by id
export const Product_by_id = "/product/api/v1/product/";

//brand by id
export const Brand_By_Id = "/brand/api/v1/brand/";

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
export const orders_By_Customer_Id = `${BASE_URL}/customerorder/api/v1/customerorder/get_all_orders_of_a_customer/`;

export const order_Status_All = `${BASE_URL}/orderstatus/api/v1/orderstatus/all/`;
