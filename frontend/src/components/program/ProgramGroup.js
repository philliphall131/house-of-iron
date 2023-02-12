import { ProgramCard } from '../components';

const ProgramGroup = ({title, programGroup}) => {

  return (
    <div className='program-group-body'>
      <div className='program-group-title'>{title}</div>
      { programGroup ? 
        <div className='program-group-cards'>
          { programGroup.map((program,index)=>(
            <ProgramCard key={`pg${index}`} program={program} />
          ))} 
        </div> :
        <p>Looks like there arent any Programs here</p>
      }
    </div>
  )
}

export default ProgramGroup