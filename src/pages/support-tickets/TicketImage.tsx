import Card from '@component/Card'
import Icon from '@component/icon/Icon'
import LazyImage from '@component/LazyImage'
import Modal from '@component/modal/Modal'
import { BASE_URL } from '@data/constants'
import React, { memo, useCallback, useState } from 'react'

function TicketImage({ file }) {

    const [open, setOpen] = useState(false)

    const toggleDialog = useCallback(() => {
        setOpen((open) => !open);
    }, []);


    return (
        <>
            <Icon p="10px" size="25px" defaultcolor="currentColor" style={{
                cursor: "pointer",
                width: "fit-content"
            }}
                onClick={() => setOpen(true)}
            >
                image
            </Icon>

            <Modal open={open} onClose={toggleDialog}>
                <Card p="1rem" position="relative">
                    <LazyImage
                        src={`${BASE_URL}${file}`}
                        width="100px"
                        height="auto"
                        layout="responsive"
                        loader={() => `${BASE_URL}${file}`}
                        alt={"not found"}
                    />
                    <div style={{
                        position: "absolute",
                        left: "10px",
                        top: "5px"
                    }}>
                        <Icon
                            className="close"
                            color="primary"
                            variant="small"
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() => setOpen(false)}
                        >
                            close
                        </Icon>
                    </div>
                </Card>
            </Modal>
        </>
    )
}

export default memo(TicketImage)
