import { vi, describe, test, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Users from '../Users';
import userStore from '../../stores/userStore';
import * as apiService from '../../services/apiService';

vi.mock('../../services/apiService');

describe('Users Component', () => {
  const mockUsers = [
    { id: '1', name: 'John Doe', balance: '100.00' },
    { id: '2', name: 'Jane Smith', balance: '200.00' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    userStore.setUsers([]);
    userStore.setSelectedUser(null);
    vi.mocked(apiService.fetchUsers).mockResolvedValue(mockUsers);
  });

  test('renders user select dropdown', async () => {
    render(<Users />);
    
    expect(screen.getByLabelText(/select user/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  test('displays correct balance when user is selected', async () => {
    render(<Users />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    
    expect(screen.getByText('Balance: $100.00')).toBeInTheDocument();
  });

  test('calls fetchUsers on component mount', async () => {
    render(<Users />);
    
    expect(apiService.fetchUsers).toHaveBeenCalledTimes(1);
    
    await waitFor(() => {
      expect(userStore.users).toEqual(mockUsers);
    });
  });
});