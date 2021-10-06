import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import CheckBox from "@component/CheckBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import NavbarLayout from "@component/layout/NavbarLayout";
import Radio from "@component/radio/Radio";
import Select from "@component/Select";
import TextField from "@component/text-field/TextField";
import Typography from "@component/Typography";
import useJsonToFormData from "@customHook/useJsonToFormData";
import { Purshase_Create } from "@data/constants";
import { country_codes } from "@data/country_code";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import { useFormik } from "formik";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

type Iimage = any[];
type TIMG = any[];

function onlineSell() {
  const [items, setItems] = useState([{}]);
  const [contact_type, setContact_type] = useState("email");
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [reRender, setReRender] = useState(0);
  const [previewImage, setPreviewImage] = useState<Iimage>([[]]);
  const [images, setImages] = useState<TIMG>([[]]);

  const width = useWindowSize();

  const router = useRouter()

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

  //submit purchase data
  const handleFormSubmit = (values) => {
    console.log("values", values);
    let purchaseData = {
      first_name: values.first_name,
      last_name: values.last_name,
      contact_no: `+${values.country_code.value}${values.contact_no}`,
      email: values.email,
      street_address: values.street_address,
      contact_type: contact_type,
      is_subscribed: isSubscribe,
      items: [],
    };

    let Items = [];
    items.map((itm, id) => {
      let Item = {
        item_name: values[`item_name${id}`],
        item_price: values[`item_price${id}`],
        item_quantity: 1,
        images: images[id],
      };
      Items.push(Item);
    });
    purchaseData.items = Items;

    const [PurchaseDataToFormData] = useJsonToFormData(purchaseData);

    axios
      .post(`${Purshase_Create}`, PurchaseDataToFormData)
      .then((res) => {
        console.log("purchaserequestRes", res);
        router.push("/sell/youritems/success")
      }).catch(() => { });

    console.log("purchaseData", purchaseData);


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

    items.map((data, idx) => {
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
  items.map((itm, id) => {
    itemShema = {
      ...itemShema,
      [`item_name${id}`]: yup.string().required("required").nullable("required"),
      [`item_price${id}`]: yup.number().required("required").nullable("required"),
      [`item_image${id}`]: yup.string().required("required").nullable("required"),
    };
  });

  var checkoutSchema = yup.object().shape({
    ...itemShema,
    first_name: yup.string().required("required").nullable("required"),
    last_name: yup.string().required("required").nullable("required"),
    contact_no: yup.string().required("required").nullable("required"),
    email: yup.string().email("invalid email").required("required").nullable("required"),
  });

  const {
    values,
    errors,
    touched,
    // dirty,
    // isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  console.log("imagesssss", images);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          mt="60px"
          py="60px"
          px="50px"
          mx={`${width < 950 || "100px"}`}
          boxShadow="0px -10px 10px #ababab"
          justifyContent="center"
          alignItems="flex-start"
          display="flex"
          flexDirection="column"
        >
          <Grid container horizontal_spacing={6} vertical_spacing={4}>
            <Grid item md={12} xs={12}>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Typography fontSize="25px" fontWeight="700">
                  Your personal details
                </Typography>
                <Typography fontSize="16px" fontWeight="600" mt="12px">
                  This information is 100% secure with us.
                </Typography>
                <Typography fontSize="16px" fontWeight="600" mb="10px">
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
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                name="last_name"
                label="Last Name"
                fullwidth
                boxShadow
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name || ""}
                errorText={touched.last_name && errors.last_name}
              />
            </Grid>

            <Grid item md={6} xs={12}>

              <div style={{ display: "flex" }}>
                <Select
                  mb="1rem"
                  mt="1rem"
                  label="Country"
                  width="40%"
                  placeholder="Select Country"
                  getOptionLabelBy="label"
                  getOptionValueBy="value"
                  options={country_codes}
                  value={values.country_code || null}
                  onChange={(value) => {
                    setFieldValue("country_code", value);
                  }}
                  errorText={touched.country_code && errors.country_code}
                />
                <button style={{
                  marginRight: "-2px",
                  background: "white",
                  border: "1px solid #dbdbdb",
                  height: "40px",
                  marginTop: "43px",
                  width: "fit-content",
                  padding: "8px"
                }}
                >{"+" + values.country_code.value}</button>
                <TextField
                  mt="1rem"
                  name="contact_no"
                  label="Contact Number"
                  fullwidth
                  boxShadow
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact_no || ""}
                  errorText={touched.contact_no && errors.contact_no}
                />
              </div>

            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                mt="1rem"
                name="email"
                type="email"
                label="Email Address"
                fullwidth
                boxShadow
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email || ""}
                errorText={touched.email && errors.email}
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          mx={`${width < 950 || "100px"}`}
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
                  <Typography fontSize="25px" fontWeight="700" mt="40px">
                    Which area do you live or work in?
                  </Typography>
                  <Typography fontSize="16px" fontWeight="600" mt="12px">
                    Let us find the branches closest to you.
                  </Typography>
                  <Typography fontSize="16px" fontWeight="600" mb="15px">
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
          pb="120px"
          mx={`${width < 950 || "100px"}`}
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
            <Typography fontSize="25px" fontWeight="700" mt="20px">
              Tell us about your items
            </Typography>
            <Typography fontSize="16px" fontWeight="600" mt="12px">
              Provide as much detail as possible to help us give you an accurate
              quote.
            </Typography>
          </Box>
          {items.map((item, idx) => {
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
                      type="number"
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
          mx={`${width < 950 || "100px"}`}
          pb="40px"
          bg="#dcdcdc"
          boxShadow="0px -10px 10px #ababab"
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Typography fontSize="25px" fontWeight="700" mt="50px">
            How would you like us to contact you?
          </Typography>
          <Typography fontSize="16px" fontWeight="600" mt="12px" mb="50px">
            Once an agent has valued your items, we will contact you with a
            quote and the next steps.
          </Typography>

          <Box display="flex" justifyContent="space-evenly" width="50%">
            <Radio
              name="email"
              mb="1.5rem"
              color="secondary"
              checked={contact_type === "email"}
              label={
                <Typography ml="6px" fontWeight="600" fontSize="18px">
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
                <Typography ml="6px" fontWeight="600" fontSize="18px">
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
                <Typography ml="6px" fontWeight="600" fontSize="18px">
                  Cell
                </Typography>
              }
              onChange={handleContactTypeChange}
            />
          </Box>
        </Box>

        <Box
          mx={`${width < 950 || "100px"}`}
          pb="60px"
          boxShadow="0px -10px 10px #ababab"
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Typography fontSize="25px" fontWeight="700" mt="50px">
            Get the latest information on Cash
          </Typography>
          <Typography fontSize="25px" fontWeight="700">
            Crusaders deals, competitions and news
          </Typography>
          <Typography fontSize="16px" fontWeight="600" mt="12px">
            Hear About New Products,
          </Typography>
          <Typography fontSize="16px" fontWeight="600" mt="2px">
            Be Informed First About Promotions,
          </Typography>
          <Typography fontSize="16px" fontWeight="600" mt="2px">
            Get Competition Info First
          </Typography>
        </Box>
        <Box
          mx={`${width < 950 || "100px"}`}
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
    </>
  );
}

const initialValues = {
  first_name: "",
  last_name: "",
  contact_no: "",
  email: "",
  country_code: {
    code: "BD",
    label: "Bangladesh",
    value: "880"
  },
};

onlineSell.layout = NavbarLayout;

export default onlineSell;
