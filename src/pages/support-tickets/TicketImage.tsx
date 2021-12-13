import Card from '@component/Card'
import Icon from '@component/icon/Icon'
import LazyImage from '@component/LazyImage'
import Modal from '@component/modal/Modal'
import { BASE_URL } from '@data/constants'
import { ticketImgExtensionArr } from '@data/data'
import useWindowSize from '@hook/useWindowSize'
import { getTheme } from '@utils/utils'
import React, { memo, useCallback, useState } from 'react'
import styled from 'styled-components'


function TicketImage({ file }) {

    const width = useWindowSize();
    const isMobile = width < 769;

    const [open, setOpen] = useState(false)

    const toggleDialog = useCallback(() => {
        setOpen((open) => !open);
    }, []);

    const getExtenstion = (url: string) => {
        const fileUrlStr = url
        const extNameIndx = fileUrlStr.lastIndexOf(".")
        const extName = extNameIndx >= 0 ? fileUrlStr.slice(extNameIndx) : ""

        return extName
    }

    const showFile = (fileUrl: string) => {
        const extStr = getExtenstion(fileUrl)

        const isImage = ticketImgExtensionArr.find(url => url === extStr)

        if (isImage) {
            setOpen(true)
        }
        else {
            window.open(fileUrl)
        }
    }

    console.log("file", `${BASE_URL}${file}`)

    return (
        <>
            <StyledIcon px="10px" py="6px" size="25px" defaultcolor="auto" style={{
                cursor: "pointer",
                width: "fit-content",
                borderRadius: "10px",
            }}
                onClick={() => {
                    showFile(`${BASE_URL}${file}`)
                }}
            >
                image
            </StyledIcon>

            <Modal open={open} onClose={toggleDialog}>
                <Card p="1rem" position="relative" style={{
                    minWidth: isMobile ? "100%" : "400px", maxWidth: "100%", overflow: "hidden"
                }}>
                    <LazyImage
                        src={`${BASE_URL}${file}`}
                        width="100%"
                        height="100%"
                        layout="responsive"
                        loader={() => `${BASE_URL}${file}`}
                        alt={"not found"}
                    />

                    <div style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px"
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


export const StyledIcon = styled(Icon)`
  :hover {
      background: ${getTheme("colors.secondary.light")};
  }
`;

export default memo(TicketImage)
