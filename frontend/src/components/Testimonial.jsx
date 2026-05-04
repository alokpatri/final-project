import React from "react";

const Testimonials = () => {
  const clients = [
    {
      image: "/images/boy.png",
      name: "Rahul Sharma",
      message:
        "This dashboard helped me understand accident trends easily. Very useful and user-friendly!",
    },
    {
      image: "/images/girl.png",
      name: "Priya Verma",
      message:
        "The safest route feature is amazing. It really helped me avoid risky areas while traveling.",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          What our client says
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {clients.map((client, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              {/* client image */}
              <img
                src={client.image}
                alt={client.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {client.name}
              </h3>
              {/* ⭐ Stars */}
              <div className="text-yellow-400 mb-2 text-lg">
                ⭐⭐⭐⭐⭐
              </div>

              {/* Message */}
              <p className="text-gray-600 mb-4 italic">
                “{client.message}”
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Testimonials;