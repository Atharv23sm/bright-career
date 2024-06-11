import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BASE_URL } from '../url';
import Footer from '../partials/Footer';
import SubmitButton from '../component/SubmitButton';
import Loading from '../Loading';
import axios from 'axios';

function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passtype, setPasstype] = useState('password');
  const [isSigningUp, setIsSigningUp] = useState();
  const navigate = useNavigate();

  function showPassword() {
    setPasstype((prevState) => (prevState === 'password' ? 'text' : 'password'));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningUp(true)
    try {
      const response = await axios.post(`${BASE_URL}/signup`, { name, email, password });
      if (response.data.status === 'error') {
        setIsSigningUp(false)
        setError(response.data.message);
      } else {
        navigate('/login');
      }
    } catch (error) {
      setIsSigningUp(false)
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      {isSigningUp ? <Loading /> :
        <div className='w-full py-28 font-[Questrial] flex flex-col gap-4 justify-center items-center select-none'>
          <div className='w-[230px] md:w-[300px] flex justify-around '>
            <Link to='/signup' className='w-[40%] p-3 bg-[#fe0] text-black text-[20px] flex justify-center items-center duration-[0.3s] ease-out rounded-full'>
              Sign up
            </Link>
            <Link to='/login' className='w-[40%] p-3 bg-[#444] hover:bg-[#666] text-white text-[16px] flex justify-center items-center duration-[0.3s] ease-out rounded-full'>
              Login
            </Link>
          </div>

          <div className='w-max h-[85%] flex justify-center items-center'>

            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center '>

              {error && <div className='text-[#f33] font-bold w-[80vw] flex justify-center text-center p-4'>{error}</div>}

              <div className=' mb-[10px]'>
                Name <br />
                <input type='text' name='name' value={name}
                  maxLength={30} required
                  className='w-[230px] md:w-[300px] border-[1px] p-[6px] bg-transparent'
                  onChange={(e) => { setName(e.target.value); setError('') }} />
              </div>

              <div className=' mb-[10px]  '>
                Email <br />
                <input type='email' name='email' required value={email}
                  className='w-[230px] md:w-[300px] border-[1px] p-[6px] bg-transparent'
                  onChange={(e) => { setEmail(e.target.value.toLowerCase()); setError('') }} />
              </div>

              <div className=' mb-[30px] relative'>
                Password <br />
                <input type={passtype} name='password' value={password}
                  maxLength={20} minLength={6} required
                  className='w-[230px] md:w-[300px] border-[1px] p-[6px] bg-transparent'
                  onChange={(e) => { setPassword(e.target.value.toLowerCase()); setError('') }} />

                {passtype == 'password' ?
                  <FaEye size={20} onClick={showPassword} className='absolute right-[12px] bottom-[9px]' />
                  :
                  <FaEyeSlash size={20} onClick={showPassword} className='absolute right-[12px] bottom-[9px]' />}
              </div>

              <SubmitButton value='Signup' />

            </form>
          </div>
        </div>
      }
      <Footer />
    </>
  );
}

export default Signup