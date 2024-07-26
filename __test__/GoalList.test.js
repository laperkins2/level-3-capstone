import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GoalList from '@/components/GoalList';

describe('GoalList Component', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  test('triggers edit callback when edit button is clicked', () => {
    render(
      <GoalList
        expense="Test Expense"
        targetAmount={1000}
        currentProgress={500}
        deadline="2024-12-31"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Edit/i }));
    expect(mockOnEdit).toHaveBeenCalled();
  });

  test('triggers delete callback when delete button is clicked', () => {
    render(
      <GoalList
        expense="Test Expense"
        targetAmount={1000}
        currentProgress={500}
        deadline="2024-12-31"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
