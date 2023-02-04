import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';

const Dashboard = () => {
  const { state } = useContext(AuthContext);

  useEffect(()=>{
    loadPrograms()
  }, [])

  const loadPrograms = () => {
    return
  }

  return (
    <div className="dash-body">
      <div className="dash-content">
        <h1 className="dash-title">HAVE YOU LIFTED TODAY, {state.user.first_name}?</h1>
        <Link to="/program">
          <button className="dash-button">Current Program</button>
        </Link>
        <Link to="/programs">
          <button className="dash-button">View/Edit My Programs</button>
        </Link>
        <Link to="/program/new">
          <button className="dash-button">Create a New Program</button>
        </Link>
        <Link to="/dashboard">
          <button className="dash-button">History/Maxes</button>
        </Link>
        <Link to="/dashboard">
          <button className="dash-button">Account</button>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard