import { Button } from '../components';
import { Link } from 'react-router-dom';

const ProgramCard = ({program}) => {
  return (
    <Link to={`/program/edit/${program.id}`} className='program-card'>
      <h5 className='program-card-title'>{program.name}</h5>
      <div className='program-card-body'>
        <div className='program-card-subtitle'>{program.duration_wks} week cycle</div>
        <p className='program-card-text'>{program.description}</p>
      </div>
    </Link>
  )
}

export default ProgramCard