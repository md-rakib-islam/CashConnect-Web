import Box from '@component/Box'
import Modal from '@component/modal/Modal'
import Login from '@component/sessions/Login'
import React from 'react'

interface LoginPopupProps {
    open: boolean,
    closeLoginDialog?: any,
}
const LoginPopup: React.FC<LoginPopupProps> = ({ open = false, closeLoginDialog }) => {
    return (

        <Modal open={open} onClose={closeLoginDialog}>
            <Box>
                <Login type="popup" closeLoginDialog={closeLoginDialog} />
            </Box>
        </Modal>
    )
}

export default LoginPopup