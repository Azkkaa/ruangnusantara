import { CircleNotchIcon } from '@phosphor-icons/react'

const Loading = ({size, classname}) => {
  
  return (
    <div className={`w-full py-5 flex justify-center items-center ${classname ?? ''}`}>
      <div>
        <CircleNotchIcon size={size ?? 42} weight="bold" className='animate-spin text-orange-600'/>
      </div>
    </div>
  )
}

export default Loading