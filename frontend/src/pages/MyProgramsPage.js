import { useEffect, useState, useContext } from 'react';
import ironAPI from '../utils/ironAPI';
import { ProgramGroup, EditorContainer } from '../components/components';
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
    <EditorContainer title={"My Programs"}>
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
    </EditorContainer>        
  )
}

export default MyProgramsPage