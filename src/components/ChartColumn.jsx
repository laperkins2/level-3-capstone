import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ChartColumn = ({ markers }) => {
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
        markers,
      },
    ],
  };

  return (
    <div>
      <h3>Budget Graph</h3>
      <CanvasJSChart graph={graph} />
    </div>
  );
};
export default ChartColumn();
