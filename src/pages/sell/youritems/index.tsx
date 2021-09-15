import Box from "@component/Box";
import Button from "@component/buttons/Button";
import CheckBox from "@component/CheckBox";
import Grid from "@component/grid/Grid";
import NavbarLayout from "@component/layout/NavbarLayout";
import Radio from "@component/radio/Radio";
import TextField from "@component/text-field/TextField";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

function onlineSell() {
  const [items, setItems] = useState([{}]);
  const [contact_type, setContact_type] = useState("email");
  const [reRender, setReRender] = useState(0);

  const width = useWindowSize();

  const handleFormSubmit = (values) => {};

  const handleContactTypeChange = ({ target: { name } }) => {
    setContact_type(name);
  };

  const addItem = () => {
    console.log("additem", items);
    let newItems = items;
    newItems.push({});
    setItems(newItems);
    setReRender(Math.random());
  };

  const removeItem = (id) => {
    let NewItems = items;
    NewItems.splice(id, 1);
    setItems(NewItems);
    setReRender(Math.random());
  };

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
  return (
    <>
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
            <TextField
              name="contact_no"
              label="Contact Number"
              fullwidth
              boxShadow
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contact_no || ""}
              errorText={touched.contact_no && errors.contact_no}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
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
          <Grid container horizontal_spacing={6} vertical_spacing={4} pt="60px">
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
              {}
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
        {items.map((item, id) => {
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
                    name={`item_name${id}`}
                    label="Item Name"
                    fullwidth
                    boxShadow
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[`item_name${id}`] || ""}
                    errorText={
                      touched[`item_name${id}`] && errors[`item_name${id}`]
                    }
                  />
                </Box>
                <Box width="80%" mt="25px">
                  <TextField
                    name={`item_price${id}`}
                    label="Item Price"
                    fullwidth
                    boxShadow
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[`item_price${id}`] || ""}
                    errorText={
                      touched[`item_price${id}`] && errors[`item_price${id}`]
                    }
                  />
                </Box>
                <Box width="80%" mt="25px">
                  <TextField
                    name={`item_quantity${id}`}
                    label="Item Quantity"
                    fullwidth
                    boxShadow
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[`item_quantity${id}`] || ""}
                    errorText={
                      touched[`item_quantity${id}`] &&
                      errors[`item_quantity${id}`]
                    }
                  />
                </Box>

                <input
                  type="file"
                  id="file"
                  style={{ marginTop: "100px" }}
                  name={`image`}
                  multiple
                />

                {items.length !== 1 && (
                  <Button
                    mt="50px"
                    mb="1.65rem"
                    variant="contained"
                    color="error"
                    onClick={() => removeItem(id)}
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
          Once an agent has valued your items, we will contact you with a quote
          and the next steps.
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
          label="Subscribe to our newsletter"
          color="secondary"
          mt="50px"
          mb="1rem"
          // onChange={handleCheckboxChange(values, setFieldValue)}
        />
        <Button
          type="submit"
          mt="20px"
          mb="1.65rem"
          variant="contained"
          color="secondary"
          onClick={addItem}
        >
          submit
        </Button>
      </Box>
    </>
  );
}

const initialValues = {
  first_name: "",
  last_name: "",
  contact_no: "",
  email: "",
};

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  contact_no: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
});

onlineSell.layout = NavbarLayout;

export default onlineSell;
