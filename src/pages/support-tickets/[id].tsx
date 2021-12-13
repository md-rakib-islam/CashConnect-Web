import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextArea from "@component/textarea/TextArea";
import Typography, { H5, SemiSpan } from "@component/Typography";
import useUserInf from "@customHook/useUserInf";
import { BASE_URL, Ticket_Details_All, Ticket_Details_Create } from "@data/constants";
import { ticketfileExtension } from "@data/data";
import axios from "axios";
import { format } from "date-fns";
import { useFormik } from "formik";
import jsonToFormData from "helper/jsonToFormData";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import TicketImage from "./TicketImage";

const PaymentMethodEditor = () => {

  const [attachment, setAttachment] = useState<any>("")

  const [messagelist, setMessagelist] = useState([])
  const [reloadMessage, setReloadMessage] = useState(0)

  const router = useRouter()
  const { id } = router.query

  const { user_id, authTOKEN } = useUserInf()

  useEffect(() => {
    if (id) {
      axios.get(`${Ticket_Details_All}${id}`).then(res => {
        console.log("Ticket_Details_AllRes", res)
        setFieldValue("message", "")
        setMessagelist(res?.data?.ticket_details)
      }).catch(() => { })
    }
  }, [id, reloadMessage])



  const handleFormSubmit = async () => {
    console.log(values);

    const data = {
      ticket: id,
      message: values.message,
      customer: user_id,
      file: attachment,
    }
    console.log("data", data)

    const [ticketDetailsFormData] = jsonToFormData(data)

    axios.post(`${Ticket_Details_Create}`, ticketDetailsFormData, authTOKEN).then(res => {
      console.log("ticketDetailsRes", res)
      res?.data?.id && setReloadMessage(Math.random())
    }).catch(() => { })
  };

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
    <div>

      <DashboardPageHeader
        iconName="support"
        title="Support Ticket"
        button={
          <Link href="/support-tickets">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Support Ticket
            </Button>
          </Link>
        }
      />


      {messagelist.map((item) => (
        <FlexBox mb="30px" key={item.id} style={{ direction: item?.customer ? "rtl" : "ltr" }}>
          <Avatar src={
            `${item?.customer_image ? `${item?.customer_image !== "/media/" ? `${BASE_URL}${item?.customer_image}` : null}` : (item?.admin_image ? `${item?.admin_image != "/media/" ? `${BASE_URL}${item?.admin_image}` : null}` : "")}`
          } mr={item?.admin && "1rem"} ml={item?.customer && "1rem"} />
          <Box>
            <H5 fontWeight="600" mt="0px" mb="0px">
              {item?.customer || item?.admin}
            </H5>
            <SemiSpan style={{ direction: "ltr" }}>
              <pre style={{ margin: "0px", wordSpacing: "-5px", textAlign: item?.customer ? "right" : "left" }}>{item?.created_at && format(new Date(item?.created_at), "hh:mm:a | dd MMM yyyy")}</pre>
            </SemiSpan>
            <Box borderRadius="10px" bg="gray.200" p="1rem" mt="1rem" style={{
              whiteSpace: "pre",
              textAlign: "left",
              direction: "ltr"
            }}>
              {item?.message}
            </Box>

            {item?.file && (<TicketImage file={item.file} />)}
          </Box>
        </FlexBox>
      ))}

      <Divider mb="2rem" bg="gray.300" />
      <form onSubmit={handleSubmit}>
        <TextArea
          name="message"
          placeholder="Write your message here..."
          rows={8}
          borderRadius={8}
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.message || ""}
          errorText={touched.message && errors.message}
        />

        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            minHeight="100px"
            paddingLeft="12px"
            border="1px dashed"
            borderColor="gray.400"
            borderRadius="10px"
            transition="all 250ms ease-in-out"
            mb="1.5rem"
            style={{ outline: "none" }}
          >

            <Typography color="gray.700" fontSize="20px" fontWeight="bold" mb="5px">
              Attachment
            </Typography>

            <input
              // className="hidden"
              onChange={async (e) => {
                const reader: any = new FileReader();
                reader.onload = () => {
                  // if (reader.readyState === 2) {
                  //     setPreviewImage(reader.result);
                  // }
                };
                reader.readAsDataURL(e.target.files[0]);

                const file = e.target.files[0];
                setAttachment(file);
                // onChange(file);
              }}
              id="profile-image"
              accept={ticketfileExtension}
              type="file"
            />

            <Typography mt="5px" mb="5px">
              {`(Allowed File Extensions: ${ticketfileExtension.replace(/\./g, "")}`}
            </Typography>

          </Box>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          ml="auto"
          type="submit"
        // onClick={() => handleFormSubmit()}
        >
          Post message
        </Button>
      </form>
    </div>
  );
};


const initialValues = {
  message: "",
};

const checkoutSchema = yup.object().shape({
  message: yup.string().required("required"),
});


// const messageListss = [
//   {
//     imgUrl: "/assets/images/faces/face-7.jpg",
//     name: "Esther Howard",
//     date: "2020-12-14T08:39:58.219Z",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum velit amet, aliquam massa tellus. Condimentum sit at pharetra, congue. Sit mattis amet nec pharetra odio. Interdum lorem vestibulum et amet et duis placerat. Ac mattis massa duis mi tellus sed. Mus eget in fames urna, ornare nunc, tincidunt tincidunt interdum. Amet aliquet pharetra rhoncus scelerisque pulvinar dictumst at sit. Neque tempor tellus ac nullam. Etiam massa tempor eu risus fusce aliquam.",
//   },
//   {
//     imgUrl: "/assets/images/faces/10.jpg",
//     name: "Ralph Edwards",
//     date: "2021-01-05T05:39:58.219Z",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum velit amet, aliquam massa tellus. Condimentum sit at pharetra, congue. Sit mattis amet nec pharetra odio. Interdum lorem vestibulum et amet et duis placerat.",
//   },
//   {
//     imgUrl: "/assets/images/faces/face-7.jpg",
//     name: "Esther Howard",
//     date: "2021-01-14T08:39:58.219Z",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nunc, lectus mi ornare. Bibendum proin euismod nibh tellus, phasellus.",
//   },
// ];

PaymentMethodEditor.layout = DashboardLayout;

export default PaymentMethodEditor;
