import React from 'react';

export default function FinanceForm({
  expense,
  setExpense,
  deadline,
  setDeadline,
  targetAmount,
  setTargetAmount,
  currentProgress,
  setCurrentProgress,
  totalRemaining,
  editId,
  updateItem,
  addFinance,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      updateItem(e);
    } else {
      addFinance(e);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="expense" className="block mb-1">
            Expense:
          </label>
          <input
            id="expense"
            type="text"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block mb-1">
            Deadline:
          </label>
          <input
            id="deadline"
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="targetAmount" className="block mb-1">
            Target Amount:
          </label>
          <input
            id="targetAmount"
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(Number(e.target.value))}
            required
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="currentProgress" className="block mb-1">
            Current Progress:
          </label>
          <input
            id="currentProgress"
            type="number"
            value={currentProgress}
            onChange={(e) => setCurrentProgress(Number(e.target.value))}
            required
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <strong>Total Remaining</strong> {totalRemaining}
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
      >
        {editId !== null ? 'Update' : 'Add'}
      </button>
    </form>
  );
}
