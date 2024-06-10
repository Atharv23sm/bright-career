
function ProfilePic({ppname}) {
    return (
        <div className='w-52 h-52 border-[1px] flex justify-center items-center overflow-hidden rounded-full'>
            {ppname ?
                <img src={ppname} alt="" className='h-full' />
                :
                <img src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' alt="" className='h-full' />
            }
        </div>
    )
}

export default ProfilePic