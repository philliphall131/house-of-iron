import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ironAPI from '../utils/ironAPI';
import AuthContext from '../utils/AuthContext';
import { EditorContainer, Tabs, SectionPane, 
  OverviewPane } from '../components/components';

const EditWorkoutPage = () => {
  const { state } = useContext(AuthContext);
  let { workoutId } = useParams();
  const [workout, setWorkout] = useState(null)
  const [activeTab, setActiveTab] = useState('tab1');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchWorkout();
  }, [workoutId, state]);

  useEffect(() => {
    setEdit(false)
  }, [activeTab]);

  const fetchWorkout = () => {
    ironAPI.getWorkout(workoutId, state.userToken)
      .then((response)=>{
        setWorkout(response.data)
      })
  }

  const addTab = () => {
    let setNum = 0
    let len = 0
    if (workout && workout.sections) {
      len = workout.sections.length
      setNum = len + 1
    } else {
      setNum = 1
    }
    // check that there isnt another new, unsaved section before making another
    if ((len > 0) && (workout.sections[len-1].id === -1)){
      alert('Please save the previous new Section before moving on to others')
      setActiveTab(`tab${setNum}`)
      setEdit(true)
      return
    }

    let newSection = {
      id: -1,
      section_type: 'New Section',
      workout: workoutId,
      number: setNum,
      exercises: [
        {
          id: -1,
          number: 1,
          exercise_base: {name: null},
          set_schema: {
            is_reps: false,
            is_weight: false,
            is_distance: false,
            is_time: false,
          },
          sets: [
            {
              id: -1,
              number: 1,
              planned_reps: 0,
              planned_weight: 0,
              planned_distance: 0,
              planned_time_secs: 0,
            }
          ]
        }
      ]
    }
    setWorkout({
      ...workout,
      sections: [...workout.sections, newSection]
    })
    setActiveTab(`tab${setNum + 1}`)
    setTimeout(()=>setEdit(true), 50)
  }

  const removeTab = (tabIndex) => {
    let sectionId = workout.sections[tabIndex-1].id
    if (sectionId == -1){
      let newSections = [...workout.sections]
      newSections.pop()
      setWorkout({
        ...workout,
        sections: newSections
      })
      setActiveTab(`tab1`)
      setTimeout(()=>setEdit(false), 50)
    } else {
      let num = workout.sections[tabIndex-1].number
      ironAPI.deleteSection(sectionId, state.userToken)
        .then(()=>{
          for (let i=tabIndex; i < workout.sections.length; i++){
            ironAPI.updateSection(workout.sections[i].id, {number: num}, state.userToken)
              .then((response)=>console.log(response))
            num++
          }
        })
        .then(()=>{
          setTimeout(()=>setEdit(true), 50)
        })
        .then(()=>{
          fetchWorkout()
        })
        .catch((error)=>{
          alert('Error removing section')
          console.log('Error removing section: ', error)
        })
      }
  }

  return (
    <>
      { workout ? 
        <EditorContainer title={workout.name}>
          <div className='workout-breadcrumb-row'>
            <span className='breadcrumb'>{'<- '}Back</span>
          </div>
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