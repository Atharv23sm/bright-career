import defaultpp from '../assets/default.png'
function ProfilePic({ppname}) {
    return (
        <div className='w-52 h-52 border-[1px] flex justify-center items-center overflow-hidden rounded-full'>
            {ppname ?
                <img src={ppname} alt="" className='h-full' />
                :
                <img src={defaultpp} alt="" className='h-full' />
            }
        </div>
    )
}

export default ProfilePic