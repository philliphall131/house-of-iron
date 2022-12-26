import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { StateContext } from '../ContextObjs';
import { Form } from 'react-bootstrap';
import '../styles/Form.css';
import ironAPI from '../utils/ironAPI';
import weights from '../assets/weights.jpg';
import '../styles/Program.css';

const CreateWorkoutsPage1 = () => {
    const { state } = useContext(StateContext);
    const maxDuration = 26;
    const navigate = useNavigate();

    return (
      <div>
        <img className="header-pic" src={weights} />
        <div className="program-title">Hero Program</div>
        <div className="program-body">
          <div className="schedule-body">
            <div className="schedule-title">Schedule</div>
          </div>
        </div>
      </div>
    )
}

export default CreateWorkoutsPage1