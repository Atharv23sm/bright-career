import { FaArrowLeft } from 'react-icons/fa'

function ArrowLeft() {
  return (
    <div className='w-full flex justify-start'>
      <FaArrowLeft
        className='cursor-pointer'
        onClick={() => {
          window.history.back();
        }} />
    </div>
  )
}

export default ArrowLeft