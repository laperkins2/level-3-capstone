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
import FinanceForm from '@/components/FinanceForm';

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
      uid: auth.currentUser?.uid,
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
      uid: auth.currentUser?.uid,
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

  console.log(auth.currentUser?.uid);
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Planning for future Purchases
        </h1>
        <h2 className="text-xl mb-4">Available Finance: {availableFinance}</h2>

        {auth.currentUser && (
          <FinanceForm
            expense={expense}
            setExpense={setExpense}
            deadline={deadline}
            setDeadline={setDeadline}
            targetAmount={targetAmount}
            setTargetAmount={setTargetAmount}
            currentProgress={currentProgress}
            setCurrentProgress={setCurrentProgress}
            totalRemaining={totalRemaining}
            editId={editId}
            updateItem={updateItem}
            addFinance={addFinance}
          />
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {finance.map((item) => {
            if (item.uid == auth.currentUser?.uid) {
              return (
                <GoalList
                  key={item.id}
                  expense={item.expense}
                  targetAmount={item.targetAmount}
                  currentProgress={item.currentProgress}
                  deadline={item.deadline}
                  onEdit={() => editItem(item.id)}
                  onDelete={() => deleteItem(item.id)}
                />
              );
            }
            return null;
          })}
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
