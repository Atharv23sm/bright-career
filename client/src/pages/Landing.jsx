import { useNavigate } from 'react-router-dom'
import Footer from '../partials/Footer'
import { FaArrowCircleUp } from 'react-icons/fa'

function Landing() {

  const navigate = useNavigate()

  return (
    <>
      <div className='w-full h-[100vh] flex flex-col items-center relative pt-48 bg-[#111]'>

        <div className=' flex justify-center items-center '>
          <div className='w-[20vw] h-[20vw] bg-[#fe0] text-[16vw] flex justify-center items-center animate-[glow_4s] shadow-[0_0_60px_#fe0] z-40 duration-200'>
            <span className='animate-[opacity_4s] text-black duration-200 '>B.</span>
          </div>
          <div className='overflow-hidden pl-[5vw]'>
            <div className='text-[12vw] animate-[slide_4s] duration-200 '>Bright</div>
          </div>
        </div>
        <div className='overflow-hidden pt-20'>
          <div className='bg-gradient-to-br from-[#ff4] to-white text-black p-2 w-max rounded-full animate-[slidebtn_3s] flex items-center gap-2 cursor-pointer group duration-600'
            onClick={() => { navigate('/signup') }}>Get started <FaArrowCircleUp size={20} className='rotate-45 group-hover:rotate-90 duration-300' /> </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Landing