import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import UserContext from './context/UserContext';

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Landing = lazy(() => import('./pages/Landing'))
const Profile = lazy(() => import('./pages/Profile'))
const SearchJob = lazy(() => import('./pages/SearchJob'))
const Hire = lazy(() => import('./pages/Hire'))
const JobDetails = lazy(() => import('./pages/JobDetails'))
const Applicants = lazy(() => import('./pages/Applicants'))

import Loading from './Loading';

function App() {
  const [userData, setUserData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [hiringPostData, setHiringPostData] = useState([])
  const [globeHiringList, setGlobeHiringList] = useState([])

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const token2 = sessionStorage.getItem('token2');
    const token3 = sessionStorage.getItem('token3');
    const token4 = localStorage.getItem('token4');

    if (token && token2) {
      const decodedToken = jwtDecode(token);
      const decodedToken2 = jwtDecode(token2);

      setUserData({
        name: decodedToken.user.name,
        email: decodedToken.user.email,
      });

      setUserInfo({
        name: decodedToken2.userInfo.name,
        about: decodedToken2.userInfo.about,
        email: decodedToken2.userInfo.email,
        role: decodedToken2.userInfo.role,
        address: decodedToken2.userInfo.address,
        education: decodedToken2.userInfo.education,
        activity: decodedToken2.userInfo.activity,
        skills: decodedToken2.userInfo.skills,
        experience: decodedToken2.userInfo.experience,
        profilepicname: decodedToken2.userInfo.profilepicname
      })

    } else {
      setUserData({});
      setUserInfo({});
    }

    if (token3) {
      const decodedToken3 = jwtDecode(token3);
      setHiringPostData(decodedToken3.hiringList)
    }

    if (token4) {
      const decodedToken4 = jwtDecode(token4);
      setGlobeHiringList(decodedToken4.globeHiringList)
    }

  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            userData, setUserData,
            userInfo, setUserInfo,
            hiringPostData, setHiringPostData,
            globeHiringList, setGlobeHiringList
          }}>
          <Routes>
            <Route path='/' element={<Suspense fallback={<Loading />}><Landing /></Suspense>} />
            <Route path='/login' element={<Suspense fallback={<Loading />}><Login /></Suspense>} />
            <Route path='/signup' element={<Suspense fallback={<Loading />}><Signup /></Suspense>} />
            <Route path='/home' element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
            <Route path='/profile' element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />
            <Route path='/hire' element={<Suspense fallback={<Loading />}><Hire /></Suspense>} />
            <Route path='/searchjob' element={<Suspense fallback={<Loading />}><SearchJob /></Suspense>} />
            <Route path='/jobdetails' element={<Suspense fallback={<Loading />}><JobDetails /></Suspense>} />
            <Route path='/applicants' element={<Suspense fallback={<Loading />}><Applicants /></Suspense>} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
