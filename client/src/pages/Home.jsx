import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {FaArrowAltCircleUp , FaAngleDown, FaAngleUp, } from 'react-icons/fa'
import Header from '../partials/Header'
import UserContext from '../context/UserContext'
import Footer from '../partials/Footer'
import Card from '../component/Card'
import home1 from '../assets/home1.jpg'
import home2 from '../assets/home2.webp'


function Home() {

  const { globeHiringList } = useContext(UserContext)
  const { userInfo } = useContext(UserContext)

  const token = sessionStorage.getItem('token')
  const token2 = sessionStorage.getItem('token2')
  const [showcards, setShowcards] = useState(4)

  return token && token2 ?
    <>
      <Header />

      <div className='overflow-hidden'>

        {userInfo.role == 'Open to work' ?
          <div className='flex flex-col gap-8 px-4 md:px-10 my-28' >
            <div className='text-[20px]'>Latest Jobs</div>

            {
              globeHiringList.slice(0, showcards).map(
                (item) => {
                  return (
                    <Card item={item} />
                  )
                }
              )
            }
            {showcards<globeHiringList.length ?
            <FaAngleDown size={24} onClick={() => { setShowcards(showcards + 4) }} className='cursor-pointer' />
          : <FaAngleUp size={24} onClick={() => { setShowcards(showcards - 4) }} className='cursor-pointer'/>}

          </div>

          : userInfo.role == 'Hiring' ?
            <div className='h-screen w-full flex justify-center items-center py-20 md:px-5'>
              <div className='w-max relative flex items-center justify-center'>
                <div className='absolute p-2 md:p-6 text-center text-[7vw] md:text-[5vw] lg:text-[3vw] z-20'>Ready to assemble your<br />DREAM TEAM?</div>
                <Link to={`/hire`} className={`absolute bottom-4 flex gap-2 items-center z-20 w-max justify-center
                  bg-[#00000077] backdrop-blur-sm hover:bg-[#00000099] hover:backdrop-blur p-2 md:p-4 border-[2px]
                  border-[#fe0] rounded-full duration-1000 group`}>
                    Hire <FaArrowAltCircleUp className='rotate-45 group-hover:rotate-90 duration-500 text-[#fe0]' /></Link>
                <div className='relative flex justify-center items-center'>
                  <img src={home1} alt="Landing image"
                    className='md:rounded-2xl' />
                  <div className='absolute w-full h-full bg-gradient-to-b from-transparent to-[#000000] md:rounded-2xl'></div>
                </div>
              </div>
            </div>
            :

            <div className='py-24 flex justify-center relative'>
              <img src={home2} alt="Landing image" />
              <div className='absolute text-center text-black top-32 text-[20px] leading-[20px] backdrop-blur p-2 rounded-xl bg-[]'>Eager for a career shift <br /> or <br />Seeking standout candidate?</div>
              <Link to={`/profile`} className={`absolute bottom-32 flex gap-2 items-center z-20 w-max justify-center
                  bg-[#00000077] backdrop-blur-sm hover:bg-[#00000099] hover:backdrop-blur p-2 md:p-4 border-[2px]
                  border-[#fe0] rounded-full duration-1000 group`}>
                    Set your role <FaArrowAltCircleUp className='rotate-45 group-hover:rotate-90 duration-500 text-[#fe0]' /></Link>
            </div>
        }
      </div>

      <Footer />
    </>

    : <Navigate to='/login' />

}

export default Home