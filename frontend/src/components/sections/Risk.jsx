import SectionWrapper from "../common/SectionWrapper";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { mapData } from "../../utils/chart";

export default function Risk({ data }) {

  const risk = data.risk || {};

  const alcohol = Object.entries(risk.alcohol || {}).map(([k,v])=>({name:k,value:v}));
  const night = Object.entries(risk.night || {}).map(([k,v])=>({name:k,value:v}));
  const speeding = Object.entries(risk.speeding || {}).map(([k,v])=>({name:k,value:v}));

  return (
    <SectionWrapper title="Risk Factor Analysis" isLoading={!data}>

      <div className="grid grid-cols-3 gap-4">

        {/* ALCOHOL */}
        <Chart title="Alcohol Impact" data={alcohol} />

        {/* NIGHT */}
        <Chart title="Day vs Night" data={night} />

        {/* SPEEDING */}
        <Chart title="Speeding Impact" data={speeding} />

      </div>

    </SectionWrapper>
  );
}

function Chart({ title, data }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      <h3 className="font-semibold mb-2">{title}</h3>

      <BarChart width={300} height={200} data={data}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="value"/>
      </BarChart>
      <BarChart data={mapData(data.alcohol)} />
      <BarChart data={mapData(data.weather)} />
      <BarChart data={mapData(data.road_condition)} />
    </div>
  );
}