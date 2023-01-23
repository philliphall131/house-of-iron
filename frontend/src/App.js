import './styles/App.css';
import { useEffect, useReducer } from 'react';
import { Routes, Route } from "react-router-dom";
import AuthContext from './utils/AuthContext'
import ironAPI from './utils/ironAPI';
import { NavBar, LoadingScreen, Protected, SignedIn } from './components/components';
import { LandingPage, Dashboard, SignupPage, LoginPage, MyProgramsPage,
  ProgramPage, EditWorkoutPage, NewProgramPage, EditProgramPage } from "./pages/pages";

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

  return (
    <>
      { state.isLoading 
        ?
          <LoadingScreen /> 
        :
          <AuthContext.Provider value={{state, dispatch}}>
            <NavBar />
            <Routes>
              <Route path="/" element={<LandingPage />}/>
              <Route path="/signup" element={<SignedIn  page={<SignupPage />}/>}/>
              <Route path="/login" element={<SignedIn  page={<LoginPage />}/>}/>
              <Route path="/dashboard" element={<Protected  page={<Dashboard />}/>}/>
              <Route path="/program" element={<Protected  page={<ProgramPage />}/>}/>
              <Route path="/program/new" element={<Protected  page={<NewProgramPage />}/>}/>
              <Route path="/program/edit/:programId" element={<Protected  page={<EditProgramPage />}/>}/>
              <Route path="/workout/edit/:workoutId" element={<Protected  page={<EditWorkoutPage />}/>}/>
              <Route path="/programs" element={<Protected  page={<MyProgramsPage />}/>}/>
            </Routes>
          </AuthContext.Provider>
      }
    </>
  );
}

export default App;