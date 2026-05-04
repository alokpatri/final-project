import SectionWrapper from "../common/SectionWrapper";
import Card from "../common/Card";

export default function Overview({ data }) {

  const isLoading = !data; // Show loading state if data is not yet available

  return (
    <SectionWrapper title="Overview" isLoading={isLoading}>

      <div className="grid grid-cols-4 gap-4">

        <div className="grid grid-cols-3 gap-4">
          <Card title="Total Accidents" value={data.total_accidents} />
          <Card title="Casualties" value={data.total_casualties} />
          <Card title="Fatalities" value={data.total_fatalities} />
          <Card title="Injuries" value={data.total_injuries} />
          <Card title="Avg/day" value={data.avg_per_day} />
        </div>
      </div>

    </SectionWrapper>
  );
}