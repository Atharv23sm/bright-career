
function SubmitButton(props) {
  return (
    <div className='mb-10px'>
                <input
                  type="submit"
                  value={props.value}
                  className='w-[230px] md:w-[300px] font-bold bg-[#fe0] hover:bg-[#ff7] hover:shadow-[0_0_10px_#fe0] duration-[1s] text-black p-[6px] cursor-pointer'
                />
              </div>
  )
}

export default SubmitButton