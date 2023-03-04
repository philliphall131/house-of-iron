import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ironAPI from '../../utils/ironAPI';
import AuthContext from '../../utils/AuthContext';

const NavBar = () => {
  const { state, dispatch } = useContext(AuthContext);

  const logout = ()=>{
    ironAPI.logout(state.userToken)
    dispatch({ type: 'SIGN_OUT' })
  }

  return (
    <div className="my-nav-container">
      <div className="my-nav-brand">
        <Link to="/">
          <div className="my-nav-item brand-text">
            House of Iron
          </div>
        </Link>
      </div>
      <div className="my-nav">
        {state.user ?
          <>
            <Link to="/dashboard">
              <div className="my-nav-item">
                Dashboard
              </div>
            </Link>
            <Link to="/account">
              <div className="my-nav-item">
                My Account
              </div>
            </Link>
            <Link to="/login">
              <div className="my-nav-item right-item" onClick={logout}>
                Logout
              </div>
            </Link>
          </> :
          <>
            <Link to="/signup">
              <div className="my-nav-item">
                Sign Up
              </div>
            </Link>
            <Link to="/login">
              <div className="my-nav-item right-item">
                Login
              </div>
            </Link>
          </>
        }
      </div>
    </div>
  )
}

export default NavBar