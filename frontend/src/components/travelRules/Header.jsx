export default function Header({ setSearch }) {
  return (
    <div className="flex items-center justify-between px-8 py-4 
    bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">

      {/* Logo */}
      <div className="text-2xl font-bold text-green-600 tracking-wide">
        SafeX
      </div>

      {/* Search */}
      <div className="w-1/3 relative">
        <input
          type="text"
          placeholder="Search traffic rules..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-2 rounded-full border border-gray-200 
          focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
        />
      </div>

      {/* Title */}
      <div className="text-lg font-semibold text-gray-700">
        Traveling Rules
      </div>
    </div>
  );
}