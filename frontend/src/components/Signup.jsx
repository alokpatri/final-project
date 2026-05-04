import React from 'react'

const Signup = () => {
  return (
    
    <section className="w-[90%] md:w-[80%] mx-auto py-16 flex flex-col md:flex-row gap-10">

      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-[#160637]">
          See why companies use Qubly
        </h2>
      </div>

      <div className="md:w-1/2 bg-purple-100 p-6 rounded-lg">
        <div className="bg-white p-6 rounded-lg shadow-lg">

          <h2 className="text-xl font-bold mb-4">Sign Up</h2>

          <input className="w-full border p-1 mt-3 rounded" placeholder="Name" />
          <input className="w-full border p-1 mt-3 rounded" placeholder="Email" />
          <input className="w-full border p-1 mt-3 rounded" placeholder="Password" />
          <button className="bg-purple-600 text-white w-full py-2 mt-3 rounded border hover:bg-purple-700">
            Register
          </button>

        </div>
      </div>

    </section>

  )
}

export default Signup
