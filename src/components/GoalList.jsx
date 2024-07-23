import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import ChartColumn from './ChartColumn';

export default function GoalList({
  goal,
  targetAmount,
  currentProgress,
  deadline,
  onEdit,
  onDelete,
}) {
  const dateDeadline = deadline
    ? new Date(deadline).toLocaleDateString()
    : 'No deadline';

  const totalRemaining = targetAmount - currentProgress;

  const markers = [
    { label: 'Target Amount', y: targetAmount },
    { label: 'Current Progress', y: currentProgress },
    { label: 'Total Remaining', y: totalRemaining },
  ];

  return (
    <div>
      <ul>
        <li>
          <strong>Goal:</strong> {goal}
        </li>
        <li>
          <strong>Amount:</strong> ${targetAmount.toFixed(2)}
        </li>
        <li>
          <strong>Current Progress:</strong> ${currentProgress.toFixed(2)}
        </li>
        <li>
          <strong>Total Remaining:</strong> ${totalRemaining.toFixed(2)}
        </li>
        <li>
          <strong>Deadline:</strong> {dateDeadline}
        </li>
      </ul>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
      <ChartColumn markers={markers} />
    </div>
  );
}
