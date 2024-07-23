'use client';
import React, { useEffect, useState } from 'react';
import {
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from '@/utils/firebase.Utils';
import { logout } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';

export default function ManagementPage() {
  const [itemGoal, setItemGoal] = useState([]);
  const [itemExpense, setItemExpense] = useState('');
  const [itemDeadline, setItemDeadline] = useState('');
  const [itemTargetAmount, setItemTargetAmount] = useState();
  const [itemCurrentProgress, setItemCurrentProgress] = useState();
  const [editItemId, setEditItemId] = useState(null);
  const [availableGoals, setAvailableGoals] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const documents = await getAllDocuments('goals');
        setItemGoal(documents);
        setAvailableGoals(documents.length);
      } catch (error) {
        console.error('Not able to fetch:', error);
      }
    };
    fetchDocuments();
  }, []);

  const totalRemaining = itemTargetAmount - itemCurrentProgress;

  const addGoal = async (e) => {
    e.preventDefault();

    const newGoal = {
      goal: itemGoal,
      expense: itemExpense,
      deadline: itemDeadline,
      targetAmount: itemTargetAmount,
      currentProgress: itemCurrentProgress,
      totalRemaining: totalRemaining,
    };
    try {
      const docId = await addDocument('goals', newGoal);
      setItemGoal((prevItems) => [...prevItems, { id: docId, ...newGoal }]);
      setItemExpense('');
      setItemDeadline('');
      setItemTargetAmount();
      setItemCurrentProgress();
      setAvailableGoals((prev) => prev + 1);
    } catch (error) {
      console.error('Not able to add document:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDocument('goals', id);
      setItemGoal((prevItems) => prevItems.filter((item) => item.id !== id));
      setAvailableGoals((prev) => prev - 1);
    } catch (error) {
      console.error('Not able to delete document:', error);
    }
  };

  const editItem = (id) => {
    let itemToEdit = itemGoal.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItemId(id);
      setItemExpense(itemToEdit.expense);
      setItemDeadline(itemToEdit.deadline);
      setItemTargetAmount(itemToEdit.targetAmount);
      setItemCurrentProgress(itemToEdit.currentProgress);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();

    const updatedGoal = {
      expense: itemExpense,
      deadline: itemDeadline,
      targetAmount: itemTargetAmount,
      currentProgress: itemCurrentProgress,
      totalRemaining: totalRemaining,
    };
    try {
      await updateDocument('goals', editItemId, updatedGoal);
      const updatedItems = itemGoal.map((item) =>
        item.id === editItemId ? { id: editItemId, ...updatedGoal } : item
      );
      setItemGoal(updatedItems);
      setEditItemId(null);
      setItemExpense('');
      setItemDeadline('');
      setItemTargetAmount();
      setItemCurrentProgress();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleLogOut = () => {
    logout();
    router.push('/');
    setItemGoal([]);
    setItemExpense('');
    setItemDeadline('');
    setItemTargetAmount();
    setItemCurrentProgress();
    setEditItemId(null);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Planning for future Purchases
        </h1>
        <h3 className="text-xl mb-4">Available Goals: {availableGoals}</h3>
        <form
          onSubmit={editItemId !== null ? updateItem : addGoal}
          className="mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="expense" className="block mb-1">
                Expense:
              </label>
              <input
                id="expense"
                type="text"
                value={itemExpense}
                onChange={(e) => setItemExpense(e.target.value)}
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
                value={itemDeadline}
                onChange={(e) => setItemDeadline(e.target.value)}
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
                value={itemTargetAmount}
                onChange={(e) => setItemTargetAmount(Number(e.target.value))}
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
                value={itemCurrentProgress}
                onChange={(e) => setItemCurrentProgress(Number(e.target.value))}
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
            {editItemId !== null ? 'Update' : 'Add'}
          </button>
        </form>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {itemGoal.map((item) => (
            <li key={item.id} className="border border-gray-200 rounded-md p-4">
              <div className="mb-2">
                <strong>Expense:</strong> {item.expense}
              </div>
              <div className="mb-2">
                <strong>Deadline:</strong> {item.deadline}
              </div>
              <div className="mb-2">
                <strong>Target Amount:</strong> {item.targetAmount}
              </div>
              <div className="mb-2">
                <strong>Current Progress:</strong> {item.currentProgress}
              </div>
              <div className="mb-2">
                <strong>Total Remaining:</strong> {item.totalRemaining}
              </div>
              <div>
                <button
                  onClick={() => editItem(item.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-blue-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogOut}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
      >
        Logout
      </button>
    </main>
  );
}
