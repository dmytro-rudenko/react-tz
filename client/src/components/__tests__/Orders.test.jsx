import { vi, describe, test, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Orders from '../Orders';
import orderStore from '../../stores/orderStore';
import userStore from '../../stores/userStore';
import * as apiService from '../../services/apiService';

vi.mock('../../services/apiService');

describe('Orders Component', () => {
  const mockOrders = [
    { id: '1', productId: '1', quantity: 2 },
    { id: '2', productId: '2', quantity: 1 }
  ];

  const mockUser = { id: '1', name: 'John Doe', balance: '100.00' };

  beforeEach(() => {
    vi.clearAllMocks();
    orderStore.setOrders([]);
    userStore.setUsers([mockUser]);
    userStore.setSelectedUser(mockUser.id);
    vi.mocked(apiService.fetchOrders).mockResolvedValue(mockOrders);
  });

  test('renders orders table', async () => {
    render(<Orders />);
    
    expect(screen.getByText('Orders')).toBeInTheDocument();
    
    await waitFor(() => {
      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveTextContent('1'); // Order ID
      expect(cells[3]).toHaveTextContent('2'); // Order ID
    });
  });

  test('fetches orders when user is selected', async () => {
    render(<Orders />);
    
    expect(apiService.fetchOrders).toHaveBeenCalledWith(mockUser.id);
    
    await waitFor(() => {
      const orders = orderStore.orders;
      expect(orders).toHaveLength(2);
      expect(orders[0].id).toBe('1');
      expect(orders[1].id).toBe('2');
    });
  });

  test('does not fetch orders when no user is selected', () => {
    userStore.setSelectedUser(null);
    render(<Orders />);
    
    expect(apiService.fetchOrders).not.toHaveBeenCalled();
  });

  test('displays correct order information', async () => {
    render(<Orders />);
    
    await waitFor(() => {
      expect(screen.getByText('Order ID')).toBeInTheDocument();
      expect(screen.getByText('Product')).toBeInTheDocument();
      expect(screen.getByText('Quantity')).toBeInTheDocument();
      
      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveTextContent('1'); // First order ID
      expect(cells[2]).toHaveTextContent('2'); // First order quantity
    });
  });
});