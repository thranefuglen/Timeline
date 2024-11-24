import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';

const TimelineComponent = () => {
  // Sample timeline data
  const events = [
    { date: new Date('2024-01-15'), name: 'Project Start', details: 'Kickoff meeting' },
    { date: new Date('2024-02-01'), name: 'Phase 1', details: 'Requirements gathering' },
    { date: new Date('2024-03-15'), name: 'Milestone', details: 'Design approval' },
    { date: new Date('2024-04-01'), name: 'Phase 2', details: 'Development begins' },
    { date: new Date('2024-05-15'), name: 'Review', details: 'Client presentation' }
  ];

  // Convert dates to numbers for plotting
  const data = events.map(event => ({
    x: event.date.getTime(),
    y: 1,
    ...event
  }));

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const event = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
          <p className="font-bold text-gray-900">{event.name}</p>
          <p className="text-gray-600">{event.date.toLocaleDateString()}</p>
          <p className="text-gray-700">{event.details}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full rounded-lg bg-white shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Project Timeline</h2>
      </div>
      <div className="w-full h-64">
        <ScatterChart
          width={800}
          height={200}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis
            dataKey="x"
            domain={['auto', 'auto']}
            name="Date"
            tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
            type="number"
          />
          <YAxis dataKey="y" hide={true} />
          <ZAxis range={[100, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Scatter data={data} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill="#2563eb"
                className="hover:fill-blue-700"
              />
            ))}
          </Scatter>
        </ScatterChart>
      </div>
    </div>
  );
};

export default TimelineComponent;