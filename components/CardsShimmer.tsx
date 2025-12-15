import React from 'react'

const CardsShimmer = () => {
  return (
    <div className='p-4 bg-white border rounded-lg min-h-32 border-zinc-200'>
      <div className='w-full animate-pulse h-8 rounded-t-md bg-zinc-200/80 mb-2'></div>
      <div className='w-full animate-pulse h-16 bg-zinc-200/80 mb-2'></div>

      <div className='grid grid-cols-3 gap-2 rounded-b-md overflow-hidden'>
        <div className='w-full animate-pulse h-5 bg-zinc-200/80 col-span-2'></div>
        <div className='w-full animate-pulse h-5 bg-zinc-200/80 '></div>
      </div>
    </div>
  )
}

export default CardsShimmer