import Select from '@component/Select';
import { SemiSpan } from '@component/Typography';
import { product_per_page_options } from '@data/data';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as yup from "yup";

function PaginationRow({ product_per_page_option = product_per_page_options, name = "product" }) {

    const router = useRouter()

    useEffect(() => {
        if (router.query.size) {
            setFieldValue("productPerPage", router.query.size);
        }
    }, [router.query.size])

    const initialValues = {
        productPerPage: product_per_page_option[0],
    }

    const handleFormSubmit = () => { }

    const {
        values,
        errors,
        touched,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: checkoutSchema,
        onSubmit: handleFormSubmit,
    });

    return (
        <div style={{ display: "flex", width: "fit-contect", flexWrap: "nowrap", alignItems: "center" }}>
            <SemiSpan>{name} Per Page</SemiSpan>
            <Select
                width="80px"
                ml="1rem"
                options={product_per_page_option}
                value={values.productPerPage || ""}
                onChange={(productPerPage: any) => {
                    setFieldValue("productPerPage", productPerPage);
                    const query = router.query
                    router.push({
                        pathname: `${router.pathname}`,
                        query: { ...query, size: productPerPage.id },
                    })
                }}
                errorText={touched.productPerPage && errors.productPerPage}
            />
        </div>
    )
}

export default PaginationRow

const checkoutSchema = yup.object().shape({})
