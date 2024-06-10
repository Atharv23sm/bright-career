
function Loading() {
  return (
    <div className='h-screen flex gap-2 justify-center items-center'>
        <div className='rounded-full bg-[#ff3] animate-[loading_2s_infinite]'></div>
        <div className='rounded-full bg-[#ff3] animate-[loading_2s_infinite]'></div>
        <div className='rounded-full bg-[#ff3] animate-[loading_2s_infinite]'></div>
    </div>
  )
}

export default Loading