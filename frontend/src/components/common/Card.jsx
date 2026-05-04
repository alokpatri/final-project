export default function Card({
  title,
  value,
  change,
  icon,
}) {

  const isPositive = change >= 0;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all flex justify-between items-center">

      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <h2 className="text-2xl font-bold mt-1">
          {value ?? "0"}
        </h2>

        {/* TREND */}
        {change !== undefined && (
          <p className={`text-sm mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "▲" : "▼"} {Math.abs(change)}%
          </p>
        )}
      </div>

      {/* RIGHT ICON */}
      {icon && (
        <div className="text-3xl text-gray-300">
          {icon}
        </div>
      )}
    </div>
  );
}