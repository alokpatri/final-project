import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
export default function RuleContent({ rule }) {

  const [tip, setTip] = useState("");

  const getTip = async () => {
    const res = await axios.get(`/api/ai-tips/${rule.title}`);
    setTip(res.data.tip);
  };

  return (
    <div className="w-3/4 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        className="space-y-6">

          {/* Title */}
         <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            {rule.title}
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              Rule
            </span>
          </h1>

          {/* Image */}
          <img
            src={rule.image}
            alt={rule.title}
            className="rounded-2xl shadow-lg w-full h-72 object-cover"
          />

          {/* Cards */}
          <div className="grid gap-4 border border-gray-100 rounded-xl p-4">

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-green-600">Description</h3>
              <p>{rule.description}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-green-600">Why Important</h3>
              <p>{rule.reason}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-green-600">Penalty</h3>
              <p>{rule.penalty}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-green-600">Example</h3>
              <p>{rule.example}</p>
            </div>

          </div>
          {/* <RuleChart data={chartData} /> */}
          <div className="mt-6">
            <button onClick={getTip} className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 hover:shadow-lg transition duration-300">
              Get AI Tips
            </button>

            <p className="mt-3 text-green-700">{tip}</p>
          </div>
        </motion.div>
      </div>  
  );
}





