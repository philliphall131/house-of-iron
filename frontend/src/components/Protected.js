import { Navigate } from 'react-router-dom';

const Protected = ({page, state}) => {

    if (state.user && state.isLoading === false){
        return page
    }

    return (
        <Navigate to="/signup" replace={true}/>
    )
}

export default Protected