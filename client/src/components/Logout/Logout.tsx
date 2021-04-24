import { IconButton, Icon } from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { FiLogOut } from 'react-icons/fi';

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
            icon={<Icon as={FiLogOut} color="brand.orange" />}
            color="brand.orange"
            size="md"
            border="1px solid black"
            borderColor="brand.orange"
            background="transparent"
        >
            Logout
        </IconButton>
    );
};

export default Logout;
