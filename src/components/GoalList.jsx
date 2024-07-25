import React from 'react';

export default function GoalList({
  expense,
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

  return (
    <div>
      <ul>
        <li>
          <strong>Expense:</strong> {expense}
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
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-blue-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
