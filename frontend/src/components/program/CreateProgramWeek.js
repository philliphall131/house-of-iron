import { Row, Col, CardGroup } from 'react-bootstrap';
import { CreateProgramDayCard } from '../components';

const CreateProgramWeek = ({week, program, addWorkout}) => {
  return (
    <div className="program-week-container">
      <CardGroup>
        {Array.from({length: 7}, (_,i) => (
            <CreateProgramDayCard 
              addWorkout={addWorkout} 
              day={program.program_days[(week * 7) + i]}
              key={`cpc${i}`}/>
        ))}
      </CardGroup>
    </div>
  )
}

export default CreateProgramWeek