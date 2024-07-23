import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ChartColumn = ({ markers }) => {
  const dataPoints = markers.map((marker) => ({
    label: marker.label,
    y: marker.y,
  }));

  const graph = {
    animationEnable: true,
    title: {
      text: 'Chart Visual',
    },
    axisY: {
      title: 'Dollar amount',
      suffix: 'K',
    },
    data: [
      {
        type: 'column',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <h3>Budget Graph</h3>
      <CanvasJSChart options={graph} />
    </div>
  );
};
export default ChartColumn();
