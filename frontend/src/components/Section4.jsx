import React from 'react'
import { Link } from 'react-router-dom';

const Section4 = () => {
  return (
    <div className='bg-gray-100 py-10 px-6'>
      <div className='max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row items-center gap-8'>
        {/* left side */}
        <div className='lg:w-1/2 space-y-4'>
          <h1 className='text-3xl lg:text-4xl font-bold text-gray-800'>Get Actional Insights instantly</h1>
          <p className='text-gray-600 text-lg'>Analyze accident data, track trends, and make smarter decisions using real-time insights.</p>

          <button className='mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition duration-300'>
           <Link to="/dashboard">Explore Dashboards</Link>
          </button>
        </div>

        {/* right */}
        <div className='lg:w-1/2'>
          <img src="/images/dashboard1.webp"
          alt="image"
          className='w-full h-[300px] px-10 object-cover rounded-xl'
          />
        </div>
      </div>
    </div>
  )
}

export default Section4
