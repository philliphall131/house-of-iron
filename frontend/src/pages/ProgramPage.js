import weights from '../assets/weights.jpg';
import '../styles/Program.css';
import { Link } from 'react-router-dom';


const ProgramPage = () => {

  const getScheduleDays = () => {
    let arr = []
    const days = (num) => {
      return (
        <>
          <Link to="workout" className="link">
            <div className='program-days' key={`day-${num}`}>
              <div className="program-day">Day<br/>{`${num}`}</div>
              <div className="vr"></div>
              <div className="program-workout">
                <div>{`Workout 1-${num}`}<br/>Type: Squat/Bench</div> 
              </div>
              <div className="vr"></div>
              <div  className="program-day-complete">
                <div className="circle"></div>
                <div className="carrot">{`>`}</div>
              </div>
            </div>
          </Link>
          <hr/>
        </>
      )
    }
    for (let i=1; i<16; i++) {
      arr.push(days(i))
    }
    return arr
  }

  return (
    <div>
      <img className="header-pic" src={weights} />
      <div className="program-title">Hero Program</div>
      <div className="program-body">
        <button className="start-workout">Start Next Workout</button>
        <div className="schedule-body">
          <div className="schedule-title">Schedule</div>
          { getScheduleDays() }
        </div>
      </div>
    </div>
  )
}

export default ProgramPage