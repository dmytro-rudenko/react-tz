import { vi, describe, test, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Products from '../Products';
import productStore from '../../stores/productStore';
import userStore from '../../stores/userStore';
import * as apiService from '../../services/apiService';

vi.mock('../../services/apiService');

describe('Products Component', () => {
  const mockProducts = [
    { id: '1', name: 'Product 1', price: '10.00' },
    { id: '2', name: 'Product 2', price: '20.00' }
  ];

  const mockUser = { id: '1', name: 'John Doe', balance: '100.00' };

  beforeEach(() => {
    vi.clearAllMocks();
    productStore.setProducts([]);
    productStore.resetAllQuantities();
    userStore.setUsers([mockUser]);
    userStore.setSelectedUser(mockUser.id);
    vi.mocked(apiService.fetchProducts).mockResolvedValue(mockProducts);
    vi.mocked(apiService.createOrder).mockResolvedValue({ id: '1', userId: '1', productId: '1', quantity: 1 });
  });

  test('renders products table', async () => {
    render(<Products />);
    
    expect(screen.getByText('Products')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  test('updates quantity when clicking + and - buttons', async () => {
    render(<Products />);
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const plusButtons = screen.getAllByText('+');
    const minusButtons = screen.getAllByText('-');
    
    fireEvent.click(plusButtons[0]);
    expect(screen.getAllByText('1')[0]).toBeInTheDocument();
    
    fireEvent.click(minusButtons[0]);
    expect(screen.getAllByText('0')[0]).toBeInTheDocument();
  });

  test('creates order when clicking Create Order button', async () => {
    render(<Products />);
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const plusButton = screen.getAllByText('+')[0];
    fireEvent.click(plusButton);
    
    const createOrderButtons = screen.getAllByText('Create Order');
    fireEvent.click(createOrderButtons[0]);
    
    await waitFor(() => {
      expect(apiService.createOrder).toHaveBeenCalledWith('1', '1', 1);
    });
  });

  test('shows alert when creating order with 0 quantity', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<Products />);
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const createOrderButtons = screen.getAllByText('Create Order');
    fireEvent.click(createOrderButtons[0]);
    
    expect(alertMock).toHaveBeenCalledWith('Please select a quantity for the product.');
    alertMock.mockRestore();
  });

  test('fetches products on component mount', async () => {
    render(<Products />);
    
    expect(apiService.fetchProducts).toHaveBeenCalledTimes(1);
    
    await waitFor(() => {
      const products = productStore.products;
      expect(products).toHaveLength(2);
      expect(products[0].name).toBe('Product 1');
      expect(products[1].name).toBe('Product 2');
    });
  });
});