import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { FaAngleDown, } from 'react-icons/fa'
import Header from '../partials/Header'
import UserContext from '../context/UserContext'
import Footer from '../partials/Footer'
import Card from '../component/Card'
import home1 from '../assets/home1.jpg'
import home2 from '../assets/home2.webp'
import HomeButton from '../component/HomeButton'

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
            <FaAngleDown size={24} onClick={() => { setShowcards(showcards + 4) }} className='cursor-pointer' />

          </div>

          : userInfo.role == 'Hiring' ?
            <div className='h-screen w-full flex justify-center items-center py-20 md:px-5'>
              <div className='w-max relative flex items-center justify-center'>
                <div className='absolute p-2 md:p-6 text-center text-[7vw] md:text-[5vw] lg:text-[3vw] z-20'>Ready to assemble your<br />DREAM TEAM?</div>
                <HomeButton link='hire' bottom='4' text='Hire' />
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
              <HomeButton link='profile' bottom='32' text='Set your role' />
            </div>
        }
      </div>

      <Footer />
    </>

    : <Navigate to='/login' />

}

export default Home