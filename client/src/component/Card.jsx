import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaCalendar, FaBriefcase, FaRupeeSign, FaUserAlt } from 'react-icons/fa'

function Card({item}) {
const navigate = useNavigate()

    return (
        <div className='p-[2vh] bg-[#444] flex flex-col gap-4 cursor-pointer hover:bg-[#666] hover:shadow-lg hover:shadow-[#111] hover:rounded-md duration-1000'
            onClick={() => {
                navigate('/jobdetails', { state: item })
            }} key={item._id}>

            <div className='p-2 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                <div className='text-[28px] font-bold'> {item.jobrole} </div>
                <div className='text-[20px] flex items-center gap-2'><FaUserAlt/> {item.hirer_name} </div>
                </div>
                <div className='flex flex-wrap gap-4 items-center'>
                <div className='flex gap-2 items-center' > <FaRupeeSign/> {item.payment} </div>
                <div>|</div>
                <div className='flex gap-2 items-center' > <FaBriefcase/> {item.experience} </div>
                </div>

                <div className='flex flex-wrap gap-4 items-center'>
                <div className='flex gap-2 items-center' > <FaMapMarkerAlt/> {item.address} </div>
                <div>|</div>
                <div className='flex gap-2 items-center' > <FaCalendar/> {item.h_date.substring(0,10)} </div>
                </div>

            </div>
        </div>
    )
}

export default Card