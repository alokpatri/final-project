export default function CountryBar({
  countries,
  selectedCountry,
  setSelectedCountry,
}) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 flex gap-3 overflow-x-auto shadow">
      {countries.map((country) => (
        <button
          key={country.name}
          onClick={() => setSelectedCountry(country)}
          className={`px-5 py-2 rounded-full text-sm font-medium 
            transition-all duration-300 transform hover:scale-105 ${
              selectedCountry.name === country.name
                ? "bg-white text-green-600 shadow-md"
                : "bg-green-500/30 hover:bg-white hover:text-green-600"
            }`}
        >
          {country.name}
        </button>
      ))}
    </div>
  );
}