import { useState } from "react";
import { EditSectionPane, DisplaySectionPane } from '../components';

const SectionPane = ({section, fetchWorkout}) => {
  const [edit, setEdit] = useState(false);

  return (
    <>
      { edit ?
        <EditSectionPane setEdit={setEdit} section={section} fetchWorkout={fetchWorkout}/> :
        <DisplaySectionPane setEdit={setEdit} section={section}/>
      }
    </>
  )
}

export default SectionPane