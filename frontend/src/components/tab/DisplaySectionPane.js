import { ExerciseTable, Button } from '../components';

const DisplaySectionPane = ({section}) => {
  return (
    section &&
    <div className="workout-pane">
      <div className="workout-pane-title">
        <div className='empty-block'></div>
        <h5 className='section-title'>{section.section_type}</h5>
        <div className='title-right-block'>
          <Button variant="grey">Edit</Button>
        </div>
      </div>
      
      <div className='exercises-block'>
        <ExerciseTable num={1} name={'Back Squat'}/>
        <ExerciseTable num={2} name={'Walking Lunges'}/>
      </div>
    </div>
  )
}

export default DisplaySectionPane