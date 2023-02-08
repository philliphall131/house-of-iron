import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ironAPI from '../utils/ironAPI';
import AuthContext from '../utils/AuthContext';
import AddSectionModal from '../components/workout/AddSectionModal';
import { EditWorkoutSection, EditorContainer, Tabs, SectionPane } from '../components/components';

const EditWorkoutPage = () => {
  const { state } = useContext(AuthContext);
  let { workoutId } = useParams();
  const [workout, setWorkout] = useState(null)
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchWorkout();
  }, [workoutId, state]);

  const fetchWorkout = () => {
    ironAPI.getWorkout(workoutId, state.userToken)
      .then((response)=>{
        setWorkout(response.data)
      })
  }

  // const handleClose = (update=false) => {
  //   if (update){
  //     fetchWorkout()
  //   }
  //   setShow(false)
  // };
  // const handleShow = () => setShow(true);

  // const deleteSection = (sectionId) => {
  //   ironAPI.deleteSection(sectionId, state.userToken)
  //     .then((response)=>{
  //       fetchWorkout()
  //     })
  //     .catch(()=>{
  //       console.log('Error deleting section')
  //     })
  // }

  // const renderSections = () => {
  //   return (
  //     <>
  //       {
  //         workout && workout.sections
  //           ?
  //             workout.sections.map((section, i)=>(
  //               <EditWorkoutSection key={`EWS${i}`} section={section} deleteSection={deleteSection}/>
  //             ))
  //           :
  //             <p>
  //               To get started, click below to give the workout its first 'section',
  //               then add some exercises to that section. 
  //             </p>
  //       }
  //     </>
  //   )
  // }

  return (
    <>
      { workout ? 
        <EditorContainer title={workout.name} subtitle={"Workout Editor"}>
            <div className="workout-editor-body">
              <Tabs>
                <SectionPane title={"Overview"}/>
                <SectionPane title={"Warm-up"}/>
                <SectionPane title={"Main 1"}/>
                <SectionPane title={"Main 2"}/>
                <SectionPane title={"Accessory"}/>
                <SectionPane title={"Cool Down"}/>
              </Tabs> 
            </div>
        </EditorContainer> : 
        <>
          <p>Loading</p>
        </>
      }
    </>
  )
}

export default EditWorkoutPage