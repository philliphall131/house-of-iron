import { Link, useNavigate } from 'react-router-dom';

const WorkoutPage = () => {
  let navigate = useNavigate();

  return (
    <div className="workout-page">
        <div className="workout-page-nav">
          <button className="workout-page-nav-button" onClick={()=>navigate(-1)}>{`<<`} Back</button>
          <Link to="active"><button className="workout-page-nav-button">Start {`>>`}</button></Link>
        </div>
        <div className="workout-page-title">Workout Overview</div>
        <div className="workout-page-desc">
          Workout Type:<br/>Squat/Bench
        </div>
        <div className="workout-body">
          <div className="workout-section">
            <div className="workout-section-title">Warm Up</div>
            <div className="exercise-sets">1 Set</div>
            <div className="exercise">Jog 2-5 min</div>
          </div>
          <div className="workout-section">
            <div className="workout-section-title">Main 1</div>
            <div className="exercise-sets">5 Sets</div>
            <div className="exercise">5x Back Squat</div>
            <div className="exercise">10x Flutter kicks (4 count)</div>
          </div>
          <div className="workout-section">
            <div className="workout-section-title">Main 2</div>
            <div className="exercise-sets">5 Sets</div>
            <div className="exercise">5x Bench Press</div>
            <div className="exercise">10x Weighted Shoulder Rotation</div>
          </div>
          <div className="workout-section">
            <div className="workout-section-title">Accessory 1</div>
            <div className="exercise-sets">3 Sets</div>
            <div className="exercise">10x </div>
            <div className="exercise">10x Weighted Shoulder Rotation</div>
          </div>
        </div>
    </div>
  )
}

export default WorkoutPage