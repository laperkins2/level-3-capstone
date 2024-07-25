'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import {
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from '@/utils/firebase.Utils';
import { logout } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase.config';
import GoalList from '@/components/GoalList';

export default function ManagementPage() {
  const [finance, setFinance] = useState([]);
  const [expense, setExpense] = useState('');
  const [deadline, setDeadline] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentProgress, setCurrentProgress] = useState('');
  const [editId, setEditId] = useState(null);
  const [availableFinance, setAvailableFinance] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const documents = await getAllDocuments('finance');
        console.log(documents);
        const formattedDocuments = documents.map((doc) => ({
          ...doc,
        }));
        setFinance(formattedDocuments);
        setAvailableFinance(documents.length);
      } catch (error) {
        console.error('Not able to fetch:', error);
      }
    };
    fetchDocuments();
  }, []);

  const totalRemaining = targetAmount - currentProgress;

  const addFinance = async (e) => {
    e.preventDefault();

    const newFinance = {
      expense: expense,
      deadline: deadline,
      targetAmount: Number(targetAmount),
      currentProgress: Number(currentProgress),
      totalRemaining: totalRemaining,
    };
    try {
      const docId = await addDocument('finance', newFinance);
      setFinance((prevItems) => [...prevItems, { id: docId, ...newFinance }]);
      setExpense('');
      setDeadline('');
      setTargetAmount('');
      setCurrentProgress('');
      setAvailableFinance((prev) => prev + 1);
    } catch (error) {
      console.error('Not able to add document:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDocument('finance', id);
      setFinance((prevItems) => prevItems.filter((item) => item.id !== id));
      setAvailableFinance((prev) => prev - 1);
    } catch (error) {
      console.error('Not able to delete document:', error);
    }
  };

  const editItem = (id) => {
    let itemToEdit = finance.find((item) => item.id === id);
    if (itemToEdit) {
      setEditId(id);
      setExpense(itemToEdit.expense);
      setDeadline(itemToEdit.deadline);
      setTargetAmount(itemToEdit.targetAmount);
      setCurrentProgress(itemToEdit.currentProgress);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();

    const updatedFinance = {
      expense: expense,
      deadline: deadline,
      targetAmount: Number(targetAmount),
      currentProgress: Number(currentProgress),
      totalRemaining: totalRemaining,
    };
    try {
      await updateDocument('finance', editId, updatedFinance);
      const updatedItems = finance.map((item) =>
        item.id === editId ? { id: editId, ...updatedFinance } : item
      );
      setFinance(updatedItems);
      setEditId(null);
      setExpense('');
      setDeadline('');
      setTargetAmount('');
      setCurrentProgress('');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleLogOut = () => {
    logout();
    router.push('/');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Planning for future Purchases
        </h1>
        <h2 className="text-xl mb-4">Available Finance: {availableFinance}</h2>

        {auth.currentUser && (
          <form
            onSubmit={editId !== null ? updateItem : addFinance}
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
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {finance.map((item) => (
            <GoalList
              key={item.id}
              expense={item.expense}
              targetAmount={item.targetAmount}
              currentProgress={item.currentProgress}
              deadline={item.deadline}
              onEdit={() => editItem(item.id)}
              onDelete={() => deleteItem(item.id)}
            />
            // <li key={item.id} className="border border-gray-200 rounded-md p-4">
            //   <div className="mb-2">
            //     <strong>Expense:</strong> {item.expense}
            //   </div>
            //   <div className="mb-2">
            //     <strong>Deadline:</strong> {item.deadline}
            //   </div>
            //   <div className="mb-2">
            //     <strong>Target Amount:</strong> {item.targetAmount}
            //   </div>
            //   <div className="mb-2">
            //     <strong>Current Progress:</strong> {item.currentProgress}
            //   </div>
            //   <div className="mb-2">
            //     <strong>Total Remaining:</strong> {item.totalRemaining}
            //   </div>
            //   <div>
            //     <button
            //       onClick={() => editItem(item.id)}
            //       className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            //     >
            //       Edit
            //     </button>
            //     <button
            //       onClick={() => deleteItem(item.id)}
            //       className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-blue-600"
            //     >
            //       Delete
            //     </button>
            //   </div>
            // </li>
          ))}
        </ul>
      </div>

      {auth.currentUser && (
        <div>
          <button
            onClick={handleLogOut}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}
