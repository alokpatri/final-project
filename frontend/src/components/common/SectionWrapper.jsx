export default function SectionWrapper({
  title,
  children,
  actions,
  isLoading
}) {
    if (isLoading) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="animate-pulse h-40 bg-gray-200 rounded-xl"></div>
         </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-2">

        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>

        {/* Optional actions (buttons, filters, etc) */}
        {actions && <div>{actions}</div>}
      </div>

      {/* CONTENT */}
      <div className="space-y-4">
        {children}
      </div>

    </div>
  );
}