"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";

type SegmentData = [string, number];

interface Props {
  data: SegmentData[];
}

const CustomTooltip = ({ active, payload, label, coordinate }: any) => {
  if (active && payload && payload.length) {
    const segmentName = label;               // from XAxis dataKey="segment"
    const value = payload[0].value;           // from Bar dataKey="speed"

    return (
      <div
        style={{
          position: 'absolute',
          left: coordinate.x,
          top: -10, // 10px above the bar
          transform: 'translate(-50%, -100%)', // bottom edge touches bar top
          background: 'white',
          border: '1px solid #ccc',
          padding: '4px 8px',
          fontSize: '12px',
          borderRadius: '4px',
          pointerEvents: 'none',
          boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
          textAlign: 'center',
          whiteSpace: 'nowrap'
        }}
      >
        <div style={{ fontWeight: 'bold' }}>{segmentName}</div>
        <div>{`${value} WPM`}</div>
      </div>
    );
  }
  return null;
};





export default function SpeedTimelineBarChart({ data }: Props) {
  // Transform tuple data into objects for recharts
  const chartData = data.map(([segment, speed]) => ({
    segment,
    speed,
  }));

  return (
    <div className="w-[60%] h-[70%] bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap="20%" margin={{ bottom: 40 }} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="segment"
            tickFormatter={(_, index) => (index + 1).toString()} // Show index starting from 1
            angle={-20}
            textAnchor="middle"
            interval={0}
          >

          <Label value="segment" position="insideBottom" offset={-5} />

          </XAxis>

          <YAxis>

            <Label 
              value="speed" 
              angle={-90} 
              position="insideLeft" 
              style={{ textAnchor: 'middle' }} 
            />

          </YAxis>

          <Tooltip content={<CustomTooltip />} cursor={false} />


          <Bar dataKey="speed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
