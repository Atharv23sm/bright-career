import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FaBuilding, FaCalendar, FaMapMarkerAlt, FaRupeeSign, FaBriefcase, FaEnvelope, FaUserAlt } from 'react-icons/fa'
import { jwtDecode } from 'jwt-decode'
import { BASE_URL } from '../url'
import axios from 'axios'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import ArrowLeft from '../component/ArrowLeft'
import Loading from '../Loading'

function JobDetails() {

    const [isApplied, setIsApplied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const token = sessionStorage.getItem('token')
    const token2 = sessionStorage.getItem('token2')

    const decod = jwtDecode(token)
    const loc = useLocation()
    const jobpostId = loc.state._id
    const hirer_email = loc.state.hirer_email
    const applicant_email = decod.user.email

    const handleApply = async () => {

        if (confirm('Are you sure? you\'re applying to this job-post.')) {

            setIsLoading(true)

            const response = await axios.post(`${BASE_URL}/apply`, { jobpostId, hirer_email, applicant_email })

            if (response.data.status == 'success') {
                setIsApplied(true)
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {

        const isJobApplied = async () => {

            const response = await axios.post(`${BASE_URL}/jobdetails`, { applicant_email, jobpostId })

            if (response.data.status == 'success') {
                setIsApplied(true)
            }
        }

        isJobApplied()
    }, [])

    const navigate = useNavigate()

    return token && token2 ?

        <>

            <Header />

            {isLoading ? <Loading /> :

                <div className='px-4 md:px-10 py-24'>

                    <ArrowLeft />

                    <div className='flex flex-col gap-12 py-[4vw] px-[4vw]' >

                        <div className='p-[4vh] bg-[#444] flex flex-col gap-4'>

                            <div className='text-[28px] font-bold'> {loc.state.jobrole} </div>
                            <div className='text-[20px] flex items-center gap-2 '> <FaUserAlt /> {loc.state.hirer_name} </div>
                            <hr />
                            <div className='flex flex-wrap gap-4 items-center'>
                                <div className='flex gap-2 items-center'><FaRupeeSign /> {loc.state.payment} </div>
                                <div>|</div>
                                <div className='flex gap-2 items-center'><FaBriefcase /> {loc.state.experience} </div>
                                <div>|</div>
                                <div className='flex gap-2 items-center'> <FaBuilding /> {loc.state.workmode} </div>
                            </div>

                            <div className='flex flex-wrap gap-4 items-center'>

                                <div className='flex gap-2 items-center'><FaMapMarkerAlt /> {loc.state.address} </div>
                                <div>|</div>

                                <div className='flex gap-2 items-center'><FaEnvelope /> {loc.state.hirer_email} </div>

                                <div>|</div>
                                <div className='flex gap-2 items-center'><FaCalendar /> {loc.state.h_date.substring(0, 10)} </div>
                            </div>
                            <hr />
                            <div className='font-bold tracking-wide'>About</div>
                            <div> {loc.state.about} </div>

                            <div className='font-bold tracking-wide'>Skills Required</div>
                            <div> {loc.state.reqskills} </div>
                            <hr />

                            {loc.state.hirer_email != decod.user.email
                                ?
                                <button
                                    className={` w-32 p-2 ${isApplied ? 'bg-[#999] cursor-not-allowed' : 'bg-[#fe0] hover:bg-[#ff7] cursor-pointer'}  duration-500 text-black rounded-full`}
                                    onClick={handleApply} disabled={isApplied ? 'disabled' : ""}>{isApplied ? 'Applied' : 'Apply'}</button>
                                :
                                <button
                                    className=' w-32 p-2 bg-[#fe0] hover:bg-[#ff7] border-[1px] border-black text-black rounded-full cursor-pointer'
                                    onClick={() => navigate('/applicants', { state: loc.state._id })}>See Applicants</button>}

                        </div>
                    </div>
                </div>
            }

            <Footer />

        </>

        : <Navigate to='/login' />
}

export default JobDetails