import SectionWrapper from "../common/SectionWrapper";

export default function Summary({ data }) {

    const summary = data.summary || "No summary available.";

  return (
    <SectionWrapper>
          <h2 className="text-xl font-bold mb-2">📊 Summary Report</h2>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl text-gray-700 leading-relaxed text-md shadow">
       

            {summary}

      </div>

    </SectionWrapper>
  );
}