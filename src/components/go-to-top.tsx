import React from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'

const GoToTop = () => {
    return (
        <div className='fixed bottom-4 right-4 z-50'>
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className='p-2 cursor-pointer bg-primary text-accent rounded-full shadow-lg'
            >
                <FaArrowCircleUp className='h-6 w-6' />
            </button>
        </div>
    )
}

export default GoToTop
