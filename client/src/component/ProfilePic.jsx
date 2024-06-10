import { BASE_URL } from "../url"

function ProfilePic({ppname}) {
    return (
        <div className='w-52 h-52 border-[1px] flex justify-center items-center overflow-hidden rounded-full'>
            {ppname ?
                <img src={`${BASE_URL}/` + ppname} alt="" className='h-full' />
                :
                <img src={`${BASE_URL}/default.jpg`} alt="" className='h-full' />
            }
        </div>
    )
}

export default ProfilePic