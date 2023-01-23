import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../utils/AuthContext';

const SignedIn = ({page}) => {
    const { state } = useContext(AuthContext);

    if (!state.user){
        return page
    }

    return (
        <Navigate to="/" replace={true}/>
    )
}

export default SignedIn