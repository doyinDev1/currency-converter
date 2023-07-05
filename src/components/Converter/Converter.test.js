/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Converter from './Converter';

const queryClient = new QueryClient();

describe('Converter', () => {
  test('returns a value when "CONVERT" button is clicked', async () => {
    // Render the Converter component
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <Converter />
      </QueryClientProvider>,
    );

    // Set up the necessary form inputs
    const baseCurrInput = getByLabelText('Base Currency');
    const destCurrInput = getByLabelText('Destination Currency');
    const baseValueInput = getByPlaceholderText('Base Input');

    // Filling the form inputs, here i'm using the base currency
    fireEvent.change(baseCurrInput, { target: { value: 'EUR' } });
    fireEvent.change(destCurrInput, { target: { value: 'EUR' } });
    fireEvent.change(baseValueInput, { target: { value: '1' } });

    // Click the "CONVERT" button
    await waitFor(() => {
      fireEvent.click(getByText('CONVERT'));
    });

    // Wait for the destination value to be updated
    await waitFor(() => {
      const destinationValue = getByLabelText('Destination Value');
      expect(destinationValue.value).toBe('1.00');
    });
  });
});
