import React from 'react';

export default function GoalList({
  goal,
  targetAmount,
  currentProgress,
  deadline,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      Goal: {goal}
      Target Amount: {targetAmount}
      Current Progress: {currentProgress}
      Deadline: {deadline}
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
