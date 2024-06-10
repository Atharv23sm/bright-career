import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaAngleDown, FaArrowAltCircleUp } from 'react-icons/fa'
import Header from '../partials/Header'
import UserContext from '../context/UserContext'
import Footer from '../partials/Footer'
import Card from '../component/Card'
import home1 from '../assets/home1.jpg'
import home2 from '../assets/home2.webp'
import home3 from '../assets/home3.webp'

function Home() {

  const { globeHiringList } = useContext(UserContext)
  const { userInfo } = useContext(UserContext)

  const token = sessionStorage.getItem('token')
  const token2 = sessionStorage.getItem('token2')
  const [showcards, setShowcards] = useState(4)

  return token && token2 ?
    <>
      <Header />

      <div className='md:px-5 py-20 overflow-hidden'>

        {userInfo.role == 'Open to work' ?
          <div className='flex flex-col gap-8 px-4 py-10 md:p-10' >
            <div className='text-[20px]'>Latest Jobs</div>

            {
              globeHiringList.slice(0,showcards).map(
                (item) => {
                  return (
                    <Card item={item} />
                  )
                }
              )
            }
          <FaAngleDown size={24} onClick={()=>{setShowcards(showcards+4)}} className='cursor-pointer'/>

          </div>

          : userInfo.role == 'Hiring' ?
            <div className='py-10 flex justify-center'>
              <div className='flex justify-center items-center relative'>
                <div className='absolute p-2 md:p-6 leading-[15vw] flex flex-wrap text-[7vw] md:text-[5vw] lg:text-[3vw] z-20'>Your work people are here</div>
                <Link to={'/hire'} className=' absolute bottom-[4vw] p-2 md:bottom-8 flex gap-2 items-center z-20 w-max justify-center backdrop-blur-sm hover:bg-[#00000099] hover:backdrop-blur md:p-4 border-[2px] border-[#fe0] rounded-full duration-1000 group'>Let's hire <FaArrowAltCircleUp className='rotate-45 group-hover:rotate-90 duration-500 text-[#fe0]' /></Link>
                <img src={home1} alt="Landing image"
                  className='md:rounded-2xl' />
                <div className='w-full h-full absolute bg-gradient-to-b from-transparent to-black md:rounded-2xl' />
              </div>
            </div>
            :

            <div className='py-6 flex justify-center md:gap-4 relative'>
              <img src={home2} alt="Landing image" />
              <img src={home3} alt="Landing image" />
              <Link to={'/profile'} className=' absolute bottom-24 md:bottom-32 flex gap-2 items-center z-20 w-max justify-center bg-[#00000077] backdrop-blur-sm hover:bg-[#00000099] hover:backdrop-blur p-4 border-[2px] border-[#fe0] rounded-full duration-1000 group'>Set your profile <FaArrowAltCircleUp className='rotate-45 group-hover:rotate-90 duration-500 text-[#fe0]' /></Link>
            </div>
        }
      </div>

      <Footer />
    </>

    : <Navigate to='/login' />

}

export default Home