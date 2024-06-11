import { useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { FaAngleDown, FaAngleUp, FaFilter } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { BASE_URL } from '../url'
import axios from 'axios'
import UserContext from '../context/UserContext'
import Header from '../partials/Header'
import ArrowLeft from '../component/ArrowLeft'
import Footer from '../partials/Footer'
import Card from '../component/Card'
import Loading from '../Loading'

function SearchJob() {

  const { setHiringPostData } = useContext(UserContext)
  const token = sessionStorage.getItem('token')
  const token2 = sessionStorage.getItem('token2')
  const token4 = localStorage.getItem('token4')

  useEffect(() => {
    if (token4) {
      const decoded4 = jwtDecode(token4)
      setHiringPostData(decoded4.globeHiringList)
    }
  }, [])

  const [searchKey, setSearchKey] = useState("")
  const [searchCity, setSearchCity] = useState("")
  const [filter, setFilter] = useState({ category: 'None', workmode: 'None' })
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const [foundJobs, setFoundJobs] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSearching(true)
    if ((searchKey == '' && searchCity == "") && (filter.category == 'None' && filter.workmode == 'None')) {
      setFoundJobs([]);
      setIsSearching(false)
    }
    else {
      const response = await axios.post(`${BASE_URL}/searchjob`, { search: searchKey, searchCity, filter })
      if (response.data.status == 'success') {
        setIsSearching(false)
        setIsSearchClicked(true)
        setFoundJobs(response.data.found_post)
      }
    }
  }

  return token && token2 ?
    <>
      <Header />
      <div className='flex flex-col px-4 md:px-10 py-28 gap-10'>
        <ArrowLeft />

        <form className='flex flex-wrap gap-4 md:gap-10 items-start justify-center' onSubmit={handleSubmit}>
          <input type="search" placeholder='job title'
            className='bg-black w-[90%] md:w-[60%] p-4 border-[1px] rounded-full'
            onChange={(e) => {
              setSearchKey(e.target.value);
              setIsSearchClicked(false)
              e.target.value == "" && setFoundJobs([])
            }}
            value={searchKey} />
          <input type="search" placeholder='location'
            className='bg-black w-[70%] md:w-[30%] p-4 border-[1px] rounded-full'
            onChange={(e) => {
              setSearchCity(e.target.value);
              setIsSearchClicked(false)
            }}
            value={searchCity} />

          <div className='flex flex-col gap-4 bg-[#111] p-4 duration-500 overflow-hidden'>
            <div className='flex items-center justify-between w-52'
              onClick={() => setShowFilters(!showFilters)}>
              <FaFilter />Filter {showFilters ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {showFilters &&
              <div className='flex flex-col gap-2 animate-[opacity_1s]'>
                <hr />
                <div>Category</div>
                <select className='p-2 bg-transparent w-full placeholder:text-white'
                  onChange={(e) => {
                    setFilter({ ...filter, category: e.target.value });
                    setIsSearchClicked(false)
                  }}>
                  {['None', 'Business', 'Education', 'Finance', 'Information Technology', 'Law', 'Management', 'Sales', 'Human Resources', 'Other']
                    .map(
                      (item) => {
                        return (
                          <option className='bg-[#333]' value={item}>{item}</option>
                        )
                      }
                    )}
                </select>
                <div>Mode</div>
                <select className='p-2 bg-transparent border-0 w-full placeholder:text-white'
                  onChange={(e) => {
                    setFilter({ ...filter, workmode: e.target.value });
                    setIsSearchClicked(false)
                  }}>
                  {['None', 'Hybrid', 'Onsite', 'Remote']
                    .map(
                      (item) => {
                        return (
                          <option className='bg-[#333]' value={item}>{item}</option>
                        )
                      }
                    )}
                </select>
              </div>
            }
          </div>
          <button type='submit'
            className='bg-[#fe0] hover:bg-[#ff7] hover:shadow-[0_0_10px_#fe0] duration-[1s] text-black p-4 rounded-full cursor-pointer'>
            Search</button>

        </form>

        <div>
          {isSearching ? <Loading /> :
            <div className='flex flex-col gap-12 py-8 px-[4vw]' >
              {foundJobs.length > 0 ?
                <>
                  <div className='text-[20px]'>{foundJobs.length} results</div>
                  {
                    foundJobs.map(
                      (item) => {
                        return (
                          <Card item={item} />
                        )
                      }
                    )
                  }
                </>
                : isSearchClicked && <div>No jobs found</div>}
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
    : <Navigate to='/login' />
}

export default SearchJob