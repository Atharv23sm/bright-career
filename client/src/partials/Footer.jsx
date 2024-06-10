import React from 'react'
import { FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='w-full py-10 bottom-0 left-0 flex flex-col items-center gap-10 border-t-[1px]'>
        <div>Join the conversation</div>
        <div className='flex gap-10'>
        <Link to={'https://www.instagram.com/atharv_mahabal/'}><FaInstagram size={'28'} /></Link>
        <Link to={'https://github.com/Atharv23sm'}><FaGithub size={'28'} /></Link>
        <Link to={'https://www.youtube.com/@atharv_uploads'}><FaYoutube size={'28'} /></Link>
        </div>
        <hr class="w-80 h-1 mx-auto bg-gray-500 border-0 rounded-xl"/>
        <div>
            { new Date().getFullYear()+' © Atharv Mahabal'}
        </div>
    </div>
  )
}

export default Footer