import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { StateContext } from '../ContextObjs';
import ironAPI from '../utils/ironAPI';

const NavBar = () => {
  const { state, dispatch } = useContext(StateContext);

  const logout = ()=>{
    ironAPI.logout(state.userToken)
    dispatch({ type: 'SIGN_OUT' })
  }

  return (
    <div className="my-nav-container">
      <div className="my-nav-brand">
        <Link className="my-nav-link brand-text" to="/">House of Iron</Link>
      </div>
      <div className="my-nav">
        {state.user ?
          <>
            <Link className="my-nav-link" to="/dashboard">
              <div className="my-nav-item">
                Dashboard
              </div>
            </Link>
            <Link className="my-nav-link" to="/login">
              <div className="my-nav-link right-item" onClick={logout}>
                Logout
              </div>
            </Link>
          </> :
          <>
            <Link className="my-nav-link" to="/signup">
              <div className="my-nav-item">
                Sign Up
              </div>
            </Link>
            <Link className="my-nav-link" to="/login">
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