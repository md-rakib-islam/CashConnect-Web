import { requred } from '@data/data';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import Button from './buttons/Button';
import TextField from './text-field/TextField';

interface CapchaProps {
    setValid: React.Dispatch<React.SetStateAction<boolean>>
}

const Capcha: React.FC<CapchaProps> = ({ setValid }) => {
    const capchaText = "abcdefghigklmnopqrstuvwxyz123456789ABCDEFGHIIJKLMNOPQRSTUVWXYZ123456789abcdefghigklmnoPQRSTUVWXYZ123456789"

    const position1: any = (Math.random() * 100 / 10) * 10
    const position2: any = (Math.random() * 100 / 10) * 10
    const position3: any = (Math.random() * 100 / 10) * 10
    const position4: any = (Math.random() * 100 / 10) * 10
    const position5: any = (Math.random() * 100 / 10) * 10
    const position6: any = (Math.random() * 100 / 10) * 10

    const charactor1 = capchaText.slice(parseInt(position1), parseInt(position1 + 1))
    const charactor2 = capchaText.slice(parseInt(position2), parseInt(position2 + 1))
    const charactor3 = capchaText.slice(parseInt(position3), parseInt(position3 + 1))
    const charactor4 = capchaText.slice(parseInt(position4), parseInt(position4 + 1))
    const charactor5 = capchaText.slice(parseInt(position5), parseInt(position5 + 1))
    const charactor6 = capchaText.slice(parseInt(position6), parseInt(position6 + 1))

    const [capcha, setCapcha] = useState(`${charactor1}${charactor2}${charactor3}${charactor4}${charactor5}${charactor6}`)
    const [capchaValid, setCapchaValid] = useState(false)

    const handleFormSubmit = () => { }

    const checkCapcha = (e) => {
        if (capcha == e.target.value) {
            setCapchaValid(true)
        }
        else {
            setCapchaValid(false)
        }
    }

    useEffect(() => {
        setValid(capchaValid)
    }, [capchaValid])



    const {
        values,
        // touched,
        handleChange,
        handleBlur,
        // handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: checkoutSchema,
        onSubmit: handleFormSubmit,
    });


    return (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "fit-content" }}>
            {/* <img src="/assets/images/gif/capcha.gif" style={{ width: "100px", height: "30px", borderRadius: "3px" }} /> */}
            <span style={{ backgroundImage: "url(/assets/images/gif/capcha.gif)", fontSize: "20px", fontWeight: "bold", padding: "4px 5px", borderRadius: "5px", height: "40px", margin: "3px" }}>
                {capcha}
            </span>
            <TextField
                m="3px"
                name="capcha"
                errorColor={capchaValid && "green"}
                onBlur={handleBlur}
                onChange={(e) => {
                    handleChange(e)
                    checkCapcha(e)
                }}
                value={values.capcha || ""}
                errorText={capchaValid ? "Correct" : (values.capcha ? "Incorrect" : "requred")}
                style={{ width: "100px !important" }}
            />
            <Button
                m="3px"
                variant="outlined"
                color="primary"
                type="button"
                onClick={() => {
                    setFieldValue("capcha", "")
                    setCapcha(`${charactor1}${charactor2}${charactor3}${charactor4}${charactor5}${charactor6}`)
                    setCapchaValid(false)
                }}
            >
                Refresh
            </Button>
        </div>
    )
}


const initialValues = {
    capcha: "",
};

const checkoutSchema = yup.object().shape({
    capcha: yup.string().required("required").nullable(requred),
});

export default Capcha
