import { useState } from "react";
import { EditSectionPane, DisplaySectionPane } from '../components';

const SectionPane = ({section, fetchWorkout, edit, setEdit}) => {

  return (
    <>
      {
        edit ?
        <EditSectionPane setEdit={setEdit} section={section} fetchWorkout={fetchWorkout}/> :
        <DisplaySectionPane setEdit={setEdit} section={section}/>
      }
    </>
  )
}

export default SectionPane