import { useState } from "react";
import { EditOverviewPane, DisplayOverviewPane } from '../components';

const OverviewPane = ({workout, fetchWorkout}) => {
  const [edit, setEdit] = useState(false);

  return (
    <>
      { edit ?
        <EditOverviewPane setEdit={setEdit} workout={workout} fetchWorkout={fetchWorkout}/> :
        <DisplayOverviewPane setEdit={setEdit} workout={workout}/>
      }
    </>
  )
}

export default OverviewPane