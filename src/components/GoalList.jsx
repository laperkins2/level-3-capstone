import React from 'react';

export default function GoalList({
  goal,
  targetAmount,
  currentProgress,
  deadline,
  totalRemaining,
  onEdit,
  onDelete,
}) {
  const dateDeadline = deadline
    ? new Date(deadline).toLocaleDateString()
    : 'No deadline';

  return (
    <div>
      <ul>
        <li>
          <strong>Goal:</strong> {goal}
        </li>
        <li>
          <strong>Amount:</strong> ${targetAmount}
        </li>
        <li>
          <strong>Current Progress:</strong> ${currentProgress}
        </li>
        <li>
          <strong>Total Remaining:</strong> ${totalRemaining}
        </li>
        <li>
          <strong>Deadline:</strong> {dateDeadline}
        </li>
      </ul>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
