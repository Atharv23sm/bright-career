import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { BASE_URL } from '../url'
import { FaBriefcase, FaGraduationCap, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import axios from 'axios'

import Header from '../partials/Header'
import ArrowLeft from '../component/ArrowLeft'
import Footer from '../partials/Footer'
import ProfilePic from '../component/ProfilePic'

function Applicants() {

    const [applicants, setApplicants] = useState([])

    const loc = useLocation()
    const jobpostId = loc.state

    const getApplicants = async () => {
        const response = await axios.post(`${BASE_URL}/applicants`, { jobpostId })
        if (response.data.status == 'success') {
            setApplicants(response.data.applicants)
        }
    }

    useEffect(() => {
        getApplicants()
    }, [])

    const token = sessionStorage.getItem('token')
    const token2 = sessionStorage.getItem('token2')

    return token && token2 ?
        <>
            <Header />

            <div className='px-3 md:px-20 py-24 flex flex-col gap-10'>

                <ArrowLeft />

                <div>Total {applicants.length} applicants</div>

                <div className='flex flex-col gap-12 md:px-20' >

                    {applicants.map(
                        (item) => {

                            return (
                                <div className='px-4 md:px-8 py-10 bg-[#111] flex flex-col gap-6' key={item._id}>

                                    <div className='flex flex-col gap-4 items-center'>
                                        <ProfilePic ppname={item.profilepicname} />
                                        <div className='text-[20px]'>{item.name}</div>
                                    </div>

                                    <hr />
                                    <div className='flex flex-wrap gap-4 justify-center'>
                                        <div className='flex gap-2 items-center'><FaEnvelope />{item.email}</div>
                                        <div>|</div>
                                        <div className='flex gap-2 items-center'><FaMapMarkerAlt />{item.address}</div>
                                    </div>

                                    <div className='flex flex-wrap gap-4 justify-center'>
                                        <div className='flex gap-2 items-center'><FaGraduationCap />{item.education}</div>
                                        <div>|</div>
                                        <div className='flex gap-2 items-center'><FaBriefcase />{item.experience}</div>
                                    </div>

                                    {[['About', item.about], ['Skills', item.skills], ['Acitivity', item.activity]].map(
                                        (usr) => {
                                            return (
                                                <>
                                                    <hr />
                                                    <div className='flex flex-col items-center gap-3'>
                                                        <div className='font-bold tracking-wide'>{usr[0]}</div>
                                                        <div>{usr[1]}</div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    )}

                                </div>
                            )
                        }
                    )
                    }

                </div>

            </div>

            <Footer />

        </>

        : <Navigate to='/login' />
}

export default Applicants