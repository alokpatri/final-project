import React from 'react'

const FeedbackForm = () => {
  return (
    <div className="bg-white p-6 rounded-xl">
      <h2>Feedback</h2>
      <textarea className="w-full border p-2" placeholder="Your feedback..." />
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  )
}

export default FeedbackForm
