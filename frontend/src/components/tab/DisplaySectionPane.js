import { ExerciseTable, Button } from '../components';

const DisplaySectionPane = ({section, setEdit}) => {
  
  return (
    section &&
    <div className="display-section-pane">
      <div className="section-pane-title">
        <div className='section-empty-block'></div>
        <h5 className='section-title'>{section.section_type}</h5>
        <div className='title-right-block'>
          <Button variant="grey" onClick={()=>setEdit(true)}>Edit</Button>
        </div>
      </div>
      <div className='exercises-block'>
        {section.exercises.map((exercise, index)=>(
          <ExerciseTable
            exercise={exercise}
            key={`ext${index}`}
          />
        ))}
      </div>
    </div>
  )
}

export default DisplaySectionPane