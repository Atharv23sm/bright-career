
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSearch } from 'react-icons/fa';


function Header() {

  return (

    <div className='w-full fixed top-0 left-0 bg-[#00000044] backdrop-blur-sm
    text py-4 px-10 select none flex justify-between items-center z-30'>

      <Link to='/home' className='text-[30px]'>
      <div className=' w-12 h-12 text-[30px] flex justify-center items-center text-black bg-[#fe0] hover:shadow-[0_0_16px_#fe0] duration-700'>B.</div>
      </Link>

      <div className='font-[Questrial] flex gap-6 items-center'>

        <Link to='/searchjob'><FaSearch /></Link>
        <Link to='/profile'><FaUserCircle size={'30px'} /></Link>

        </div>
      </div>
  );
}

export default Header;
