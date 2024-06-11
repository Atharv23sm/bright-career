import { FaArrowAltCircleUp } from "react-icons/fa"
import { Link } from "react-router-dom"

function HomeButton({link,bottom,text}) {
    return (
        <Link to={`/${link}`} className={`absolute bottom-${bottom} flex gap-2 items-center z-20 w-max justify-center
    bg-[#00000077] backdrop-blur-sm hover:bg-[#00000099] hover:backdrop-blur p-2 md:p-4 border-[2px]
    border-[#fe0] rounded-full duration-1000 group`}>
            {text} <FaArrowAltCircleUp className='rotate-45 group-hover:rotate-90 duration-500 text-[#fe0]' /></Link>

    )
}

export default HomeButton