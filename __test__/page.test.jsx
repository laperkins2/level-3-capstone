import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManagementPage from '@/pages/ManagementPage'; // Adjust the import path as needed
import {
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from '@/utils/firebase.Utils';
import { logout } from '@/utils/authUtils';
import { auth } from '../../../firebase.config';
import GoalList from '@/components/GoalList';

// Mock the modules
jest.mock('@/utils/mockFirebase.Utils');
jest.mock('@/utils/mockAuthUtils');
jest.mock('../../../firebase.config', () => ({
  auth: {
    currentUser: {
      /* mock user object */
    },
  },
}));

describe('ManagementPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders management page and handles form submission', async () => {
    getAllDocuments.mockResolvedValueOnce([
      {
        id: '1',
        expense: 'Rent',
        targetAmount: 1000,
        currentProgress: 500,
        deadline: '2024-12-31',
      },
    ]);

    render(<ManagementPage />);

    // Check if the component renders
    expect(
      screen.getByText('Planning for future Purchases')
    ).toBeInTheDocument();
    expect(screen.getByText('Available Finance: 1')).toBeInTheDocument();

    // Test form submission
    fireEvent.change(screen.getByLabelText(/Expense:/i), {
      target: { value: 'New Expense' },
    });
    fireEvent.change(screen.getByLabelText(/Deadline:/i), {
      target: { value: '2024-12-31' },
    });
    fireEvent.change(screen.getByLabelText(/Target Amount:/i), {
      target: { value: '500' },
    });
    fireEvent.change(screen.getByLabelText(/Current Progress:/i), {
      target: { value: '100' },
    });

    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(addDocument).toHaveBeenCalledWith('finance', {
        expense: 'New Expense',
        deadline: '2024-12-31',
        targetAmount: 500,
        currentProgress: 100,
        totalRemaining: 400,
      });
    });
  });

  test('handles delete operation', async () => {
    getAllDocuments.mockResolvedValueOnce([
      {
        id: '1',
        expense: 'Rent',
        targetAmount: 1000,
        currentProgress: 500,
        deadline: '2024-12-31',
      },
    ]);
    deleteDocument.mockResolvedValueOnce();

    render(<ManagementPage />);

    // Wait for the items to be rendered
    await waitFor(() => {
      expect(screen.getByText('Rent')).toBeInTheDocument();
    });

    // Trigger delete
    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    await waitFor(() => {
      expect(deleteDocument).toHaveBeenCalledWith('finance', '1');
    });
  });

  test('handles logout', () => {
    render(<ManagementPage />);

    // Trigger logout
    fireEvent.click(screen.getByText('Logout'));

    expect(logout).toHaveBeenCalled();
  });
});
