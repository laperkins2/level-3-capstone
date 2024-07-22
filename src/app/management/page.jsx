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
  const [itemTargetAmount, setItemTargetAmount] = useState(0);
  const [itemCurrentProgress, setItemCurrentProgress] = useState(0);
  const [itemTotalRemaining, setItemTotalRemaining] = useState(0);
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

  const addGoal = async (e) => {
    e.preventDefault();

    const newGoal = {
      goal: itemGoal,
      expense: itemExpense,
      deadline: itemDeadline,
      targetAmount: itemTargetAmount,
      currentProgress: itemCurrentProgress,
      totalRemaining: itemTotalRemaining,
    };
    try {
      const docId = await addDocument('goals', newGoal);
      setItemGoal((prevItems) => [...prevItems, { id: docId, ...newGoal }]);
      setItemExpense('');
      setItemDeadline('');
      setItemTargetAmount(0);
      setItemCurrentProgress(0);
      setItemTotalRemaining(0);
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
      setItemTotalRemaining(itemToEdit.totalRemaining);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();

    const updatedGoal = {
      expense: itemExpense,
      deadline: itemDeadline,
      targetAmount: itemTargetAmount,
      currentProgress: itemCurrentProgress,
      totalRemaining: itemTotalRemaining,
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
      setItemTargetAmount(0);
      setItemCurrentProgress(0);
      setItemTotalRemaining(0);
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
    setItemTargetAmount(0);
    setItemCurrentProgress(0);
    setItemTotalRemaining(0);
    setEditItemId(null);
  };

  return (
    <main>
      <div>
        <h1>Planning for future Purchases</h1>
        <h3>Available Goals: {availableGoals}</h3>
        <form onSubmit={editItemId !== null ? updateItem : addGoal}>
          <label htmlFor="expense">Expense:</label>
          <input
            id="expense"
            type="text"
            value={itemExpense}
            onChange={(e) => setItemExpense(e.target.value)}
            required
          />

          <label htmlFor="deadline">Deadline:</label>
          <input
            id="deadline"
            type="text"
            value={itemDeadline}
            onChange={(e) => setItemDeadline(e.target.value)}
            required
          />

          <label htmlFor="targetAmount">Target Amount:</label>
          <input
            id="targetAmount"
            type="number"
            value={itemTargetAmount}
            onChange={(e) => setItemTargetAmount(Number(e.target.value))}
            required
          />

          <label htmlFor="currentProgress">Current Progress:</label>
          <input
            id="currentProgress"
            type="number"
            value={itemCurrentProgress}
            onChange={(e) => setItemCurrentProgress(Number(e.target.value))}
            required
          />

          <label htmlFor="totalRemaining">Total Remaining:</label>
          <input
            id="totalRemaining"
            type="number"
            value={itemTotalRemaining}
            onChange={(e) => setItemTotalRemaining(Number(e.target.value))}
            required
          />

          <button type="submit">
            {editItemId !== null ? 'Update' : 'Add'}
          </button>
        </form>

        <ul>
          {itemGoal.map((item) => (
            <li key={item.id}>
              <div>
                <strong>Expense:</strong> {item.expense}
              </div>
              <div>
                <strong>Deadline:</strong> {item.deadline}
              </div>
              <div>
                <strong>Target Amount:</strong> {item.targetAmount}
              </div>
              <div>
                <strong>Current Progress:</strong> {item.currentProgress}
              </div>
              <div>
                <strong>Total Remaining:</strong> {item.totalRemaining}
              </div>
              <div>
                <button onClick={() => editItem(item.id)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </main>
  );
}
