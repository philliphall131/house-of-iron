import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ironAPI from '../utils/ironAPI';
import AuthContext from '../utils/AuthContext';
import AddSectionModal from '../components/workout/AddSectionModal';
import { EditWorkoutSection, EditorContainer, Tabs, SectionPane, OverviewPane } from '../components/components';

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

  return (
    <>
      { workout ? 
        <EditorContainer title={workout.name} subtitle={"Workout Editor"}>
            <div className="workout-editor-body">
              <Tabs>
                <OverviewPane 
                  title={"Overview"} 
                  workout={workout}
                  fetchWorkout={fetchWorkout}
                />
                { 
                  workout.sections.map((section, i)=>
                    <SectionPane 
                      key={`sp${i}`}
                      title={section.section_type} 
                      section={section} 
                      fetchWorkout={fetchWorkout}
                    />
                  )
                }
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