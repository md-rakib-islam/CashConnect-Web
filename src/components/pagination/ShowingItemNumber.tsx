import { useRouter } from 'next/router'
import React from 'react'


function ShowingItemNumber({ initialNumber = 9, totalItem }) {

    const router = useRouter()
    const { size, page } = router.query

    return (
        <>
            {(page && size) ? ((page * size) > totalItem ? totalItem : (page * size)) : 1}-{(page && size) ? (((page * size) + (initialNumber)) > totalItem ? totalItem : ((page * size) + (initialNumber))) : initialNumber > totalItem ? totalItem : initialNumber}
        </>
    )
}

export default ShowingItemNumber