import SectionWrapper from "../common/SectionWrapper";

export default function Insights({ data }) {

  const insights = data.insights || [];

  return (
    <SectionWrapper title="Final Insights">

      <ul className="list-disc pl-6 space-y-2">
        {insights.map((i, idx)=>(
          <li key={idx}>{i}</li>
        ))}
      </ul>
      <div>
        {data.insights?.map((i, idx) => (
            <p key={idx} className="text-sm">{i}</p>
          ))}
      </div>

    </SectionWrapper>
  );
}