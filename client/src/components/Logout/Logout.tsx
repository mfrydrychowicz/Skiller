import { IconButton, Icon } from '@chakra-ui/react';
import { Redirect, withRouter } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { FiLogOut } from 'react-icons/fi';
import { ArrowBackIcon } from '@chakra-ui/icons';

const Logout = () => {
    const onUserLogout = async () => {
        try {
            await auth.signOut();
            return <Redirect to="/" />;
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <IconButton
            aria-label="Logout"
            onClick={() => onUserLogout()}
            variant="outline"
            bgColor="whiteAlpha.100"
            icon={<Icon as={FiLogOut} color="brand.orange" />}
        >
            Logout
        </IconButton>
    );
};

export default Logout;
