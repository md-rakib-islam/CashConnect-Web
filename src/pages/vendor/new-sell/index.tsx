

import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import CheckBox from "@component/CheckBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import Radio from "@component/radio/Radio";
import TextField from "@component/text-field/TextField";
import Typography from "@component/Typography";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { Purshase_Create, User_By_Id } from "@data/constants";
import { requred } from "@data/data";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import { useFormik } from "formik";
import jsonToFormData from "helper/jsonToFormData";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

type Iimage = any[];
type TIMG = any[];

function newPurchase() {
  const [items, setItems] = useState([{}]);
  const [contact_type, setContact_type] = useState("email");
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [_reRender, setReRender] = useState(0);
  const [previewImage, setPreviewImage] = useState<Iimage>([[]]);
  const [images, setImages] = useState<TIMG>([[]]);
  const [loading, setLoading] = useState(false)
  const width = useWindowSize();

  const { dispatch } = useAppContext()

  const router = useRouter()

  const { user_id } = useUserInf()

  useEffect(() => {
    images.map((img, id) => {
      if (_.isEmpty(img)) {
        setFieldValue(`item_image${id}`, null);
      } else {
        setFieldValue(`item_image${id}`, "imageUploaded");
      }
    });
    console.log("images", images);
  }, [images]);

  useEffect(() => {
    if (user_id) {
      axios.get(`${User_By_Id}${user_id}`).then(res => {
        console.log("vendorRes", res)
        setFieldValue("first_name", res?.data?.first_name)
        setFieldValue("last_name", res?.data?.last_name)
        setFieldValue("email", res?.data?.email)
        setFieldValue("contact_no", res?.data?.primary_phone)
      }).catch((err) => { console.log("error", err) })
    }
  }, [user_id])

  //submit purchase data
  const handleFormSubmit = async (values) => {

    let purchaseData = {
      first_name: values.first_name,
      last_name: values.last_name,
      contact_no: `${values.contact_no}`,
      email: values.email,
      street_address: values.street_address,
      contact_type: contact_type,
      is_subscribed: isSubscribe,
      items: [],
    };

    let Items = [];
    items.map((_itm, id) => {
      let Item = {
        item_name: values[`item_name${id}`],
        item_price: values[`item_price${id}`],
        item_quantity: 1,
        images: images[id],
      };
      Items.push(Item);
    });
    purchaseData.items = Items;

    const [PurchaseDataToFormData] = jsonToFormData(purchaseData);


    setLoading(true)

    axios
      .post(`${Purshase_Create}`, PurchaseDataToFormData)
      .then((res) => {
        console.log("purchaserequestRes", res);
        setLoading(false)
        if (res?.data?.data?.purchase_request_items?.length) {
          const user_type = localStorage.getItem("userType")
          router.push(`${user_type === "vendor" ? "/vendor/new-sell/success" : "/new-sell/success"}`)
        }
        else if (res?.data?.user_exists) {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: `${values.email} is already exist`,
              alerType: "warning",
            }
          })
        }
        else {
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertValue: "someting went wrong",
              alerType: "error",
            }
          })
        }
      }).catch(() => {
        setLoading(false)
        dispatch({
          type: "CHANGE_ALERT",
          payload: {
            alertValue: "someting went wrong",
            alerType: "error",
          }
        })
      });

    console.log("purchaseData", purchaseData)

  };

  const handleContactTypeChange = ({ target: { name } }) => {
    setContact_type(name);
  };

  const handleSubscribeChecked = (e) => {
    setIsSubscribe(e.target.checked);
  };

  //add a new item
  const addItem = () => {
    console.log("additem", items);
    let newItems = items;
    newItems.push({});
    setItems(newItems);

    let newImg: any = [...previewImage];
    newImg.push([]);
    setPreviewImage(newImg);

    let newImage: any = [...images];
    newImage.push([]);
    setImages(newImage);

    setReRender(Math.random());
  };

  //remove specific item
  const removeItem = (id) => {
    let NewItems = [...items];
    NewItems.splice(id, 1);
    setItems(NewItems);

    let newImg: any = [...previewImage];
    newImg.splice(id, 1);
    setPreviewImage(newImg);

    let newImage: any = [...images];
    newImage.splice(id, 1);
    setImages(newImage);

    setFieldValue(`item_name${id}`, "");
    setFieldValue(`item_price${id}`, "");

    items.map((_data, idx) => {
      if (idx >= id) {
        setFieldValue(`item_name${idx}`, values[`item_name${idx + 1}`]);
        setFieldValue(`item_price${idx}`, values[`item_price${idx + 1}`]);
        if (items.length - 1 == idx) {
          setFieldValue(`item_name${idx + 1}`, "");
          setFieldValue(`item_price${idx + 1}`, "");
        }
      }
    });

    setReRender(Math.random());
  };

  const cancelAImage = (itemId, imgId) => {
    let newPreImgs = [...previewImage];
    newPreImgs[itemId].splice(imgId, 1);
    setPreviewImage(newPreImgs);

    let newImages = [...images];
    newImages[itemId].splice(imgId, 1);
    setImages(newImages);

    setReRender(Math.random());
  };

  //validation for item
  var itemShema = {};
  items.map((_itm, id) => {
    itemShema = {
      ...itemShema,
      [`item_name${id}`]: yup.string().required("required").nullable(requred),
      [`item_price${id}`]: yup.number().required("required").nullable(requred),
      [`item_image${id}`]: yup.string().required("required").nullable(requred),
    };
  });

  var checkoutSchema = yup.object().shape({
    ...itemShema,
    first_name: yup.string().required("required").nullable(requred),
    last_name: yup.string().required("required").nullable(requred),
    contact_no: yup.string().required("required").nullable(requred),
    email: yup.string().email("invalid email").required("required").nullable(requred),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      {loading && (
        <div style={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: '0px',
          left: '0px',
          display: 'flex',
          justifyContent: "center",
          backgroundColor: " rgb(0 0 0 / 50%)",
          alignItems: "center",
          zIndex: 100,
        }}>
          <img style={{
            height: "100px",
            width: "100px",
            marginTop: "100pz"
          }}
            src="/assets/images/gif/loading.gif" />
        </div>
      )}

      <DashboardPageHeader
        title="Add Product"
        iconName="delivery-box"
        button={
          <Link href="/vendor/products">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Product List
            </Button>
          </Link>
        }
      />
      <Card p="30px">

        <form onSubmit={handleSubmit}>
          <Box
            mt="60px"
            py="60px"
            px="50px"
            mx={`${width < 950 || "20px"}`}
            boxShadow="0px -10px 10px #ababab"
            justifyContent="center"
            alignItems="flex-start"
            display="flex"
            flexDirection="column"
          >
            <Grid container horizontal_spacing={6} vertical_spacing={4}>
              <Grid item md={12} xs={12}>
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Typography textAlign="center" fontSize="25px" fontWeight="700">
                    Your personal details
                  </Typography>
                  <Typography textAlign="center" fontSize="16px" fontWeight="600" mt="12px">
                    This information is 100% secure with us.
                  </Typography>
                  <Typography textAlign="center" fontSize="16px" fontWeight="600" mb="10px">
                    We will not spam you or share your details.
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="first_name"
                  label="First Name"
                  fullwidth
                  boxShadow
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name || ""}
                  errorText={touched.first_name && errors.first_name}
                  style={{ cursor: "no-drop" }}
                  readOnly
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  name="last_name"
                  label="Last Name"
                  fullwidth
                  boxShadow
                  readOnly
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name || ""}
                  errorText={touched.last_name && errors.last_name}
                  style={{ cursor: "no-drop" }}
                />
              </Grid>

              <Grid item md={6} xs={12}>

                {/* <div style={{ display: "flex" }}>
                  <Select
                    mb="1rem"
                    mt="1.03rem"
                    label="Country"
                    width="40%"
                    placeholder="Select Country"
                    getOptionLabelBy="label"
                    getOptionValueBy="value"
                    readOnly
                    options={country_codes}
                    components={{ Option: CustomOption }}
                    value={values.country_code || null}
                    onChange={(value: any) => {
                      setFieldValue("country_code", value);
                      setFieldValue("contact_no", `${value.value}`);
                    }}
                    errorText={touched.country_code && errors.country_code}
                  /> */}
                <TextField
                  mt="1rem"
                  name="contact_no"
                  label="Contact Number"
                  fullwidth
                  boxShadow
                  readOnly
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact_no || ""}
                  errorText={touched.contact_no && errors.contact_no}
                  style={{ cursor: "no-drop" }}
                />
                {/* </div> */}

              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  mt="1rem"
                  name="email"
                  type="email"
                  label="Email Address"
                  fullwidth
                  boxShadow
                  readOnly
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  errorText={touched.email && errors.email}
                  style={{ cursor: "no-drop" }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            mx={`${width < 950 || "20px"}`}
            pb="80px"
            bg="#dcdcdc"
            boxShadow="0px -10px 10px #ababab"
            justifyContent="center"
            alignItems="flex-start"
            display="flex"
            flexDirection="column"
          >
            <div style={{ width: "100%" }}>
              <Grid
                container
                horizontal_spacing={6}
                vertical_spacing={4}
                pt="60px"
              >
                <Grid item md={12} xs={12}>
                  <Box alignItems="center" display="flex" flexDirection="column">
                    <Typography textAlign="center" fontSize="25px" fontWeight="700" mt="40px">
                      Which area do you live or work in?
                    </Typography>
                    <Typography textAlign="center" fontSize="16px" fontWeight="600" mt="12px">
                      Let us find the branches closest to you.
                    </Typography>
                    <Typography textAlign="center" fontSize="16px" fontWeight="600" mb="15px">
                      Select the area that is the most convenient for you.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={2} xs={1}>
                  { }
                </Grid>
                <Grid item md={8} xs={10}>
                  <TextField
                    name="street_address"
                    mt="20px"
                    label="Type tour address / suburb to find your nearest store"
                    fullwidth
                    boxShadow
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.street_address || ""}
                    errorText={touched.street_address && errors.street_address}
                  />
                </Grid>
              </Grid>
            </div>
          </Box>

          <Box
            pt="40px"
            pb="80px"
            mx={`${width < 950 || "20px"}`}
            boxShadow="0px -10px 10px 0px #ababab"
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              width="100%"
            >
              <Typography textAlign="center" fontSize="25px" fontWeight="700" mt="20px">
                Tell us about your items
              </Typography>
              <Typography textAlign="center" fontSize="16px" fontWeight="600" mt="12px">
                Provide as much detail as possible to help us give you an accurate
                quote.
              </Typography>
            </Box>
            {items.map((_item, idx) => {
              return (
                <>
                  <Box
                    mt="60px"
                    pb="50px"
                    bg="#dcdcdc"
                    boxShadow="0px -10px 10px #ababab"
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                    width="80%"
                  >
                    <Box width="80%" mt="50px">
                      <TextField
                        name={`item_name${idx}`}
                        label="Item Name"
                        placeholder="Describe your item for us. Eg. Make: Samsung Model: S9 SM-G960F Colour: Lilac Storage: 64gb*"
                        fullwidth
                        boxShadow
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[`item_name${idx}`] || ""}
                        errorText={errors[`item_name${idx}`]}
                      />
                    </Box>
                    <Box width="80%" mt="25px">
                      <TextField
                        name={`item_price${idx}`}
                        label="Item Price"
                        fullwidth
                        boxShadow
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[`item_price${idx}`] || ""}
                        errorText={errors[`item_price${idx}`]}
                      />
                    </Box>

                    {errors[`item_image${idx}`] && (
                      <p style={{ color: "red", marginBottom: "-20px" }}>
                        image is requred
                      </p>
                    )}

                    <Box
                      width="80%"
                      mt="25px"
                      display="flex"
                      justifyContent="space-evenly"
                      flexWrap="wrap"
                    >
                      {previewImage[idx]?.map((src, id) => {
                        return (
                          <>
                            <Box
                              display="flex"
                              width="fit-content"
                              position="relative"
                            >
                              <div
                                id="cancelIcon"
                                style={{
                                  position: "absolute",
                                  top: "-10px",
                                  right: "-10px",
                                  zIndex: 1,
                                  color: "red",
                                }}
                              >
                                <Icon
                                  onClick={() => {
                                    cancelAImage(idx, id);
                                  }}
                                >
                                  cancel
                                </Icon>
                              </div>
                              <Avatar
                                float="left"
                                radius={10}
                                ml="15px"
                                src={src}
                                size={100}
                              // loader={() => previewImage}
                              />
                            </Box>
                          </>
                        );
                      })}
                    </Box>

                    <Box width="80%" mt="10px">
                      <Box ml="-20px" zIndex={1}>
                        <label htmlFor={`itemImg${idx}`}>
                          <Button
                            as="span"
                            size="small"
                            bg="gray.300"
                            color="secondary"
                            height="auto"
                            p="6px"
                            borderRadius="50%"
                          >
                            <Icon>upload</Icon>
                          </Button>
                        </label>
                      </Box>
                      <Box display="flex" justifyContent="center">
                        Upload Image{" "}
                      </Box>
                      <Hidden>
                        <input
                          multiple
                          className="hidden"
                          onChange={async (e) => {
                            const reader: any = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                let newImg = [...previewImage];
                                newImg[idx].push(reader.result);
                                setPreviewImage(newImg);
                              }
                            };
                            reader.readAsDataURL(e.target.files[0]);

                            const file = e.target.files[0];
                            let newImgFile = [...images];

                            newImgFile[idx].push(file);

                            setImages(newImgFile);
                            // onChange(file);
                          }}
                          id={`itemImg${idx}`}
                          accept="image/*"
                          type="file"
                        />
                      </Hidden>
                    </Box>

                    {items.length !== 1 && (
                      <Button
                        mt="50px"
                        mb="1.65rem"
                        variant="contained"
                        color="error"
                        onClick={() => removeItem(idx)}
                      >
                        Remove Item
                      </Button>
                    )}
                  </Box>
                </>
              );
            })}

            <Button
              mt="50px"
              mb="1.65rem"
              variant="contained"
              color="secondary"
              onClick={addItem}
            >
              Add Another Item
            </Button>
          </Box>

          <Box
            mx={`${width < 950 || "20px"}`}
            pb="40px"
            bg="#dcdcdc"
            boxShadow="0px -10px 10px #ababab"
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Typography textAlign="center" fontSize="25px" fontWeight="700" mt="50px">
              How would you like us to contact you?
            </Typography>
            <Typography textAlign="center" fontSize="16px" fontWeight="600" mt="12px" mb="50px">
              Once an agent has valued your items, we will contact you with a
              quote and the next steps.
            </Typography>

            <Box display="flex" justifyContent="space-evenly" width="50%" flexWrap="wrap">
              <Radio
                name="email"
                mb="1.5rem"
                color="secondary"
                checked={contact_type === "email"}
                label={
                  <Typography textAlign="center" ml="6px" fontWeight="600" fontSize="18px">
                    Email
                  </Typography>
                }
                onChange={handleContactTypeChange}
              />
              <Radio
                name="sms"
                mb="1.5rem"
                color="secondary"
                checked={contact_type === "sms"}
                label={
                  <Typography textAlign="center" ml="6px" fontWeight="600" fontSize="18px">
                    SMS
                  </Typography>
                }
                onChange={handleContactTypeChange}
              />

              <Radio
                name="cell"
                mb="1.5rem"
                color="secondary"
                checked={contact_type === "cell"}
                label={
                  <Typography textAlign="center" ml="6px" fontWeight="600" fontSize="18px">
                    Cell
                  </Typography>
                }
                onChange={handleContactTypeChange}
              />
            </Box>
          </Box>

          <Box
            mx={`${width < 950 || "20px"}`}
            pb="60px"
            boxShadow="0px -10px 10px #ababab"
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Typography textAlign="center" fontSize="25px" fontWeight="700" mt="50px">
              Get the latest information on Cash
            </Typography>
            <Typography textAlign="center" fontSize="25px" fontWeight="700">
              Crusaders deals, competitions and news
            </Typography>
            <Typography textAlign="center" fontSize="16px" fontWeight="600" mt="12px">
              Hear About New Products,
            </Typography>
            <Typography textAlign="center" fontSize="16px" fontWeight="600" mt="2px">
              Be Informed First About Promotions,
            </Typography>
            <Typography textAlign="center" fontSize="16px" fontWeight="600" mt="2px">
              Get Competition Info First
            </Typography>
          </Box>
          <Box
            mx={`${width < 950 || "20px"}`}
            pb="40px"
            bg="#dcdcdc"
            boxShadow="0px -10px 10px #ababab"
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <CheckBox
              checked={isSubscribe}
              label="Subscribe to our newsletter"
              color="secondary"
              mt="50px"
              mb="1rem"
              onChange={(e) => handleSubscribeChecked(e)}
            />
            <Button
              type="submit"
              mt="20px"
              mb="1.65rem"
              variant="contained"
              color="secondary"
            >
              submit
            </Button>
          </Box>
        </form>

      </Card>
    </>
  );
}

const initialValues = {
  first_name: "",
  last_name: "",
  contact_no: "",
  email: "",
};

// const CustomOption = ({ innerProps, isDisabled, data }) => {

//   return !isDisabled ? (
//     <div {...innerProps}
//       style={{ cursor: "pointer", width: "180px" }}
//     ><img src={`https://flagcdn.com/w20/${data.code.toLowerCase()}.png`}></img>
//       {' ' + data.label}
//     </div>
//   ) : null;
// }

newPurchase.layout = VendorDashboardLayout;

export default newPurchase;
