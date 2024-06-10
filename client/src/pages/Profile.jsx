import { useContext, useState } from 'react'
import { FaPen, FaRegWindowClose } from 'react-icons/fa'
import { BASE_URL } from '../url'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import UserContext from '../context/UserContext'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import ArrowLeft from '../component/ArrowLeft'
import ProfilePic from '../component/ProfilePic'

function Profile() {

    const { userInfo, setUserInfo } = useContext(UserContext)

    const [oldUserEmail] = useState(userInfo.email)
    const [newName, setNewName] = useState(userInfo.name)
    const [newAbout, setNewAbout] = useState(userInfo.about)
    const [newEmail, setNewEmail] = useState(userInfo.email)
    const [newRole, setNewRole] = useState(userInfo.role)
    const [newAddress, setNewAddress] = useState(userInfo.address)
    const [newEducation, setNewEducation] = useState(userInfo.education)
    const [newActivity, setNewActivity] = useState(userInfo.activity)
    const [newSkills, setNewSkills] = useState(userInfo.skills)
    const [newExperience, setNewExperience] = useState(userInfo.experience)
    const [newProfilepicname] = useState(userInfo.profilepicname)

    const [imgFile, setImgFile] = useState(null)
    const [error, setError] = useState('')
    const [isIpDis, setIsIpDis] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('file', imgFile)
        formdata.append('oldUserEmail', oldUserEmail)
        formdata.append('name', newName)
        formdata.append('about', newAbout)
        formdata.append('email', newEmail)
        formdata.append('role', newRole)
        formdata.append('address', newAddress)
        formdata.append('education', newEducation)
        formdata.append('activity', newActivity)
        formdata.append('skills', newSkills)
        formdata.append('experience', newExperience)
        formdata.append('profilepicname', newProfilepicname)

        const response = await axios.post(`${BASE_URL}/profile`, formdata)

        if (response.data.status == 'error') {
            setError(response.data.message)
        }
        else {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('token2', response.data.token2)
            setUserInfo(response.data.userInfo)
            setIsIpDis(true)
        }
    }

    const navigate = useNavigate()

    return (
        <>
            <Header />

            <div className='w-full flex flex-col px-4 md:px-[10vw] py-28 gap-10'>

                <ArrowLeft />

                <div>

                    <form onSubmit={handleSubmit} className='flex flex-col items-center gap-10 bg-[#111] p-4 md:p-10'>

                        {!isIpDis ?
                            <div className='flex items-center gap-5'>
                                <input type="file" id='imgUpload' className='hidden'
                                    accept="image/jpeg, image/jpg"
                                    onChange={
                                        e => setImgFile(e.target.files[0])
                                    } />
                                <label htmlFor="imgUpload" className='p-20 border-[1px]'><FaPen></FaPen></label>
                            </div>
                            :
                            <ProfilePic ppname={userInfo.propfilepicname} />
                        }

                        <div className='w-full flex flex-col gap-4'>

                            {[['text', userInfo.name, newName, setNewName, 'Name'], ['text', userInfo.about, newAbout, setNewAbout, 'About'],
                            ['email', userInfo.email, newEmail, setNewEmail, 'Email'], ['select', userInfo.role, newRole]].map(
                                (item) => {
                                    if (item[0] != 'select') {
                                        return (
                                            <>
                                                <input type={item[0]} value={isIpDis ? item[1] : item[2]} disabled={isIpDis ? 'disabled' : ''} placeholder={item[4]}
                                                    onChange={(e) => {
                                                        item[3](e.target.value)
                                                        setError("")
                                                    }} className={` bg-[#282828] w-full ${!isIpDis ? 'border-[1px] border-[#aaa]' : ""}  p-[10px]`} required />
                                            </>)
                                    }
                                    else {
                                        return (
                                            <select value={isIpDis ? item[1] : item[2]} disabled={isIpDis ? 'disabled' : ''}
                                                className={`py-4 px-2 bg-[#333] w-full ${!isIpDis ? 'border-[1px] border-[#aaa]' : ""} 
                                              placeholder:text-white`}
                                                onChange={(e) => { setNewRole(e.target.value); setError("") }}>
                                                <option className="" value={''}>Role</option>
                                                <option className='option' value={'Open to work'}>Open to work</option>
                                                <option className='option' value={'Hiring'}>Hiring</option>
                                            </select>
                                        )
                                    }
                                }
                            )
                            }
                        </div>

                        <div className='w-full flex flex-col gap-4'>

                            {[['text', userInfo.address, newAddress, setNewAddress, 'Address'], ['text', userInfo.education, newEducation, setNewEducation, 'Education'],
                            ['text', userInfo.skills, newSkills, setNewSkills, 'Skills'], ['text', userInfo.activity, newActivity, setNewActivity, 'Activity'],
                            ['text', userInfo.experience, newExperience, setNewExperience, 'Experience']].map(
                                (item, index) => {
                                    return (
                                        <div>
                                            <input type={item[0]} value={isIpDis ? item[1] : item[2]} disabled={isIpDis ? 'disabled' : ''} placeholder={item[4]}
                                                onChange={(e) => {
                                                    item[3](e.target.value)
                                                    setError("")
                                                }} className={`bg-[#282828] w-full ${!isIpDis ? 'border-[1px] border-[#aaa]' : ""} p-2`} key={index} />
                                        </div>
                                    )
                                }
                            )
                            }
                        </div>

                        <div className='text-[#f33] font-bold'>{error}</div>

                        <div className='flex gap-6'>
                            {isIpDis && (
                                <div onClick={() =>
                                    setIsIpDis(false)
                                } className='p-[10px] cursor-pointer border-[2px] text-white rounded-full w-max hover:bg-[#444] duration-500'>Edit Profile</div>
                            )}

                            {!isIpDis && (
                                <button className='p-[10px] cursor-pointer bg-[#fe0] hover:bg-[#ff7] duration-500 border-[1px] border-black text-black rounded-full w-max' type='submit'
                                >Save</button>
                            )}
                            {!isIpDis && (
                                <div onClick={() => {
                                    setIsIpDis(true)
                                    setError("")
                                }
                                } className='p-[10px] cursor-pointer border-[1px] rounded-full w-max'>Cancel</div>
                            )}
                        </div>
                    </form>
                </div>
                <div onClick={() => {
                    if (confirm('Are you sure? you\'re logging out.')) {
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('token2');
                        navigate('/login');
                    }
                }} className='flex gap-2 items-center ml-1 cursor-pointer'><FaRegWindowClose />Logout</div>
            </div>

            <Footer />
        </>
    )
}

export default Profile