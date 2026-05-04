export default function DownloadButton() {
  return (
    <div className="flex gap-2">

      <a href="http://localhost:5000/export-csv"
         className="bg-blue-500 text-white px-3 py-2 rounded">
        Download CSV
      </a>

      <a href="http://localhost:5000/export-pdf"
         className="bg-green-500 text-white px-3 py-2 rounded">
        Download PDF
      </a>

    </div>
  );
}