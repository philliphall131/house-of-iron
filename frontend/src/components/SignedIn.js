import { Navigate } from 'react-router-dom';

const SignedIn = ({page, state}) => {

    if (!state.user){
        return page
    }

    return (
        <Navigate to="/" replace={true}/>
    )
}

export default SignedIn