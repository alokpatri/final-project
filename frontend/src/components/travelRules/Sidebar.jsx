import { Shield, Gauge, Car, AlertTriangle } from "lucide-react";


export default function Sidebar({
  rules,
  selectedRule,
  // setSelectedRule,
})
 {

  const iconMap = {
    "Speed Limits": <Gauge size={18} />,
    "Helmet Rule": <Shield size={18} />,
    "Seat Belt Rule": <Car size={18} />,
  };


  return (
    <div className="w-1/4 bg-white/80 backdrop-blur-md p-5 border-r 
shadow-sm sticky top-20 h-screen overflow-y-auto">
      <h2 className="font-bold mb-4">Topics</h2>

      {rules.map((rule) => (
        <div
            key={rule.title} 
            className={`flex items-center gap-2 cursor-pointer p-3 rounded-xl mb-2 transition-all hover:scale-[1.02] ${
              selectedRule.title === rule.title
                ? "bg-green-100 text-green-700 shadow"
                : "hover:bg-gray-100"
            }`}
          >
            {iconMap[rule.title] || <AlertTriangle size={18} />}
            {rule.title}

        </div>
      ))}
    </div>
  );
}