import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ironAPI from '../utils/ironAPI';
import AuthContext from '../utils/AuthContext';
import _ from 'lodash';
import AddSectionModal from '../components/workout/AddSectionModal';
import { EditWorkoutSection, EditorContainer, Tabs, SectionPane, 
  OverviewPane, ConfirmationModal } from '../components/components';

const EditWorkoutPage = () => {
  const { state } = useContext(AuthContext);
  let { workoutId } = useParams();
  const [workout, setWorkout] = useState(null)
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchWorkout();
  }, [workoutId, state]);

  const fetchWorkout = () => {
    ironAPI.getWorkout(workoutId, state.userToken)
      .then((response)=>{
        setWorkout(response.data)
      })
  }

  const addTab = () => {
    let setNum = 0
    if (workout && workout.sections) {
      setNum = workout.sections.length + 1
    } else {
      setNum = 1
    }
    let newSection = {
      id: -1,
      section_type: 'New Section',
      workout: workoutId,
      number: setNum
    }
    setWorkout({
      ...workout,
      sections: [...workout.sections, newSection]
    })
    setActiveTab(`tab${setNum + 1}`)
    setEdit(true)
  }

  const removeTab = (index) => {
    let sectionId = workout.sections[index-1].id
    if (activeTab === `tab${workout.sections[index-1].number + 1}`){
      setActiveTab('tab1')
    }
    ironAPI.deleteSection(sectionId, state.userToken)
      .then(()=>{
        fetchWorkout()
      })
      .catch((error)=>{
        alert('Error removing section')
        console.log('Error removing section: ', error)
      })
  }

  return (
    <>
      { workout ? 
        <EditorContainer title={workout.name} subtitle={"Workout Editor"}>
            <div className="workout-editor-body">
              <Tabs 
                addTab={addTab} 
                removeTab={removeTab}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <OverviewPane 
                  title={"Overview"} 
                  workout={workout}
                  fetchWorkout={fetchWorkout}
                />
                { 
                  workout.sections.sort((a,b)=>{return(a.number-b.number)}).map((section, i)=>
                    <SectionPane 
                      key={`sp${i}`}
                      title={section.section_type} 
                      section={section}
                      fetchWorkout={fetchWorkout}
                      edit={edit}
                      setEdit={setEdit}
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