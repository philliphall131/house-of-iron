import './styles/App.css';
import { useEffect, useReducer } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Protected from './components/Protected';
import SignedIn from './components/SignedIn';
import ironAPI from './utils/ironAPI';
import ProgramPage from './pages/ProgramPage';
import WorkoutPage from './pages/WorkoutPage';
import EditWorkoutPage from './pages/EditWorkoutPage';
import NewProgramPage from './pages/NewProgramPage';
import EditProgramPage from './pages/EditProgramPage';
import MyProgramsPage from './pages/MyProgramsPage';

function App() {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.data.token,
            user: action.data.user,
            isLoading: false,
          };
        case 'SIGN_IN':
          // store the token
          localStorage.setItem("userToken", action.data.token);
          localStorage.setItem("userId", action.data.user.id);
          return {
            ...prevState,
            isSignout: false,
            userToken: action.data.token,
            user: action.data.user
          };
        case 'SIGN_OUT':
          // reset token to null
          localStorage.removeItem("userToken");
          localStorage.removeItem("userId");
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null
          };
        case 'NO_USER':
          return {
            ...prevState,
            isLoading: false
          }
        default:
          return null;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
      testUser: null
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let userId;
      let data = { user: null, token: null };
      try {
        // Restore token
        userId = localStorage.getItem('userId')
        userToken = localStorage.getItem("userToken");
      } catch (e) {
        console.log('Error retrieving token')
      }
      // If a token was retrieved, validate Token, get user info
      if (userId && userToken){
        ironAPI.getUser(userId, userToken)
          .then((userResponse)=>{
            if (userResponse && userResponse.data){
              data = { user: userResponse.data, token: userToken }
              dispatch({ type: 'RESTORE_TOKEN', data });
            } else {
              throw 'No response or no response data on credential check'
            }
          })
          .catch(()=>{
            dispatch({ type: 'SIGN_OUT' })
          })
      } else {
        dispatch({ type: 'NO_USER' })
      };
    };
    bootstrapAsync();
  }, []);

  if (state.isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <div>
      <NavBar state={state} dispatch={dispatch}/>
      <Routes>
        <Route path="/" element={<LandingPage state={state}/>}/>
        <Route path="/signup" element={<SignedIn state={state} page={<SignupPage dispatch={dispatch}/>}/>}/>
        <Route path="/login" element={<SignedIn state={state} page={<LoginPage dispatch={dispatch}/>}/>}/>
        <Route path="/dashboard" element={<Protected state={state} page={<Dashboard state={state}/>}/>}/>
        <Route path="/program" element={<Protected state={state} page={<ProgramPage />}/>}/>
        <Route path="/program/new" element={<Protected state={state} page={<NewProgramPage state={state}/>}/>}/>
        <Route path="/program/edit/:programId" element={<Protected state={state} page={<EditProgramPage state={state}/>}/>}/>
        <Route path="/workout/edit/:workoutId" element={<Protected state={state} page={<EditWorkoutPage />}/>}/>
        <Route path="/programs" element={<Protected state={state} page={<MyProgramsPage state={state}/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;