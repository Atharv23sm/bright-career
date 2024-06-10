import { useState, useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Navigate, useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaCalendar, FaRupeeSign, FaBuilding, FaMailBulk, FaSuitcase, FaAngleDown } from 'react-icons/fa'
import { BASE_URL } from '../url'
import Header from '../partials/Header'
import ArrowLeft from '../component/ArrowLeft'
import UserContext from '../context/UserContext'
import Footer from '../partials/Footer'
import axios from 'axios'
import Loading from '../Loading'

function Hire() {

    const { userInfo } = useContext(UserContext)
    const { hiringPostData, setHiringPostData } = useContext(UserContext)
    const { setGlobeHiringList } = useContext(UserContext)
    const [jobrole, setJobrole] = useState("")
    const [about, setAbout] = useState("")
    const [hirerName, setHirerName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [payment, setPayment] = useState("")
    const [category, setCategory] = useState("")
    const [workmode, setWorkmode] = useState("")
    const [experience, setExperience] = useState("")
    const [reqskills, setReqskills] = useState("")
    const [btnVal, setBtnVal] = useState('Add')
    const [showcards, setShowcards] = useState(4)
    const [isLoading, setIsLoading] = useState(false)

    const token = sessionStorage.getItem('token')
    const token2 = sessionStorage.getItem('token2')
    const token3 = sessionStorage.getItem('token3')
    const token4 = localStorage.getItem('token4')

    useEffect(() => {
        setEmail(userInfo.email)
        setHirerName(userInfo.name)

        if (token3) {
            const decoded3 = jwtDecode(token3)
            setHiringPostData(decoded3.hiringList)
        }

        if (token4) {
            const decoded4 = jwtDecode(token4)
            setGlobeHiringList(decoded4.globeHiringList)
        }

    }, [token3, token4, userInfo.email, userInfo.name])

    const getTokens = (response) => {

        sessionStorage.setItem('token3', response.data.token3)
        const token3 = sessionStorage.getItem('token3')

        localStorage.setItem('token4', response.data.token4)
        const token4 = localStorage.getItem('token4')

        if (token3) {
            const decoded3 = jwtDecode(token3)
            setHiringPostData(decoded3.hiringList)
        }

        if (token4) {
            const decoded4 = jwtDecode(token4)
            setGlobeHiringList(decoded4.globeHiringList)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await axios.post(`${BASE_URL}/hire`,
            { jobrole, about, hirerName, email, address, payment, category, workmode, experience, reqskills })

        setBtnVal("Added")
        setTimeout(() => {
            setBtnVal('Add')
        }, 3000)

        if (response) {
            getTokens(response)
            setIsLoading(false)
        }
    }

    const deletePost = async (id, hirer_email) => {
        setIsLoading(true)

        if (confirm('Are you sure?')) {
            try {
                const response = await axios.delete(`${BASE_URL}/deletejobpost`, {
                    data: { id, hirer_email }
                });

                if (response) {
                    getTokens(response)
                    setIsLoading(false)
                }

            } catch (error) {
                console.error('Error removing text line:', error);
            }
        };
    }

    const navigate = useNavigate()

    return token && token2 ?

        <>

            <Header />

            {isLoading ? <Loading /> :
                <>
                    <div className='flex flex-col px-8 md:px-20 pt-24 gap-5'>

                        <ArrowLeft />

                        <div className='text-[20px]'>Job post details </div>

                        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-4 md:p-10 bg-[#333]'>

                            {[['Job Role', setJobrole], ['About', setAbout], ['Address', setAddress], ['Pay', setPayment], ['Experience', setExperience], ['Required Skills', setReqskills]].map(
                                (item, index) => {
                                    return (
                                        <input type="text" placeholder={item[0]}
                                            onChange={(e) => item[1](e.target.value)}
                                            className={`bg-[#111] placeholder:text-white w-full p-4`} required key={index} />
                                    )
                                }
                            )}

                            {[[['Category', 'Business', 'Education', 'Finance', 'Information Technology', 'Law', 'Management', 'Sales', 'Human Resources', 'Other'], setCategory], [['Mode', 'Hybrid', 'Onsite', 'Remote'], setWorkmode]]
                                .map(
                                    (item) => {
                                        return (
                                            <select className='p-4 bg-[#111] w-full placeholder:text-white'
                                                key={item}
                                                onChange={(e) => item[1](e.target.value)}>{
                                                    item[0].map((opt) => {
                                                        return (
                                                            <option className='bg-[#333]' value={opt} selected={(opt == 'Category' || opt == 'Mode') && 'selected'} disabled={opt == 'Category' || opt == "Mode" && 'disabled'}>{opt}</option>
                                                        )
                                                    })}
                                            </select>
                                        )
                                    }
                                )}

                            <div className='flex justify-between'>
                                <input type="submit" value={btnVal} disabled={btnVal == 'Added' && 'disabled'} className={` w-20 p-3 ${btnVal != 'Added' ? 'bg-[#fe0] hover:bg-[#ff7] hover:shadow-[0_0_10px_#fe0]' : 'bg-[#4f4]'}  duration-500 text-black rounded-full cursor-pointer`} />
                                <input type="reset" value="Reset" className=' w-20 p-3 border-[1px] rounded-full cursor-pointer' />
                            </div>

                        </form>

                    </div>

                    <div className='flex flex-col gap-12 py-[8vw] px-[4vw]'>

                        <div className='text-[20px]'>Jobs posted by you</div>

                        {
                            hiringPostData.slice(0, showcards).map(
                                (item) => {
                                    return (
                                        <div className='p-4 md:p-10 bg-[#111] flex flex-col gap-4' key={item._id}>

                                            <div className='text-[28px] font-bold'> {item.jobrole} </div>
                                            <div className='text-[20px] '> {item.hirer_name} </div>
                                            <hr />
                                            <div className='flex flex-wrap gap-4 items-center'>
                                                <div className='flex gap-2 items-center'><FaRupeeSign /> {item.payment} </div>
                                                <div>|</div>
                                                <div className='flex gap-2 items-center'><FaSuitcase /> {item.experience} </div>
                                                <div>|</div>
                                                <div className='flex gap-2 items-center'> <FaBuilding /> {item.workmode} </div>

                                            </div>

                                            <div className='flex flex-wrap gap-4 items-center'>

                                                <div className='flex gap-2 items-center'><FaMapMarkerAlt /> {item.address} </div>
                                                <div>|</div>

                                                <div className='flex gap-2 items-center'><FaMailBulk /> {item.hirer_email} </div>

                                                <div>|</div>
                                                <div className='flex gap-2 items-center'><FaCalendar /> {item.h_date.substring(0, 10)} </div>
                                            </div>
                                            <hr />
                                            <div className='font-bold tracking-wide'>About</div>
                                            <div> {item.about} </div>

                                            <div className='font-bold tracking-wide'>Skills Required</div>
                                            <div> {item.reqskills} </div>
                                            <hr />

                                            <div className='flex justify-between'>
                                                <button
                                                    className=' w-32 p-2 bg-[#fe0] hover:bg-[#ff7] duration-500 text-black rounded-full cursor-pointer'
                                                    onClick={() => navigate('/applicants', { state: item._id })}
                                                >See Applicants</button>

                                                <button
                                                    className=' w-32 p-2 bg-[#e00] text-white rounded-full cursor-pointer'
                                                    onClick={() => deletePost(item._id, item.hirer_email)}
                                                >Remove post</button>

                                            </div>

                                        </div>
                                    )
                                }
                            )
                        }
                        <FaAngleDown size={24} onClick={() => { setShowcards(showcards + 4) }} className='cursor-pointer' />
                    </div>
                </>
            }

            <Footer />

        </>
        : <Navigate to='/login' />
}

export default Hire