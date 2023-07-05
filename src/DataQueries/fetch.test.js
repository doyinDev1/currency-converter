/* eslint-disable no-undef */
import axios from 'axios';
import { Config } from '../Config';

// SWAP API_KEY WITH THE FOLLOWING KEYS INCASE OF RATE LMIT EXCEEDED ERROR /TESTS FAILS REPEATEDLY

const API_KEY = '5a4ab6aba289a123588bcd3493aabee0';
// const API_KEY = '5692359bbc7aec7001a1d5a2d1b08772';
// const API_KEY = '89044da3c38f6a3635a94c8e1a25dfe2';
// const API_KEY = 'daeb659cc3cce3c0b605bfeddb8a7bfc';

// handling my date functions here to mock data
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

describe('API Fetch', () => {
  test('fetches data successfully', async () => {
    // Mock the axios.get function to return a predefined response
    axios.get = jest.fn().mockResolvedValue({
      data: {
        success: true,
        timestamp: 1519296206,
        base: 'EUR',
        date: formattedDate,
        rates: {
          AUD: 1.566015,
          CAD: 1.560132,
          CHF: 1.154727,
          CNY: 7.827874,
          GBP: 0.882047,
          JPY: 132.360679,
          USD: 1.23396,
        },
      },
    });

    // Make the API call
    const response = await axios.get(`${Config.url.API_URL}/latest?access_key=${API_KEY}`);
    // Verify that the API call was made with the correct URL
    expect(axios.get).toHaveBeenCalledWith(`${Config.url.API_URL}/latest?access_key=${API_KEY}`);

    // Verify the response data
    expect(response.data).toEqual({
      success: true,
      timestamp: 1519296206,
      base: 'EUR',
      date: formattedDate,
      rates: {
        AUD: 1.566015,
        CAD: 1.560132,
        CHF: 1.154727,
        CNY: 7.827874,
        GBP: 0.882047,
        JPY: 132.360679,
        USD: 1.23396,
      },
    });
  });
});
