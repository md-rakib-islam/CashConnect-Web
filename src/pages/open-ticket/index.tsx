import Box from '@component/Box';
import Button from '@component/buttons/Button';
import Capcha from '@component/Capcha';
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import CustomerDashboardLayout from '@component/layout/CustomerDashboardLayout';
import DashboardPageHeader from '@component/layout/DashboardPageHeader';
import Select from '@component/Select';
import TextField from "@component/text-field/TextField";
import TextArea from "@component/textarea/TextArea";
import Typography from '@component/Typography';
import { useAppContext } from '@context/app/AppContext';
import useUserInf from '@customHook/useUserInf';
import { Ticket_Create, Ticket_Department_All, Ticket_Priority_All, User_By_Id } from '@data/constants';
import { ticketfileExtension } from '@data/data';
import axios from 'axios';
import { useFormik } from "formik";
import jsonToFormData from 'helper/jsonToFormData';
import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";

function OpenTicket() {

    const [attachment, setAttachment] = useState<any>("")
    const [departmets, setDepartmets] = useState([])
    const [priorities, setPriorities] = useState([])
    const [isValidCapha, setIsValidCapha] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user_id, authTOKEN } = useUserInf()

    const { dispatch } = useAppContext()
    const router = useRouter()

    const handleFormSubmit = async (values) => {
        if (isValidCapha) {
            const data = {
                ...values,
                ticket_department: typeof values.ticket_department != "object" ? values?.ticket_department : values?.ticket_department?.id,
                ticket_priority: typeof values.ticket_priority != "object" ? values?.ticket_priority : values?.ticket_priority?.id,
                // user: user_id,
                file: attachment,
            }
            const [ticketFormData] = jsonToFormData(data)

            setLoading(true)

            axios.post(`${Ticket_Create}`, ticketFormData, authTOKEN).then(res => {
                console.log("ticketRes", res)
                setLoading(false)
                if (res?.data?.id) {
                    dispatch({
                        type: "CHANGE_ALERT",
                        payload: {
                            alertValue: "success...",
                        }
                    })
                    router.push("/support-tickets")
                }
                else {
                    dispatch({
                        type: "CHANGE_ALERT",
                        payload: {
                            alertValue: "something went wrong",
                            alerType: "error",
                        }
                    })
                }

            }).catch(() => {
                setLoading(false)
                dispatch({
                    type: "CHANGE_ALERT",
                    payload: {
                        alertValue: "something went wrong",
                        alerType: "error",
                    }
                })
                console.log("data", data);
            })
        }
    };

    useEffect(() => {
        if (user_id) {
            axios.get(`${User_By_Id}${user_id}`).then(res => {
                console.log("userInf", res)
                setFieldValue("name", `${res?.data?.first_name}${' '}${res?.data?.last_name}`)
                setFieldValue("email", res?.data?.email)
            }).catch((err) => { console.log("error", err) })

            axios.get(`${Ticket_Department_All}`).then(res => {
                console.log("departmets", res)
                setDepartmets(res?.data?.ticket_departments)
            }).catch((err) => { console.log("error", err) })

            axios.get(`${Ticket_Priority_All}`).then(res => {
                console.log("priorities", res)
                setPriorities(res?.data?.ticket_priorities)
            }).catch((err) => { console.log("error", err) })
        }
    }, [user_id])


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
                        height: "50px",
                        width: "50px",
                        marginTop: "100pz"
                    }}
                        src="/assets/images/gif/loading.gif" />
                </div>
            )}
            <DashboardPageHeader title="Open Ticket" iconName="support"
                button={
                    <Link href="/support-tickets">
                        <a>
                            <Button color="primary" bg="primary.light" px="2rem">
                                Back To Support Ticket List
                            </Button>
                        </a>
                    </Link>
                } />
            <Card p="30px">

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={6}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                name="name"
                                label="Name"
                                placeholder="Name"
                                fullwidth
                                readOnly
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name || ""}
                                errorText={touched.name && errors.name}
                                style={{ cursor: "no-drop" }}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                name="email"
                                label="Email Address"
                                placeholder="Email"
                                fullwidth
                                readOnly
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email || ""}
                                errorText={touched.email && errors.email}
                                style={{ cursor: "no-drop" }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="subject"
                                label="Subject"
                                placeholder="Subject"
                                fullwidth
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.subject || ""}
                                errorText={touched.subject && errors.subject}
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <Select
                                label="Department"
                                placeholder="Select Department"
                                options={departmets}
                                value={values.ticket_department || ""}
                                onChange={(ticket_department) => {
                                    setFieldValue("ticket_department", ticket_department);
                                }}
                                errorText={touched.ticket_department && errors.ticket_department}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Select
                                label="Priority"
                                placeholder="Select Priority"
                                options={priorities}
                                value={values.ticket_priority || ""}
                                onChange={(ticket_priority) => {
                                    setFieldValue("ticket_priority", ticket_priority);
                                }}
                                errorText={touched.ticket_priority && errors.ticket_priority}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextArea
                                name="message"
                                label="Message"
                                placeholder="Message"
                                rows={6}
                                fullwidth
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.message || ""}
                                errorText={touched.message && errors.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                minHeight="150px"
                                paddingLeft="20px"
                                border="1px dashed"
                                borderColor="gray.400"
                                borderRadius="10px"
                                transition="all 250ms ease-in-out"
                                style={{ outline: "none" }}
                            >

                                <Typography color="gray.700" fontSize="20px" fontWeight="bold" mb="15px" mt="15px">
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


                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                minHeight="150px"
                                paddingLeft="20px"
                                paddingBottom="10px"
                                border="1px dashed"
                                borderColor="gray.400"
                                borderRadius="10px"
                                transition="all 250ms ease-in-out"
                                style={{ outline: "none" }}
                            >

                                <Typography color="gray.700" fontSize="25px" fontWeight="bold" mb="15px" mt="10px">
                                    Spam Bot Varification
                                </Typography>

                                <Typography mb="15px">
                                    Please enter the character you see in the image below into the text box provider. This is required to prevent automatic submissions.
                                </Typography>

                                <Capcha setValid={setIsValidCapha} />

                            </Box>
                        </Grid>

                    </Grid>
                    <Button
                        mt="25px"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Card>
        </>
    )
}

const initialValues = {
    name: "",
    email: "",
    subject: "",
    ticket_department: "",
    ticket_priority: "",
    message: "",
};

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().required("required"),
    subject: yup.string().required("required"),
    ticket_department: yup.object().required("required"),
    ticket_priority: yup.object().required("required"),
    message: yup.string().required("required"),
});

OpenTicket.layout = CustomerDashboardLayout;

export default OpenTicket
