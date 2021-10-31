import Box from '@component/Box'
import Modal from '@component/modal/Modal'
import React from 'react'
import Signup from './sessions/Signup'

interface SignupPopupProps {
    open: boolean,
    closeSignupDialog?: any,
}
const SignupPopup: React.FC<SignupPopupProps> = ({ open = false, closeSignupDialog }) => {
    return (

        <Modal open={open} onClose={closeSignupDialog}>
            <Box>
                <Signup type="popup" closeSignupDialog={closeSignupDialog} />
            </Box>
        </Modal>
    )
}

export default SignupPopup