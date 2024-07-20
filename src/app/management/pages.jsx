'use client';

import React, { useEffect, useState } from 'react';
import {
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from '@/utils/firebase.Utils';
import { logout } from '@/utils/authUtils';

const ManagementPage = () => {
  const [itemGoal, setItemGoal] = useState(0);
  const [itemExpense, setItemExpense] = useState('');
  const [itemDeadline, setItemDeadline] = useState([]);
  const [itemTargetAmount, setItemTargetAmount] = useState(0);
  const [itemCurrentProgress, setItemCurrentProgress] = useState(0);
  const [itemTotalRemaining, setItemTotalRemaining] = useState(0);
  const [editItemId, setEditItemId] = useState(null);
  const [availableGoals, setAvailableGoals] = useState(0);

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
      setItemDeadline([]);
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
    let itemToEdit = items.find((item) => item.id === id);
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

    const updateGoal = {
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
      setItemDeadline([]);
      setItemTargetAmount(0);
      setItemCurrentProgress(0);
      setItemTotalRemaining(0);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleLogOut = () => {
    logout();
    setItemGoal([]);
    setItemExpense('');
    setItemDeadline([]);
    setItemTargetAmount(0);
    setItemCurrentProgress(0);
    setItemTotalRemaining(0);
    setItemEdit(null);
  };

  return (
    <div>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default ManagementPage;
