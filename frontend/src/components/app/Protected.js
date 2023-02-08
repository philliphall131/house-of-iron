import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';

const Protected = ({page}) => {
    const { state } = useContext(AuthContext);

    if (state.user && state.isLoading === false){
        return page
    }

    return (
        <Navigate to="/signup" replace={true}/>
    )
}

export default Protected