import { useEffect, useState, useContext } from 'react';
import weights from '../assets/weights.jpg';
import { Container } from 'react-bootstrap';
import ironAPI from '../utils/ironAPI';
import ProgramGroup from '../components/ProgramGroup';
import AuthContext from '../utils/AuthContext';

const MyProgramsPage = () => {
  const { state } = useContext(AuthContext);
  const [authoredPrograms, setAuthoredPrograms] = useState(null);

  useEffect(() => {
    const getPrograms = async () => {
      ironAPI.getAuthoredPrograms(state.userToken)
        .then((response)=>{
          setAuthoredPrograms(response.data)
        })
        .catch(()=>{
          console.log('error with getting authored programs')
        })
    };
    getPrograms()
  }, [state.userToken])

  return (
    <div>
      <img className="header-pic" src={weights} alt=""/>
      <div className="program-title">My Programs</div>
      <div className="program-body mt-0 pt-0">
        <div className="schedule-body mt-0 pt-0">
          <div className="schedule-title text-center my-0"></div>
          <Container className='program-container'>
            <ProgramGroup
              title={"My current active program"}
            />
            <ProgramGroup
              title={"Programs I've Made"}
              programGroup={authoredPrograms}
            />
            <ProgramGroup
              title={"Programs I've done"}
            />
            <ProgramGroup
              title={"Saved Programs"}
            />            
          </Container>
        </div>
      </div>
    </div>
  )
}

export default MyProgramsPage