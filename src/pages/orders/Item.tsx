import Avatar from '@component/avatar/Avatar'
import Box from '@component/Box'
import Button from '@component/buttons/Button'
import Currency from '@component/Currency'
import FlexBox from '@component/FlexBox'
import Typography, { H6 } from '@component/Typography'
import { BASE_URL } from '@data/constants'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function Item({ item }) {

    const [color, _setColor] = useState("_")
    const [size, _setSize] = useState("_")

    const router = useRouter()

    useEffect(() => {
        // axios.get(`${Product_Color_By_Product_Id}${item?.product?.id}`).then(res => {
        //     console.log("color", res)
        //     setColor(res?.data?.name)
        // }).catch((err) => {console.log("error", err)})

        // axios.get(`${Product_Size_By_Product_Id}${item?.product?.id}`).then(res => {
        //     console.log("size", res)
        //     setSize(res?.data?.name)
        // }).catch((err) => {console.log("error", err)})

    }, [])

    return (
        <FlexBox
            px="1rem"
            py="0.5rem"
            flexWrap="wrap"
            alignItems="center"
            key={item?.product?.id}
        >
            <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                <Avatar src={`${BASE_URL}${item?.product?.thumbnail}`} size={64} />
                <Box ml="20px">
                    <H6 my="0px">{item?.product?.name}</H6>
                    <Typography fontSize="14px" color="text.muted" display="flex">
                        <Currency>{item?.price}</Currency> x {item?.quantity}
                    </Typography>
                </Box>
            </FlexBox>
            <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                    Product properties: {item?.product?.short_desc || "_"}, {color || "_"}, {size || "_"}
                </Typography>
            </FlexBox>
            <FlexBox flex="160px" m="6px" alignItems="center"
                onClick={() => {
                    router.push({
                        pathname: `/product/${item?.product?.id}`,
                        query: { review: "write" },
                    })
                }}>
                <Button variant="text" color="primary">
                    <Typography fontSize="14px">Write a Review</Typography>
                </Button>
            </FlexBox>
        </FlexBox>
    )
}

export default Item
