import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FinanceForm from '@/components/FinanceForm';

// Mock functions for the props
const mockSetExpense = jest.fn();
const mockSetDeadline = jest.fn();
const mockSetTargetAmount = jest.fn();
const mockSetCurrentProgress = jest.fn();
const mockUpdateItem = jest.fn();
const mockAddFinance = jest.fn();

describe('FinanceForm Component', () => {
  test('handles input changes correctly', () => {
    render(
      <FinanceForm
        expense=""
        setExpense={mockSetExpense}
        deadline=""
        setDeadline={mockSetDeadline}
        targetAmount=""
        setTargetAmount={mockSetTargetAmount}
        currentProgress=""
        setCurrentProgress={mockSetCurrentProgress}
        totalRemaining={0}
        editId={null}
        updateItem={mockUpdateItem}
        addFinance={mockAddFinance}
      />
    );

    fireEvent.change(screen.getByLabelText(/Expense:/i), {
      target: { value: 'New Expense' },
    });
    expect(mockSetExpense).toHaveBeenCalledWith('New Expense');

    fireEvent.change(screen.getByLabelText(/Deadline:/i), {
      target: { value: '2024-12-31' },
    });
    expect(mockSetDeadline).toHaveBeenCalledWith('2024-12-31');

    fireEvent.change(screen.getByLabelText(/Target Amount:/i), {
      target: { value: '1000' },
    });
    expect(mockSetTargetAmount).toHaveBeenCalledWith(1000);

    fireEvent.change(screen.getByLabelText(/Current Progress:/i), {
      target: { value: '500' },
    });
    expect(mockSetCurrentProgress).toHaveBeenCalledWith(500);
  });

  test('submits form with correct data when adding new finance', () => {
    render(
      <FinanceForm
        expense="New Expense"
        setExpense={mockSetExpense}
        deadline="2024-12-31"
        setDeadline={mockSetDeadline}
        targetAmount={1000}
        setTargetAmount={mockSetTargetAmount}
        currentProgress={500}
        setCurrentProgress={mockSetCurrentProgress}
        totalRemaining={500}
        editId={null}
        updateItem={mockUpdateItem}
        addFinance={mockAddFinance}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    expect(mockAddFinance).toHaveBeenCalled();
  });

  test('submits form with correct data when updating finance', () => {
    render(
      <FinanceForm
        expense="Updated Expense"
        setExpense={mockSetExpense}
        deadline="2024-12-31"
        setDeadline={mockSetDeadline}
        targetAmount={1500}
        setTargetAmount={mockSetTargetAmount}
        currentProgress={700}
        setCurrentProgress={mockSetCurrentProgress}
        totalRemaining={800}
        editId="12345"
        updateItem={mockUpdateItem}
        addFinance={mockAddFinance}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Update/i }));
    expect(mockUpdateItem).toHaveBeenCalled();
  });
});
