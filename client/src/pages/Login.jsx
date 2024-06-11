import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BASE_URL } from '../url';
import UserContext from '../context/UserContext';
import Footer from '../partials/Footer';
import SubmitButton from '../component/SubmitButton';
import Loading from '../Loading';
import axios from 'axios';

function Login() {

  const { setUserData, setUserInfo, setGlobeHiringList } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState();
  const [passtype, setPasstype] = useState('password');
  const navigate = useNavigate();

  function showPassword() {
    setPasstype(passtype === 'password' ? 'text' : 'password');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true)

    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });

      if (response.data.status === 'error') {
        setIsLoggingIn(false)
        setError(response.data.message);
      }
      else {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('token2', response.data.token2);
        sessionStorage.setItem('token3', response.data.token3)
        localStorage.setItem('token4', response.data.token4)

        setUserData(response.data.user);
        setUserInfo(response.data.userInfo);
        setGlobeHiringList(response.data.globeHiringList)

        navigate('/home');
      }
    }
    catch (error) {
      console.error('Error during login:', error);
      setIsLoggingIn(false)
      setError('An error occurred. Please try again later.');
    }
  };

  return isLoggingIn ? <Loading /> :
    <>
      <div className='w-full py-28 font-[Questrial] flex flex-col gap-4 justify-center items-center select-none'>
        <div className='w-[230px] md:w-[300px] flex justify-around '>

          <Link to='/signup' className='w-[40%] p-3 rounded-full bg-[#444] hover:bg-[#666] text-[16px] flex justify-center items-center duration-[0.3s] ease-out'>
            Sign up
          </Link>
          <Link to='/login' className='w-[40%] p-3 rounded-full bg-[#fe0] text-black text-[20px] flex justify-center items-center duration-[0.3s] ease-out'>
            Login
          </Link>
        </div>

        <div className=' w-full h-[85%] flex justify-center items-center'>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
            {error && <div className='text-[#f33] font-bold w-[80vw] flex justify-center text-center p-4'>{error}</div>}

            <br />

            <div className=' mb-[30px]'>
              Email <br />
              <input
                type='email'
                name='email'
                value={email}
                required
                className='w-[230px] md:w-[300px] border-[1px] p-[6px] bg-transparent'
                onChange={(e) => { setEmail(e.target.value.toLowerCase()); setError('') }} />
            </div>

            <div className=' mb-[50px] relative'>
              Password <br />
              <input
                type={passtype}
                name='password'
                maxLength={20}
                minLength={6}
                value={password}
                required
                className='w-[230px] md:w-[300px] border-[1px] p-[6px] bg-transparent'
                onChange={(e) => { setPassword(e.target.value.toLowerCase()); setError('') }} />

              {passtype == 'password' ?
                <FaEye size={20} onClick={showPassword} className='absolute right-[12px] bottom-[9px]' />
                :
                <FaEyeSlash size={20} onClick={showPassword} className='absolute right-[12px] bottom-[9px]' />}
            </div>

            <SubmitButton value='Login' />

          </form>
        </div>
      </div>
      <Footer />
    </>
    ;
}

export default Login