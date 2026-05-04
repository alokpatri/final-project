import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ContactUs() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://127.0.0.1:5000/contact", formData);

    toast.success("Message sent successfully 📩");

    setFormData({ name: "", email: "", message: "" });

  } catch (err) {
    toast.error("Failed to send message ❌");
  }
};

  return (
    <div id="contact" className="py-16 bg-gray-100 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Contact Us 📩
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border p-2 rounded"
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
}

export default ContactUs;