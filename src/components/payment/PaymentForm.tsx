import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import { Customer_Order_Confirm, User_By_Id } from "@data/constants";
import { requred } from "@data/data";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as yup from "yup";
import useWindowSize from "../../hooks/useWindowSize";
import Box from "../Box";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Radio from "../radio/Radio";
import TextField from "../text-field/TextField";
import Typography from "../Typography";

type PaymentFormProps = {
  Subtotal: any;
};

const PaymentForm: React.FC<PaymentFormProps> = ({ Subtotal }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [setInRef, setSetInRef] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const [userName, setuserName] = useState("");
  const { dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);

  const width = useWindowSize();
  const isMobile = width < 769;

  const router = useRouter();

  const { user_id, authTOKEN, order_Id, isLogin } = useUserInf();

  const cardNumberRef = useRef();
  const cardHolderRef = useRef();
  const cvcCodeRef = useRef();
  const expiryDateRef = useRef();
  const paypalEmailRef = useRef();
  const bkashNoRef = useRef();
  const rocketNoRef = useRef();
  const nagadNoRef = useRef();
  const confirmedOrderRes = useRef(false);

  const useKeys = {
    payment_mathod: null,
    card_number: null,
    card_holder: null,
    cvc_code: null,
    expiry_date: null,
    email: null,
    bkash: null,
    rocket: null,
    nagad: null,
  };
  const handleLoadingComplete = () => {
    setLoading(false);
  };
  useEffect(() => {
    router.events.on("routeChangeComplete", handleLoadingComplete);
  }, [router.events]);

  const closeLoginTab = () => {
    setOpenLogin(false);
  };

  useEffect(() => {
    if (isLogin) {
      axios
        .get(`${User_By_Id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("jwt_access_token"),
          },
        })
        .then((res) => {
          console.log("resUseer", res);
          setuserName(res?.data?.username);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [isLogin]);

  useLayoutEffect(() => {
    cardNumberRef.current = values.card_number;
    cardHolderRef.current = values.card_holder;
    cvcCodeRef.current = values.cvc_code;
    expiryDateRef.current = values.expiry_date;
    paypalEmailRef.current = values.email;
    bkashNoRef.current = values.bkash;
    rocketNoRef.current = values.rocket;
    nagadNoRef.current = values.nagad;
  }, [setInRef]);

  useEffect(() => {
    for (let key in useKeys) {
      var value = localStorage.getItem(`${key}`);
      setFieldValue(`${key}`, value);
    }
    const payment_Method = localStorage.getItem("payment_mathod");
    setPaymentMethod(payment_Method);
  }, []);

  useEffect(() => {
    return () => {
      console.log("paymentComponentUnMounted");

      if (!confirmedOrderRes.current) {
        paymentMethod && localStorage.setItem("payment_mathod", paymentMethod);

        cardNumberRef.current &&
          localStorage.setItem("card_number", cardNumberRef.current);

        cardHolderRef.current &&
          localStorage.setItem("card_holder", cardHolderRef.current);

        cvcCodeRef.current &&
          localStorage.setItem("cvc_code", cvcCodeRef.current);

        expiryDateRef.current &&
          localStorage.setItem("expiry_date", expiryDateRef.current);

        paypalEmailRef.current &&
          localStorage.setItem("email", paypalEmailRef.current);

        bkashNoRef.current && localStorage.setItem("bkash", bkashNoRef.current);

        rocketNoRef.current &&
          localStorage.setItem("rocket", rocketNoRef.current);

        nagadNoRef.current && localStorage.setItem("nagad", nagadNoRef.current);
      }
    };
  }, [paymentMethod]);

  const handleFormSubmit = async (values) => {
    console.log(values);
    setLoading(true);

    if (isLogin) {
      if (order_Id) {
        const pay_amount = Subtotal;

        if (paymentMethod === "card") {
          var confirmData: any = {
            user_id,
            username: userName,
            pay_amount,
            payment_method: paymentMethod,
            card_number: values.card_number,
            card_holder: values.card_holder,
            cvc_code: values.cvc_code,
            expiry_date: values.expiry_date,
          };
        } else if (paymentMethod === "paypal") {
          var confirmData: any = {
            user_id,
            username: userName,
            pay_amount,
            payment_method: paymentMethod,
            email: values.email,
          };
        } else if (paymentMethod === "bkash") {
          var confirmData: any = {
            user_id,
            username: userName,
            pay_amount,
            payment_method: paymentMethod,
            bkash: values.bkash,
          };
        } else if (paymentMethod === "rocket") {
          var confirmData: any = {
            user_id,
            username: userName,
            pay_amount,
            payment_method: paymentMethod,
            rocket: values.rocket,
          };
        } else if (paymentMethod === "nagad") {
          var confirmData: any = {
            user_id,
            username: userName,
            pay_amount,
            payment_method: paymentMethod,
            nagad: values.nagad,
          };
        } else if (paymentMethod === "cash") {
          var confirmData: any = {
            user_id,
            username: userName,
            pay_amount,
            payment_method: paymentMethod,
          };
        }

        console.log("confirmData", confirmData);
        axios
          .post(`${Customer_Order_Confirm}${order_Id}`, confirmData, authTOKEN)
          .then((res) => {
            if (res?.data?.is_confirmed) {
              console.log("confirmOrderRes", res);
              confirmedOrderRes.current = true;
              for (let key in useKeys) {
                localStorage.removeItem(`${key}`);
              }
              dispatch({
                type: "CHANGE_CART_QUANTITY",
                payload: { chartQuantity: Math.random() },
              });

              dispatch({
                type: "CHANGE_ALERT",
                payload: {
                  alertValue: "Thank You for Your Order!",
                  alerType: "successOrder",
                },
              });
              setLoading(false);

              // localStorage.removeItem("OrderId");

              router.push("/orders");
            }
          })
          .catch((err) => {
            setLoading(false);

            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alertValue: `${err.response.data.detail}`,
                alerType: "error",
              },
            });
          });
      }
    } else {
      setOpenLogin(true);
    }
  };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  if (paymentMethod === "card") {
    var checkoutSchema: any = yup.object().shape({
      card_holder: yup.string().required("required").nullable(requred),
      expiry_date: yup.date().required("required").nullable(requred),
      cvc_code: yup.string().required("required").nullable(requred),
      card_number: yup.string().required("required").nullable(requred),
    });
  } else if (paymentMethod === "paypal") {
    var checkoutSchema: any = yup.object().shape({
      email: yup.string().required("required").nullable(requred),
    });
  } else if (paymentMethod === "bkash") {
    var checkoutSchema: any = yup.object().shape({
      bkash: yup.string().required("required").nullable(requred),
    });
  } else if (paymentMethod === "rocket") {
    var checkoutSchema: any = yup.object().shape({
      rocket: yup.string().required("required").nullable(requred),
    });
  } else if (paymentMethod === "nagad") {
    var checkoutSchema: any = yup.object().shape({
      nagad: yup.string().required("required").nullable(requred),
    });
  } else {
    var checkoutSchema: any = yup.object().shape({});
  }

  var {
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
    <Fragment>
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />
      {loading && (
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: " rgb(0 0 0 / 50%)",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <img
            style={{
              height: "100px",
              width: "100px",
              marginTop: "100pz",
            }}
            src="/assets/images/gif/loading.gif"
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Card1 mb="2rem">
          <Radio
            name="card"
            mb="1.5rem"
            color="secondary"
            checked={paymentMethod === "card"}
            label={
              <Typography ml="6px" fontWeight="600" fontSize="18px">
                Pay with credit card
              </Typography>
            }
            onChange={handlePaymentMethodChange}
          />

          <Divider mb="1.25rem" mx="-2rem" />

          {paymentMethod === "card" && (
            <div>
              <Box mb="1.5rem">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="card_number"
                      label="Card Number"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setSetInRef(Math.random());
                      }}
                      value={values.card_number || ""}
                      errorText={touched.card_number || errors.card_number}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="expiry_date"
                      type="date"
                      label="Exp Date"
                      placeholder="MM/YY"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setSetInRef(Math.random());
                      }}
                      value={values.expiry_date || ""}
                      errorText={touched.expiry_date && errors.expiry_date}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="card_holder"
                      label="Name on Card"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setSetInRef(Math.random());
                      }}
                      value={values.card_holder || ""}
                      errorText={touched.card_holder && errors.card_holder}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="cvc_code"
                      label="CVC code"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setSetInRef(Math.random());
                      }}
                      value={values.cvc_code || ""}
                      errorText={touched.cvc_code && errors.cvc_code}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider mb="1.5rem" mx="-2rem" />
            </div>
          )}

          <Radio
            name="paypal"
            mb="1.5rem"
            color="secondary"
            checked={paymentMethod === "paypal"}
            label={
              <Typography ml="6px" fontWeight="600" fontSize="18px">
                Pay with Paypal
              </Typography>
            }
            onChange={handlePaymentMethodChange}
          />
          <Divider mb="1.5rem" mx="-2rem" />

          {paymentMethod === "paypal" && (
            <Fragment>
              <FlexBox alignItems="flex-end" mb="30px">
                <TextField
                  name="email"
                  label="Paypal Email"
                  type="email"
                  onChange={(e) => {
                    handleChange(e);
                    setSetInRef(Math.random());
                  }}
                  value={values.email || ""}
                  errorText={touched.email && errors.email}
                  mr={isMobile ? "1rem" : "30px"}
                  fullwidth
                />
              </FlexBox>

              <Divider mb="1.5rem" mx="-2rem" />
            </Fragment>
          )}

          <Radio
            name="bkash"
            mb="1.5rem"
            color="secondary"
            checked={paymentMethod === "bkash"}
            label={
              <Typography ml="6px" fontWeight="600" fontSize="18px">
                Pay with Bkash
              </Typography>
            }
            onChange={handlePaymentMethodChange}
          />
          <Divider mb="1.5rem" mx="-2rem" />

          {paymentMethod === "bkash" && (
            <Fragment>
              <FlexBox alignItems="flex-end" mb="30px">
                <TextField
                  name="bkash"
                  label="Bkash Number"
                  onChange={(e) => {
                    handleChange(e);
                    setSetInRef(Math.random());
                  }}
                  value={values.bkash || ""}
                  errorText={touched.bkash && errors.bkash}
                  mr={isMobile ? "1rem" : "30px"}
                  fullwidth
                />
              </FlexBox>

              <Divider mb="1.5rem" mx="-2rem" />
            </Fragment>
          )}

          <Radio
            name="rocket"
            mb="1.5rem"
            color="secondary"
            checked={paymentMethod === "rocket"}
            label={
              <Typography ml="6px" fontWeight="600" fontSize="18px">
                Pay with Rocket
              </Typography>
            }
            onChange={handlePaymentMethodChange}
          />
          <Divider mb="1.5rem" mx="-2rem" />

          {paymentMethod === "rocket" && (
            <Fragment>
              <FlexBox alignItems="flex-end" mb="30px">
                <TextField
                  name="rocket"
                  label="Rocket Number"
                  onChange={(e) => {
                    handleChange(e);
                    setSetInRef(Math.random());
                  }}
                  value={values.rocket || ""}
                  errorText={touched.rocket && errors.rocket}
                  mr={isMobile ? "1rem" : "30px"}
                  fullwidth
                />
              </FlexBox>

              <Divider mb="1.5rem" mx="-2rem" />
            </Fragment>
          )}

          <Radio
            name="nagad"
            mb="1.5rem"
            color="secondary"
            checked={paymentMethod === "nagad"}
            label={
              <Typography ml="6px" fontWeight="600" fontSize="18px">
                Pay with Nagad
              </Typography>
            }
            onChange={handlePaymentMethodChange}
          />
          <Divider mb="1.5rem" mx="-2rem" />

          {paymentMethod === "nagad" && (
            <Fragment>
              <FlexBox alignItems="flex-end" mb="30px">
                <TextField
                  name="nagad"
                  label="Nagad Number"
                  onChange={(e) => {
                    handleChange(e);
                    setSetInRef(Math.random());
                  }}
                  value={values.nagad || ""}
                  errorText={touched.nagad && errors.nagad}
                  mr={isMobile ? "1rem" : "30px"}
                  fullwidth
                />
              </FlexBox>

              <Divider mb="1.5rem" mx="-2rem" />
            </Fragment>
          )}

          <Radio
            name="cash"
            color="secondary"
            checked={paymentMethod === "cash"}
            label={
              <Typography ml="6px" fontWeight="600" fontSize="18px">
                Cash On Delivery
              </Typography>
            }
            onChange={handlePaymentMethodChange}
          />
        </Card1>

        <Grid container spacing={7}>
          <Grid item sm={6} xs={12}>
            <Link href="/checkout">
              <Button
                variant="outlined"
                color="primary"
                type="button"
                fullwidth
              >
                Back to checkout details
              </Button>
            </Link>
          </Grid>
          <Grid item sm={6} xs={12}>
            {/* <Link href="/orders"> */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              // onClick={() => handleFormSubmit(values)}
              fullwidth
            >
              Confirm
            </Button>
            {/* </Link> */}
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const initialValues = {
  card_number: "",
  card_holder: "",
  expiry_date: "",
  cvc_code: "",
  email: "",
  bkash: "+880",
  rocket: "+880",
  nagad: "+880",
};

export default PaymentForm;
