import { useRouter } from 'next/router'
import React from 'react'


function ShowingItemNumber({ initialNumber = 12, totalItem }) {

    const router = useRouter()
    const { size = initialNumber, page = 1 }: any = router.query

    return (
        <>
            {((page * size) - size + 1) > totalItem ? 0 : ((page * size) - size + 1)}-{(page * size) > totalItem ? totalItem : (page * size)}
        </>
    )
}

export default ShowingItemNumber